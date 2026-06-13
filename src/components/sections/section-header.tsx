import { Eyebrow, Heading, Lead } from "@/components/ui";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { HeadingProps } from "@/components/ui/typography";
import type { SectionContent } from "@/types";

interface SectionHeaderProps {
  /** Config-driven copy (eyebrow / title / description). */
  readonly content: SectionContent;
  readonly align?: "center" | "left";
  /** Semantic heading level — defaults to h2 for section titles. */
  readonly as?: HeadingProps["as"];
  readonly size?: HeadingProps["size"];
  readonly className?: string;
}

/**
 * SectionHeader — the eyebrow + heading + lead block reused by every section.
 * Pure composition of the typography primitives, fed by config (`SectionContent`),
 * and revealed on scroll. Centralizes section-title styling so sections don't
 * each re-implement it.
 */
export function SectionHeader({
  content,
  align = "center",
  as = "h2",
  size = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {content.eyebrow && <Eyebrow>{content.eyebrow}</Eyebrow>}
      <Heading as={as} size={size}>
        {content.title}
      </Heading>
      {content.description && <Lead>{content.description}</Lead>}
    </Reveal>
  );
}
