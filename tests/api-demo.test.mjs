import assert from "node:assert/strict";
import test from "node:test";

const BASE_URL = "http://localhost:3000";

test("GET /api/demo returns 405 Method Not Allowed", async () => {
  const res = await fetch(`${BASE_URL}/api/demo`, { method: "GET" });
  assert.equal(res.status, 405);
  const data = await res.json();
  assert.equal(data.success, false);
});

test("POST /api/demo with invalid content-type returns 415", async () => {
  const res = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "hello",
  });
  assert.equal(res.status, 415);
});

test("POST /api/demo with unauthorized origin returns 403", async () => {
  const res = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://attacker-site.example",
    },
    body: JSON.stringify({}),
  });
  assert.equal(res.status, 403);
});

test("POST /api/demo with oversized body (>16KB) returns 413", async () => {
  const largeRequirements = "A".repeat(17 * 1024);
  const res = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({ requirements: largeRequirements }),
  });
  assert.equal(res.status, 413);
});

test("POST /api/demo with honeypot filled returns 400", async () => {
  const res = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      fullName: "Spam Bot",
      email: "bot@spam.com",
      institution: "Spam Academy",
      interest: "School ERP",
      permission: true,
      submissionId: "bot-" + Date.now(),
      honeypot: "http://buy-crypto-now.example",
    }),
  });
  assert.equal(res.status, 400);
});

test("POST /api/demo with missing required fields returns 400 and field errors", async () => {
  const res = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      fullName: "A", // too short
      email: "not-an-email",
      // institution missing
      // permission false
      submissionId: "test-invalid-" + Date.now(),
    }),
  });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.ok(data.errors);
  assert.ok(data.errors.fullName);
  assert.ok(data.errors.email);
  assert.ok(data.errors.institution);
  assert.ok(data.errors.permission);
});

test("POST /api/demo with valid payload returns 200 accepted", async () => {
  const submissionId = "sub-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);
  const payload = {
    fullName: "Dr. Sunita Raman",
    email: `sunita.${Date.now()}@greenwood.edu`,
    phone: "+91 98765 43210",
    institution: "Greenwood International School",
    role: "Principal",
    city: "Bangalore",
    interest: "School ERP",
    requirements: "We need automated attendance and parent communication for 1,200 students.",
    preferredDate: "2026-10-15",
    permission: true,
    requestType: "demo",
    source: "hero",
    submissionId,
  };

  const res = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      "X-Forwarded-For": "10.1.1.1",
    },
    body: JSON.stringify(payload),
  });

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.status, "accepted");
  assert.equal(data.submissionId, submissionId);

  // Idempotency: exact same payload with same submissionId returns same cached result
  const retryRes = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      "X-Forwarded-For": "10.1.1.1",
    },
    body: JSON.stringify(payload),
  });
  assert.equal(retryRes.status, 200);
  const retryData = await retryRes.json();
  assert.equal(retryData.submissionId, submissionId);

  // Conflict: same submissionId with changed payload returns 409 Conflict
  const conflictPayload = {
    ...payload,
    institution: "Completely Different Institution",
  };
  const conflictRes = await fetch(`${BASE_URL}/api/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      "X-Forwarded-For": "10.1.1.1",
    },
    body: JSON.stringify(conflictPayload),
  });
  assert.equal(conflictRes.status, 409);
});

test("POST /api/demo enforces rate limiting (3 requests per email per hour)", async () => {
  const targetEmail = `ratelimit.test.${Date.now()}@school.org`;

  const makeReq = async (i) => {
    return fetch(`${BASE_URL}/api/demo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": "10.2.2.2",
      },
      body: JSON.stringify({
        fullName: `Tester ${i}`,
        email: targetEmail,
        institution: `School ${i}`,
        interest: "School ERP",
        permission: true,
        submissionId: `rl-${i}-${Date.now()}`,
      }),
    });
  };

  // First 3 should succeed
  const r1 = await makeReq(1);
  assert.equal(r1.status, 200);
  const r2 = await makeReq(2);
  assert.equal(r2.status, 200);
  const r3 = await makeReq(3);
  assert.equal(r3.status, 200);

  // 4th should be rate-limited with 429
  const r4 = await makeReq(4);
  assert.equal(r4.status, 429);
  const data4 = await r4.json();
  assert.equal(data4.success, false);
  assert.ok(r4.headers.get("Retry-After"));
});

