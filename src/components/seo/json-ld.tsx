import type { JsonLdSchema } from "@/lib/structured-data";

interface JsonLdProps {
  /** One schema object or an array of them. */
  readonly schema: JsonLdSchema | readonly JsonLdSchema[];
}

/**
 * JsonLd — renders schema.org structured data as a `<script type="application/ld+json">`.
 * The payload comes from our own `structured-data` builders (trusted input), so
 * `dangerouslySetInnerHTML` is the standard, safe way to emit JSON-LD.
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Trusted, server-generated JSON-LD — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
