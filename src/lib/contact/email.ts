import { siteConfig } from "@/constants/site";

import type { ContactFormValues } from "./validation";

/**
 * Contact email delivery via Resend's REST API.
 * ----------------------------------------------------------------------------
 * Called with `fetch` (no SDK) so it stays light on the Cloudflare Workers
 * runtime. Configuration is env-driven:
 *
 *   RESEND_API_KEY     (required to actually send) — Cloudflare Worker secret
 *   CONTACT_TO_EMAIL   inbox that receives submissions (defaults to siteConfig)
 *   CONTACT_FROM_EMAIL sender (defaults to Resend's no-domain onboarding sender)
 *
 * Resend allows the `onboarding@resend.dev` sender without a verified domain,
 * so leads can be received before a custom domain is set up.
 */

export type SendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: "not_configured" | "send_failed" };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContactEmail(
  values: ContactFormValues,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not an error the visitor caused — surface a graceful fallback upstream.
    console.warn("[contact] RESEND_API_KEY is not set; email not sent.");
    return { ok: false, reason: "not_configured" };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${siteConfig.name} <onboarding@resend.dev>`;

  const text = `New enquiry via ${siteConfig.name}\n\nFrom: ${values.name} <${values.email}>\n\n${values.message}`;
  const html = `<h2>New enquiry via ${siteConfig.name}</h2>
<p><strong>From:</strong> ${escapeHtml(values.name)} &lt;${escapeHtml(values.email)}&gt;</p>
<p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New enquiry from ${values.name}`,
        reply_to: values.email,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error(
        `[contact] Resend responded ${response.status}: ${await response.text()}`,
      );
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact] Failed to reach Resend:", error);
    return { ok: false, reason: "send_failed" };
  }
}
