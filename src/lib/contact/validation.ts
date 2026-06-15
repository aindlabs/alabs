/**
 * Contact form validation — A Labs
 * ----------------------------------------------------------------------------
 * Framework-agnostic, typed validation shared by the server action (and usable
 * by tests). Hand-rolled rather than pulling in a schema library for three
 * fields; the field constraints live here as the single source of truth.
 */

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

/** Per-field error messages, keyed by field name. */
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/**
 * State returned by the contact server action and consumed by `useActionState`.
 * Defined here (not in the `"use server"` module, whose runtime exports must all
 * be async functions) so both sides share one shape.
 */
export interface ContactFormState {
  readonly status: "idle" | "success" | "error";
  /** Form-level message (e.g. delivery failure), distinct from field errors. */
  readonly message?: string;
  readonly errors?: ContactFormErrors;
  /** Submitted values, echoed back so the form repopulates after an error. */
  readonly values?: Partial<ContactFormValues>;
}

export const INITIAL_CONTACT_STATE: ContactFormState = { status: "idle" };

export type ContactValidationResult =
  | { readonly ok: true; readonly data: ContactFormValues }
  | { readonly ok: false; readonly errors: ContactFormErrors };

/** Field length bounds — referenced by UI (e.g. maxLength) and validation. */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

// Pragmatic email check: one @, a dot in the domain, no spaces. Server-side
// delivery is the real validator; this catches obvious typos with good UX.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const asString = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value.trim() : "";

/**
 * Validate raw FormData. Returns either trimmed, typed data or per-field errors.
 */
export function validateContactForm(
  formData: FormData,
): ContactValidationResult {
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const message = asString(formData.get("message"));

  const errors: ContactFormErrors = {};

  if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = "Please enter your name.";
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Name must be under ${CONTACT_LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Please add a bit more detail (at least ${CONTACT_LIMITS.message.min} characters).`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message must be under ${CONTACT_LIMITS.message.max} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: { name, email, message } };
}
