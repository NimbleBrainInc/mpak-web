// Certification levels, security domains, and level styling for the MTF overview page.

export const LEVELS = [
  {
    level: 1,
    name: 'Basic',
    grade: 'L1',
    target: 'Personal projects, experimentation',
    effort: 'Minutes',
    controls: 6,
    coverage: 24,
    highlights: [
      'No embedded secrets',
      'No malware patterns',
      'Valid manifest',
      'Tool declarations',
    ],
  },
  {
    level: 2,
    name: 'Standard',
    grade: 'L2',
    target: 'Team tools, published packages',
    effort: '< 1 hour',
    controls: 14,
    coverage: 56,
    highlights: [
      'Vulnerability scanning (CVE + EPSS)',
      'Dependency pinning',
      'Anti-slopsquatting protection',
      'Tool description safety',
    ],
  },
  {
    level: 3,
    name: 'Verified',
    grade: 'L3',
    target: 'Production, enterprise use',
    effort: 'Days',
    controls: 22,
    coverage: 88,
    highlights: [
      'Cryptographic bundle signatures',
      'Build provenance attestation',
      'OpenSSF Scorecard integration',
      'OAuth scope declarations',
    ],
  },
  {
    level: 4,
    name: 'Attested',
    grade: 'L4',
    target: 'Critical infrastructure, regulated industries',
    effort: 'Weeks',
    controls: 25,
    coverage: 100,
    highlights: [
      'Behavioral analysis sandbox',
      'Reproducible builds',
      'Full provenance chain',
      'Commit-level linkage',
    ],
  },
];

export const DOMAINS = [
  {
    id: 'supply_chain',
    name: 'Supply Chain',
    abbrev: 'SC',
    description: 'Dependencies are known, vulnerability-free, and from trusted sources',
  },
  {
    id: 'code_quality',
    name: 'Code Quality',
    abbrev: 'CQ',
    description: 'Code is free from secrets, malware, and security defects',
  },
  {
    id: 'artifact_integrity',
    name: 'Artifact Integrity',
    abbrev: 'AI',
    description: 'Bundle has not been tampered with and can be verified',
  },
  {
    id: 'provenance',
    name: 'Provenance',
    abbrev: 'PR',
    description: 'Origin and build process are verifiable and trustworthy',
  },
  {
    id: 'capability_declaration',
    name: 'Capability Declaration',
    abbrev: 'CD',
    description: 'Bundles accurately declare their capabilities and permissions',
  },
];

export const LEVEL_CLASSES = [
  { bar: 'bg-mpak-gray-500', badge: 'border-mpak-gray-500 text-mpak-gray-500' },
  { bar: 'bg-terminal-success', badge: 'border-terminal-success text-terminal-success' },
  { bar: 'bg-accent-emerald', badge: 'border-accent-emerald text-accent-emerald' },
  { bar: 'bg-accent-gold-400', badge: 'border-accent-gold-400 text-accent-gold-400' },
];

