import { Resend } from "resend";
import type { DemoFormData } from "@/lib/schema";

// HTML escaping helper to prevent HTML injection in email bodies
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Sanitize single-line text fields to prevent email header injection (\r, \n)
export function sanitizeHeaderField(text: string): string {
  return text.replace(/[\r\n]+/g, " ").trim();
}

export async function sendLeadNotificationEmail(
  data: DemoFormData,
  submissionTime: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "Vidyaloom Website <onboarding@resend.dev>";
  const toEmail = process.env.LEADS_TO_EMAIL || "leads@example.com";

  // Build sanitized subject
  const requestTypeLabel =
    data.requestType === "workshop"
      ? "Workshop request"
      : data.requestType === "contact"
      ? "Contact enquiry"
      : "Demo request";

  const safeInstitution = sanitizeHeaderField(data.institution);
  const subject = `[Vidyaloom] ${requestTypeLabel} — ${safeInstitution}`;

  // Build clean text content
  const textBody = `
NEW VIDYALOOM ENQUIRY RECEIVED
============================

Request Type: ${data.requestType.toUpperCase()}
Originating CTA: ${data.source}
Submission ID: ${data.submissionId}
Received At: ${submissionTime}

CONTACT DETAILS:
----------------
Full Name: ${data.fullName}
Email Address: ${data.email}
Phone / WhatsApp: ${data.phone || "Not provided"}
Institution: ${data.institution}
Role: ${data.role || "Not provided"}
City: ${data.city || "Not provided"}

ENQUIRY PREFERENCES:
--------------------
Primary Focus Area: ${data.interest}
Preferred Date: ${data.preferredDate || "No specific date"} (Asia/Kolkata)
Permission to Contact: Granted

REQUIREMENTS / NOTES:
---------------------
${data.requirements || "None provided"}
`.trim();

  // Build branded HTML content
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F0F4FE; margin: 0; padding: 24px; color: #081F44;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #CBDDF8; box-shadow: 0 4px 16px rgba(8,31,68,0.06);">
    <!-- Header -->
    <div style="background: linear-gradient(105deg, #0098FF 0%, #123BFF 100%); padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Vidyaloom</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">New Lead &amp; Platform Enquiry</p>
    </div>

    <!-- Body Content -->
    <div style="padding: 32px;">
      <div style="display: inline-block; padding: 4px 12px; background: #EAF4FE; color: #0098FF; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">
        ${escapeHtml(requestTypeLabel)}
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E; width: 140px;">Institution:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #081F44;">${escapeHtml(data.institution)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Full Name:</td>
          <td style="padding: 10px 0; color: #081F44;">${escapeHtml(data.fullName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Email:</td>
          <td style="padding: 10px 0; color: #081F44;"><a href="mailto:${escapeHtml(data.email)}" style="color: #0098FF; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Phone:</td>
          <td style="padding: 10px 0; color: #081F44;">${data.phone ? escapeHtml(data.phone) : '<span style="color: #999;">Not provided</span>'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Role:</td>
          <td style="padding: 10px 0; color: #081F44;">${data.role ? escapeHtml(data.role) : '<span style="color: #999;">Not provided</span>'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">City:</td>
          <td style="padding: 10px 0; color: #081F44;">${data.city ? escapeHtml(data.city) : '<span style="color: #999;">Not provided</span>'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Focus Area:</td>
          <td style="padding: 10px 0; font-weight: 600; color: #0098FF;">${escapeHtml(data.interest)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #E3EAF4;">
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Preferred Date:</td>
          <td style="padding: 10px 0; color: #081F44;">${data.preferredDate ? escapeHtml(data.preferredDate) : "Flexible / To be coordinated"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #50627E;">Originating CTA:</td>
          <td style="padding: 10px 0; color: #081F44;">${escapeHtml(data.source)}</td>
        </tr>
      </table>

      ${
        data.requirements
          ? `
        <div style="margin-top: 16px; padding: 16px; background: #F8FBFF; border-radius: 12px; border: 1px solid #E3EAF4;">
          <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #50627E; letter-spacing: 0.5px;">Requirements / Notes</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #081F44;">${escapeHtml(data.requirements)}</p>
        </div>
      `
          : ""
      }
    </div>

    <!-- Footer metadata -->
    <div style="background: #FAFBFD; padding: 16px 32px; border-top: 1px solid #E3EAF4; font-size: 11px; color: #8C9BAE;">
      <p style="margin: 0 0 4px 0;">Submission ID: <span style="font-family: monospace;">${escapeHtml(data.submissionId)}</span></p>
      <p style="margin: 0;">Server Timestamp: ${escapeHtml(submissionTime)}</p>
    </div>
  </div>
</body>
</html>
`.trim();

  // If RESEND_API_KEY is not configured (e.g. initial development or testing environment):
  if (!apiKey) {
    console.warn(
      `[Email] RESEND_API_KEY is not configured in environment. Mocking successful send for local development. ` +
        `Enquiry for ${safeInstitution} accepted.`
    );
    return {
      success: true,
      messageId: `mock_${data.submissionId.slice(0, 12)}`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { data: resData, error } = await resend.emails.send(
      {
        from: fromEmail,
        to: [toEmail],
        replyTo: data.email,
        subject,
        text: textBody,
        html: htmlBody,
      },
      {
        // Resend idempotency key
        headers: {
          "Idempotency-Key": data.submissionId,
        },
      }
    );

    if (error) {
      console.error("[Email] Resend API error:", error.name, error.message);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: resData?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown email dispatch failure";
    console.error("[Email] Send exception:", msg);
    return { success: false, error: msg };
  }
}
