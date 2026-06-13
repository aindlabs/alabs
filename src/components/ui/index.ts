/**
 * Barrel for hand-authored layout/typography primitives.
 * shadcn/ui components are imported by their own path (e.g. `@/components/ui/button`),
 * so they intentionally live outside this barrel.
 */
export { Container, type ContainerProps } from "./container";
export { Section, type SectionProps } from "./section";
export { Heading, Eyebrow, Lead, type HeadingProps } from "./typography";
