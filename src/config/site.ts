/**
 * Operator identity config. Self-hosted instances can override these
 * via PUBLIC_ environment variables to brand the site for their org.
 */
const env = import.meta.env;

export const SITE_URL = (env.PUBLIC_SITE_URL || 'https://mpak.dev').replace(/\/$/, '');

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
