/**
 * Operator identity config. Self-hosted instances can override these
 * via PUBLIC_ environment variables to brand the site for their org.
 */
const env = import.meta.env;

export const SITE_URL = (env.PUBLIC_SITE_URL || 'https://mpak.dev').replace(/\/$/, '');

/**
 * Web font stylesheet, shared by the marketing layout and the Starlight docs
 * config so both sides of the routing boundary paint text the same way.
 */
export const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=optional';

export const siteConfig = {
  siteUrl: SITE_URL,
  // Docs are same-site now, so this is a path rather than an absolute URL.
  // No trailing slash: callers append their own (`${docsUrl}/bundles/manifest/`).
  docsUrl: '/docs',
  operator: {
    name: env.PUBLIC_OPERATOR_NAME || 'NimbleBrain Inc.',
    shortName: env.PUBLIC_OPERATOR_SHORT_NAME || 'NimbleBrain',
    url: env.PUBLIC_OPERATOR_URL || 'https://nimblebrain.ai',
  },
  contact: {
    general: env.PUBLIC_CONTACT_EMAIL || 'hello@mpak.dev',
    legal: env.PUBLIC_LEGAL_EMAIL || 'legal@mpak.dev',
    privacy: env.PUBLIC_PRIVACY_EMAIL || 'privacy@mpak.dev',
  },
  github: {
    org: env.PUBLIC_GITHUB_ORG_URL || 'https://github.com/NimbleBrainInc',
    repo: env.PUBLIC_GITHUB_REPO_URL || 'https://github.com/NimbleBrainInc/mpak',
    issues: env.PUBLIC_GITHUB_ISSUES_URL || 'https://github.com/NimbleBrainInc/mpak/issues',
  },
};
