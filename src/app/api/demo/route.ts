import { NextRequest, NextResponse } from "next/server";
import { demoFormSchema } from "@/lib/schema";
import { checkRateLimit } from "@/lib/server/ratelimit";
import { computePayloadDigest, checkDeduplication, recordSubmission } from "@/lib/server/dedup";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { sendLeadNotificationEmail } from "@/lib/server/email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024; // 16 KB strict limit

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const contentType = req.headers.get("content-type") || "";

  // 1. Content-Type check
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Unsupported media type. Expected application/json." },
      { status: 415 }
    );
  }

  // 2. Origin validation
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://127.0.0.1:3000";
  const allowedOrigins = allowedOriginsEnv
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  if (origin && !allowedOrigins.includes(origin)) {
    console.warn(`[Security] Rejected request from unauthorized origin: ${origin}`);
    return NextResponse.json(
      { success: false, message: "Cross-origin request rejected." },
      { status: 403 }
    );
  }

  // 3. Body size verification
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to read request body." },
      { status: 400 }
    );
  }

  const byteLength = Buffer.byteLength(rawBody, "utf-8");
  if (byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, message: "Payload too large. Maximum size is 16 KB." },
      { status: 413 }
    );
  }

  // 4. JSON parsing
  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON format." },
      { status: 400 }
    );
  }

  // 5. Schema validation
  const parsed = demoFormSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    return NextResponse.json(
      {
        success: false,
        message: "Please correct the highlighted fields.",
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 6. Honeypot check
  if (data.honeypot && data.honeypot.trim().length > 0) {
    console.warn("[Security] Bot detected via honeypot field.");
    return NextResponse.json(
      { success: false, message: "Invalid submission." },
      { status: 400 }
    );
  }

  // 7. Extract Client IP
  const forwarded = req.headers.get("x-forwarded-for");
  const clientIp = forwarded
    ? forwarded.split(",")[0].trim()
    : req.headers.get("x-real-ip") || "127.0.0.1";

  // 8. Rate limiting (IP and Email counters)
  const rateResult = await checkRateLimit(clientIp, data.email);
  if (!rateResult.allowed) {
    const headers = new Headers();
    if (rateResult.retryAfter) {
      headers.set("Retry-After", rateResult.retryAfter.toString());
    }
    return NextResponse.json(
      {
        success: false,
        message: rateResult.reason || "Rate limit exceeded. Please try again later.",
      },
      { status: 429, headers }
    );
  }

  // 9. Turnstile verification
  const turnstileResult = await verifyTurnstile(data.turnstileToken, clientIp);
  if (!turnstileResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: turnstileResult.error || "Security verification failed.",
      },
      { status: 400 }
    );
  }

  // 10. Deduplication and Idempotency handling
  const payloadDigest = computePayloadDigest(data);
  const dedupStatus = await checkDeduplication(data.submissionId, payloadDigest);

  if (dedupStatus.state === "exact_match") {
    // Idempotent retry: return previously accepted result without sending another email
    return NextResponse.json(dedupStatus.cachedResult, { status: 200 });
  }

  if (dedupStatus.state === "conflict") {
    // Same submissionId with different data
    return NextResponse.json(
      {
        success: false,
        message:
          "A submission with this reference ID already exists with different details. Please start a new request.",
      },
      { status: 409 }
    );
  }

  // 11. Send notification email via Resend
  const serverTime = new Date().toISOString();
  const sendResult = await sendLeadNotificationEmail(data, serverTime);

  if (!sendResult.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          "We encountered a temporary issue while delivering your enquiry to our team. Your details are safe; please try submitting again in a moment.",
      },
      { status: 502 }
    );
  }

  // 12. Success response and record deduplication
  const successResponse = {
    success: true,
    status: "accepted",
    submissionId: data.submissionId,
    message: "Enquiry received successfully. Our team will be in touch shortly.",
  };

  await recordSubmission(data.submissionId, payloadDigest, successResponse);

  return NextResponse.json(successResponse, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method Not Allowed. Use POST to submit an enquiry." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
