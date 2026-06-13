/**
 * Barrel for the content type layer.
 * Import from `@/types` rather than deep paths so model locations can move
 * without churn at call sites.
 */
export type {
  IconComponent,
  NavItem,
  FooterColumn,
  SocialLink,
  Service,
  CallToAction,
  Stat,
  ProcessStep,
  Value,
  SectionContent,
  SiteConfig,
} from "./content";
