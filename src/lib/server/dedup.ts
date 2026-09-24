import { Redis } from "@upstash/redis";
import crypto from "crypto";
import type { DemoFormData } from "@/lib/schema";

interface SubmissionRecord {
  hash: string;
  timestamp: string;
  result: {
    success: boolean;
    status: string;
    submissionId: string;
    message: string;
  };
}

// In-memory fallback map for local development (24-hour TTL)
const memorySubmissions: Map<string, { record: SubmissionRecord; expiresAt: number }> = new Map();

let redisInstance: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redisInstance = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (err) {
    console.error("[Dedup] Redis initialization error:", err);
  }
}

export function computePayloadDigest(data: DemoFormData): string {
  const normalized = [
    data.fullName.trim().toLowerCase(),
    data.email.trim().toLowerCase(),
    data.institution.trim().toLowerCase(),
    data.interest.trim().toLowerCase(),
    (data.phone || "").trim(),
    (data.role || "").trim(),
    (data.city || "").trim().toLowerCase(),
    (data.requirements || "").trim(),
    (data.preferredDate || "").trim(),
    data.requestType,
  ].join("|");

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export async function checkDeduplication(
  submissionId: string,
  digest: string
): Promise<
  | { state: "new" }
  | { state: "exact_match"; cachedResult: SubmissionRecord["result"] }
  | { state: "conflict" }
> {
  const cacheKey = `vidyaloom_sub:${submissionId}`;

  if (redisInstance) {
    try {
      const existing = await redisInstance.get<SubmissionRecord>(cacheKey);
      if (existing) {
        if (existing.hash === digest) {
          return { state: "exact_match", cachedResult: existing.result };
        }
        return { state: "conflict" };
      }
      return { state: "new" };
    } catch (err) {
      console.error("[Dedup] Redis lookup error:", err);
    }
  }

  // Memory fallback
  const memRecord = memorySubmissions.get(cacheKey);
  if (memRecord && memRecord.expiresAt > Date.now()) {
    if (memRecord.record.hash === digest) {
      return { state: "exact_match", cachedResult: memRecord.record.result };
    }
    return { state: "conflict" };
  }

  return { state: "new" };
}

export async function recordSubmission(
  submissionId: string,
  digest: string,
  result: SubmissionRecord["result"]
): Promise<void> {
  const cacheKey = `vidyaloom_sub:${submissionId}`;
  const record: SubmissionRecord = {
    hash: digest,
    timestamp: new Date().toISOString(),
    result,
  };

  const ttlSeconds = 86400; // 24 hours

  if (redisInstance) {
    try {
      await redisInstance.set(cacheKey, record, { ex: ttlSeconds });
      return;
    } catch (err) {
      console.error("[Dedup] Redis store error:", err);
    }
  }

  memorySubmissions.set(cacheKey, {
    record,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}
