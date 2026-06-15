"use client";

import { CheckCircle2 } from "lucide-react";
import { useActionState } from "react";

import { submitContactForm } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui";
import { siteConfig } from "@/constants/site";
import {
  CONTACT_LIMITS,
  INITIAL_CONTACT_STATE,
} from "@/lib/contact/validation";

/**
 * ContactForm — client component driving the contact server action.
 * Uses React 19 `useActionState` for pending/success/error state. Fields are
 * accessible (associated labels, `aria-invalid` + `aria-describedby` for inline
 * errors); a hidden honeypot drops naive bots.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    INITIAL_CONTACT_STATE,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/40 p-8 text-center"
      >
        <CheckCircle2 className="size-10 text-brand" aria-hidden />
        <h2 className="text-lg font-semibold">Thanks — message sent!</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ve received your enquiry and will get back to you shortly.
        </p>
      </div>
    );
  }

  const fieldError = (field: "name" | "email" | "message") =>
    state.errors?.[field];

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={CONTACT_LIMITS.name.max}
          defaultValue={state.values?.name}
          aria-invalid={Boolean(fieldError("name"))}
          aria-describedby={fieldError("name") ? "name-error" : undefined}
        />
        {fieldError("name") && (
          <p id="name-error" role="alert" className="text-sm text-destructive">
            {fieldError("name")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={CONTACT_LIMITS.email.max}
          defaultValue={state.values?.email}
          aria-invalid={Boolean(fieldError("email"))}
          aria-describedby={fieldError("email") ? "email-error" : undefined}
        />
        {fieldError("email") && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {fieldError("email")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={CONTACT_LIMITS.message.max}
          defaultValue={state.values?.message}
          aria-invalid={Boolean(fieldError("message"))}
          aria-describedby={fieldError("message") ? "message-error" : undefined}
        />
        {fieldError("message") && (
          <p
            id="message-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {fieldError("message")}
          </p>
        )}
      </div>

      {/* Form-level error (e.g. delivery failure) with a direct-email fallback. */}
      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
