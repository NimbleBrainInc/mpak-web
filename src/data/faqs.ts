// Homepage FAQ. Also the source for the FAQPage JSON-LD.

export const faqs = [
  {
    question: 'What is mpak?',
    answer:
      'mpak is the secure, open-source package registry for MCP servers. Every bundle is scanned with 25 security controls across 5 domains, and trust scores are visible on every package. Think of it as a purpose-built registry for the MCP ecosystem, with security at its core.',
  },
  {
    question: 'What are Bundles?',
    answer:
      'Bundles are pre-packaged MCP servers that give your AI new capabilities: database access, API integrations, file operations. They contain everything needed to run: binaries, configs, and metadata. Works across macOS, Linux, and Windows.',
  },
  {
    question: 'How is mpak different from the MCP Registry?',
    answer:
      'The MCP Registry is a metaregistry that aggregates server listings from multiple sources. mpak is a package registry: it hosts the actual bundles, scans them for security, computes trust scores, and serves them to the CLI. The MCP Registry can point to mpak as a source.',
  },
  {
    question: 'Is mpak open source?',
    answer:
      'Yes. The registry, CLI, SDK, scanner, and deploy tooling are all Apache 2.0 licensed. mpak.dev is one instance of the registry, but you can self-host your own with federation, policies, and audit logging.',
  },
  {
    question: 'How do I install a package?',
    answer:
      'First install the CLI: npm install -g @nimblebrain/mpak. Then pull a bundle: mpak bundle pull @scope/bundle-name.',
  },
  {
    question: 'Is mpak free to use?',
    answer:
      'Yes, mpak is completely free for both users and publishers. The registry, CLI tool, and all features are available at no cost.',
  },
  {
    question: 'How do I publish a package?',
    answer:
      'Add a manifest.json and the mcpb-pack GitHub Action to your repo. When you create a release, the action builds, scans, and publishes automatically. Visit /publish for the full guide.',
  },
];
