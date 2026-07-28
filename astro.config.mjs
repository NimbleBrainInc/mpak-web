// @ts-check

import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { FONTS_HREF } from './src/config/site';

// Docs live under src/content/docs/docs/ so Starlight serves them at /docs/*,
// leaving the site root to the marketing pages in src/pages/.
export default defineConfig({
  site: 'https://mpak.dev',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'mpak',
      favicon: '/favicon.ico',
      customCss: ['./src/styles/starlight-custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/NimbleBrainInc/mpak' },
        { icon: 'discord', label: 'Discord', href: 'https://nimblebrain.ai/discord' },
        { icon: 'x.com', label: 'X', href: 'https://x.com/nimblebraininc' },
      ],
      head: [
        {
          tag: 'link',
          attrs: { rel: 'stylesheet', href: FONTS_HREF },
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'What is mpak?', slug: 'docs' },
            { label: 'Quickstart', slug: 'docs/quickstart' },
            { label: 'Why a Registry?', slug: 'docs/why-a-registry' },
          ],
        },
        {
          label: 'MCP Bundles',
          items: [
            { label: 'What is an MCP Bundle?', slug: 'docs/bundles/what-is-mcpb' },
            { label: 'Migrate Your MCP Server', slug: 'docs/bundles/migrating' },
            { label: 'Publishing', slug: 'docs/bundles/publishing' },
            { label: 'Manifest Reference', slug: 'docs/bundles/manifest' },
            { label: 'GitHub Action', slug: 'docs/bundles/github-action' },
            { label: 'Multi-Platform Builds', slug: 'docs/bundles/multi-platform' },
            { label: 'User Configuration', slug: 'docs/bundles/user-config' },
          ],
        },
        {
          label: 'Security',
          items: [
            { label: 'Provenance', slug: 'docs/security/provenance' },
            { label: 'Certification', slug: 'docs/security/certification' },
            { label: 'Scanning Your Bundle', slug: 'docs/security/scanning' },
          ],
        },
        {
          label: 'Registry',
          items: [
            { label: 'How It Works', slug: 'docs/registry/how-it-works' },
            { label: 'API Reference', slug: 'docs/registry/api' },
            { label: 'Versioning', slug: 'docs/registry/versioning' },
            { label: 'Access Model', slug: 'docs/registry/access-model' },
            { label: 'Naming Conventions', slug: 'docs/registry/naming' },
          ],
        },
        {
          label: 'Integrations',
          items: [
            { label: 'Claude Code', slug: 'docs/integrations/claude-code' },
            { label: 'Claude Desktop', slug: 'docs/integrations/claude-desktop' },
            { label: 'Cursor', slug: 'docs/integrations/cursor' },
            { label: 'VS Code', slug: 'docs/integrations/vscode' },
          ],
        },
        {
          label: 'CLI Reference',
          items: [
            { label: 'Installation', slug: 'docs/cli/install' },
            { label: 'search', slug: 'docs/cli/search' },
            { label: 'show', slug: 'docs/cli/show' },
            { label: 'pull', slug: 'docs/cli/pull' },
            { label: 'run', slug: 'docs/cli/run' },
            { label: 'config', slug: 'docs/cli/config' },
            { label: 'completion', slug: 'docs/cli/completion' },
            { label: 'cache', slug: 'docs/cli/cache' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Browsing the Registry', slug: 'docs/browsing' },
            { label: 'Troubleshooting', slug: 'docs/troubleshooting' },
            { label: 'Ecosystem', slug: 'docs/ecosystem' },
          ],
        },
      ],
    }),
    sitemap(),
  ],
});
