"use server";

import { sendContactEmail } from "@/lib/contact/email";
import {
  type ContactFormState,
  validateContactForm,
} from "@/lib/contact/validation";

/**
 * Contact form server action (runs on the Cloudflare Worker via OpenNext).
 * Validates input, drops obvious bots via a honeypot, sends the email, and
 * returns typed state for `useActionState`. The Resend API key never reaches
 * the client — it stays server-side.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: a hidden field humans never see. If filled, silently "succeed"
  // so bots get no signal — but send nothing.
  if (typeof formData.get("company") === "string" && formData.get("company")) {
    return { status: "success" };
  }

  const result = validateContactForm(formData);
  if (!result.ok) {
    return {
      status: "error",
      errors: result.errors,
      values: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      },
    };
  }

  const sent = await sendContactEmail(result.data);
  if (!sent.ok) {
    return {
      status: "error",
      message:
        "We couldn't send your message right now. Please email us directly and we'll get back to you.",
      values: result.data,
    };
  }

  return { status: "success" };
}
