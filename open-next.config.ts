import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare adapter config.
 * No incremental cache override is set: the site is fully static/SSG (no ISR),
 * so we don't need an R2 cache binding. Add `incrementalCache` here later if a
 * route starts using ISR/revalidation.
 */
export default defineCloudflareConfig();
