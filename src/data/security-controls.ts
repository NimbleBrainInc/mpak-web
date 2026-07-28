// The 25 MTF controls, grouped by domain. Data only — rendering lives in the page.

export interface Control {
  id: string;
  name: string;
  description: string;
  levels: number[];
  mcpSpecific?: boolean;
  recommended?: boolean;
  legal?: boolean;
}

export interface Domain {
  id: string;
  name: string;
  abbrev: string;
  description: string;
  controls: Control[];
}

export const DOMAINS: Domain[] = [
  {
    id: 'supply_chain',
    name: 'Supply Chain',
    abbrev: 'SC',
    description: 'Ensures dependencies are known, vulnerability-free, and from trusted sources.',
    controls: [
      {
        id: 'SC-01',
        name: 'SBOM Generation',
        description:
          'Bundle includes a Software Bill of Materials (CycloneDX or SPDX format) listing all components.',
        levels: [1, 2, 3, 4],
      },
      {
        id: 'SC-02',
        name: 'Vulnerability Scan',
        description:
          'No critical CVEs in KEV, no critical/high CVEs with EPSS > 10%. VEX statements supported for exceptions.',
        levels: [2, 3, 4],
      },
      {
        id: 'SC-03',
        name: 'Dependency Pinning',
        description:
          'All dependencies pinned to exact versions via lock files. No floating version ranges.',
        levels: [2, 3, 4],
      },
      {
        id: 'SC-04',
        name: 'License Compliance',
        description: 'Bundle license declared and compatible with all dependency licenses.',
        levels: [3, 4],
        legal: true,
      },
      {
        id: 'SC-05',
        name: 'Trusted Sources',
        description:
          'All dependencies from approved registries (npm, PyPI, crates.io). Private registries declared.',
        levels: [3, 4],
      },
    ],
  },
  {
    id: 'code_quality',
    name: 'Code Quality',
    abbrev: 'CQ',
    description: 'Ensures code is free from secrets, malware, and security defects.',
    controls: [
      {
        id: 'CQ-01',
        name: 'No Embedded Secrets',
        description:
          'No AWS keys, API tokens, passwords, or private keys in source. Scanned with TruffleHog.',
        levels: [1, 2, 3, 4],
      },
      {
        id: 'CQ-02',
        name: 'No Malicious Patterns',
        description:
          'No data exfiltration, typosquatting, crypto miners, backdoors, or malicious install hooks.',
        levels: [1, 2, 3, 4],
      },
      {
        id: 'CQ-03',
        name: 'Static Analysis Clean',
        description:
          'Server code passes Bandit/ESLint security analysis with no high-severity findings.',
        levels: [2, 3, 4],
      },
      {
        id: 'CQ-04',
        name: 'Input Validation',
        description:
          'All tool parameters validated using schema libraries (Zod, Pydantic, JSON Schema).',
        levels: [3, 4],
      },
      {
        id: 'CQ-05',
        name: 'Safe Execution Patterns',
        description: 'No shell=True, eval(), exec(), or SQL string concatenation in server code.',
        levels: [3, 4],
      },
      {
        id: 'CQ-06',
        name: 'Anti-Slopsquatting',
        description:
          'Package name not in LLM hallucination corpus. Protects against AI code generation attacks.',
        levels: [2, 3, 4],
        mcpSpecific: true,
      },
      {
        id: 'CQ-07',
        name: 'Behavioral Analysis',
        description:
          'Bundle runs in isolated sandbox. Network, filesystem, and process behavior monitored.',
        levels: [4],
        mcpSpecific: true,
      },
    ],
  },
  {
    id: 'artifact_integrity',
    name: 'Artifact Integrity',
    abbrev: 'AI',
    description:
      'Ensures the bundle has not been tampered with and can be cryptographically verified.',
    controls: [
      {
        id: 'AI-01',
        name: 'Valid Manifest',
        description: 'manifest.json present and valid. Required fields: name, version, mcp_config.',
        levels: [1, 2, 3, 4],
      },
      {
        id: 'AI-02',
        name: 'Content Hashes',
        description: 'SHA-256 hashes for all files in manifest. Verified against actual contents.',
        levels: [2, 3, 4],
      },
      {
        id: 'AI-03',
        name: 'Bundle Signature',
        description:
          'Cryptographically signed with Sigstore or GPG. Signature verifiable against publisher key.',
        levels: [3, 4],
      },
      {
        id: 'AI-04',
        name: 'Reproducible Build',
        description: 'Independent builds from same source produce identical bundles.',
        levels: [4],
        recommended: true,
      },
    ],
  },
  {
    id: 'provenance',
    name: 'Provenance',
    abbrev: 'PR',
    description: 'Establishes the origin and build process of the bundle.',
    controls: [
      {
        id: 'PR-01',
        name: 'Source Repository',
        description:
          'Public source repository linked and accessible. Source matches bundle contents.',
        levels: [2, 3, 4],
      },
      {
        id: 'PR-02',
        name: 'Author Identity',
        description: 'Publisher verified via OIDC (GitHub, Google) or email domain verification.',
        levels: [2, 3, 4],
      },
      {
        id: 'PR-03',
        name: 'Build Attestation',
        description:
          'SLSA provenance attestation from trusted builder (GitHub Actions, GitLab CI).',
        levels: [3, 4],
      },
      {
        id: 'PR-04',
        name: 'Commit Linkage',
        description: 'Linked to specific source commit. Signed commits recommended.',
        levels: [4],
        recommended: true,
      },
      {
        id: 'PR-05',
        name: 'Source Repository Health',
        description:
          'OpenSSF Scorecard score >= 5.0 (L3) or >= 7.0 (L4). No critical check failures.',
        levels: [3, 4],
      },
    ],
  },
  {
    id: 'capability_declaration',
    name: 'Capability Declaration',
    abbrev: 'CD',
    description: 'Ensures bundles accurately declare their capabilities and permissions.',
    controls: [
      {
        id: 'CD-01',
        name: 'Tool Declaration',
        description: 'All tools declared in manifest with human-readable descriptions.',
        levels: [1, 2, 3, 4],
      },
      {
        id: 'CD-02',
        name: 'Permission Scope',
        description:
          'Filesystem, network, environment, subprocess permissions declared in manifest.',
        levels: [2, 3, 4],
      },
      {
        id: 'CD-03',
        name: 'Tool Description Safety',
        description:
          'No prompt injection, exfiltration instructions, or hidden directives in tool descriptions.',
        levels: [2, 3, 4],
        mcpSpecific: true,
      },
      {
        id: 'CD-04',
        name: 'Credential Scope Declaration',
        description:
          'OAuth scopes and API permissions declared. Least-privilege principle enforced.',
        levels: [3, 4],
        mcpSpecific: true,
      },
    ],
  },
];

export const LEVEL_CLASSES = [
  {
    legend: 'border-mpak-gray-500 text-mpak-gray-500',
    active: 'bg-mpak-gray-500/15 text-mpak-gray-500',
  },
  {
    legend: 'border-terminal-success text-terminal-success',
    active: 'bg-terminal-success/15 text-terminal-success',
  },
  {
    legend: 'border-accent-emerald text-accent-emerald',
    active: 'bg-accent-emerald/15 text-accent-emerald',
  },
  {
    legend: 'border-accent-gold-400 text-accent-gold-400',
    active: 'bg-accent-gold-400/15 text-accent-gold-400',
  },
];

