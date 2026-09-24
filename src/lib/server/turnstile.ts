export async function verifyTurnstile(
  token: string | undefined,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured in local environment, allow pass-through
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      error: "Bot challenge token is missing. Please refresh and try again.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(5000), // 5s bounded timeout
    });

    const outcome = await res.json();

    if (outcome.success) {
      return { success: true };
    } else {
      console.warn("[Turnstile] Verification failed:", outcome["error-codes"]);
      return {
        success: false,
        error: "Security verification failed. Please try submitting again.",
      };
    }
  } catch (err) {
    console.error("[Turnstile] Network verification error:", err);
    // Fail safely if bot verification endpoint times out or errors
    return {
      success: false,
      error: "Security service temporarily unavailable. Please try again in a moment.",
    };
  }
}
