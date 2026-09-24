import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import crypto from "crypto";

// Fallback in-memory rate limiter for development when Upstash credentials are absent
class MemoryRateLimiter {
  private hits: Map<string, { count: number; expiresAt: number }> = new Map();

  async check(key: string, limit: number, windowSeconds: number): Promise<{ success: boolean; remaining: number; reset: number }> {
    const now = Date.now();
    const existing = this.hits.get(key);

    if (!existing || existing.expiresAt <= now) {
      this.hits.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
      return { success: true, remaining: limit - 1, reset: windowSeconds };
    }

    if (existing.count >= limit) {
      const resetSeconds = Math.max(1, Math.ceil((existing.expiresAt - now) / 1000));
      return { success: false, remaining: 0, reset: resetSeconds };
    }

    existing.count += 1;
    return { success: true, remaining: limit - existing.count, reset: Math.ceil((existing.expiresAt - now) / 1000) };
  }
}

const memoryLimiter = new MemoryRateLimiter();

// Initialize Upstash Redis if credentials exist
let redisInstance: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redisInstance = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (err) {
    console.error("[RateLimit] Upstash Redis initialization failed; falling back to memory.", err);
  }
}

export async function checkRateLimit(
  ip: string,
  email: string
): Promise<{ allowed: boolean; retryAfter?: number; reason?: string }> {
  const secret = process.env.LEAD_HASH_SECRET || "default_local_lead_secret";

  // Hash IP and Email to avoid storing raw PII in cache keys
  const ipHash = crypto.createHmac("sha256", secret).update(ip).digest("hex").slice(0, 16);
  const emailHash = crypto.createHmac("sha256", secret).update(email.toLowerCase()).digest("hex").slice(0, 16);

  // 1. Check IP limit: 5 attempts per 10 minutes (600 seconds)
  if (redisInstance) {
    const ipRatelimit = new Ratelimit({
      redis: redisInstance,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: false,
      prefix: "vidyaloom_rl_ip",
    });

    const emailRatelimit = new Ratelimit({
      redis: redisInstance,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      analytics: false,
      prefix: "vidyaloom_rl_email",
    });

    try {
      const ipResult = await ipRatelimit.limit(ipHash);
      if (!ipResult.success) {
        return {
          allowed: false,
          retryAfter: Math.ceil((ipResult.reset - Date.now()) / 1000),
          reason: "Too many attempts from this network. Please try again later.",
        };
      }

      const emailResult = await emailRatelimit.limit(emailHash);
      if (!emailResult.success) {
        return {
          allowed: false,
          retryAfter: Math.ceil((emailResult.reset - Date.now()) / 1000),
          reason: "Too many enquiries for this email address. Please try again in an hour.",
        };
      }

      return { allowed: true };
    } catch (redisError) {
      console.error("[RateLimit] Upstash call error, falling back to memory", redisError);
    }
  }

  // Memory fallback
  const ipRes = await memoryLimiter.check(`ip:${ipHash}`, 5, 600);
  if (!ipRes.success) {
    return {
      allowed: false,
      retryAfter: ipRes.reset,
      reason: "Too many attempts from this network. Please try again later.",
    };
  }

  const emailRes = await memoryLimiter.check(`email:${emailHash}`, 3, 3600);
  if (!emailRes.success) {
    return {
      allowed: false,
      retryAfter: emailRes.reset,
      reason: "Too many enquiries for this email address. Please try again in an hour.",
    };
  }

  return { allowed: true };
}
