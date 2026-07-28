import { describe, expect, it } from 'vitest';
import { SITE_URL } from '../config/site';
import {
  generateBreadcrumbSchema,
  generateCLIToolSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateItemListSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from './schema';

describe('generateBreadcrumbSchema', () => {
  it('produces correct BreadcrumbList with positions', () => {
    const items = [
      { name: 'Home', url: 'https://mpak.dev/' },
      { name: 'Security', url: 'https://mpak.dev/security/' },
      { name: 'Controls', url: 'https://mpak.dev/security/controls/' },
    ];
    const schema = generateBreadcrumbSchema(items);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://mpak.dev/',
    });
    expect(schema.itemListElement[2]!.position).toBe(3);
  });
});

describe('generateFAQSchema', () => {
  it('produces correct FAQPage structure', () => {
    const faqs = [
      { question: 'What is mpak?', answer: 'A package manager for MCP.' },
      { question: 'How to install?', answer: 'npm install mpak' },
    ];
    const schema = generateFAQSchema(faqs);

    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'What is mpak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A package manager for MCP.',
      },
    });
  });
});

describe('generateItemListSchema', () => {
  it('produces correct ItemList structure', () => {
    const items = [
      { name: 'SC-01', url: 'https://mpak.dev/security/controls/#SC-01' },
      { name: 'SC-02', url: 'https://mpak.dev/security/controls/#SC-02' },
    ];
    const schema = generateItemListSchema(items, 'Test List');

    expect(schema['@type']).toBe('ItemList');
    expect(schema.name).toBe('Test List');
    expect(schema.numberOfItems).toBe(2);
    expect(schema.itemListElement[0]!.position).toBe(1);
    expect(schema.itemListElement[1]!.position).toBe(2);
  });
});

describe('generateHowToSchema', () => {
  it('produces correct HowTo structure', () => {
    const steps = [
      { name: 'Install', text: 'Run npm install mpak' },
      { name: 'Run', text: 'Run mpak run @scope/pkg' },
    ];
    const schema = generateHowToSchema('Install a package', 'How to install', steps);

    expect(schema['@type']).toBe('HowTo');
    expect(schema.name).toBe('Install a package');
    expect(schema.step).toHaveLength(2);
    expect(schema.step[0]!.position).toBe(1);
    expect(schema.step[1]!.name).toBe('Run');
  });
});

describe('static schemas', () => {
  it('generateOrganizationSchema returns Organization', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('mpak');
    expect(schema.url).toBe(SITE_URL);
  });

  it('generateWebSiteSchema returns WebSite with SearchAction', () => {
    const schema = generateWebSiteSchema();
    expect(schema['@type']).toBe('WebSite');
    expect(schema.potentialAction['@type']).toBe('SearchAction');
  });

  it('generateCLIToolSchema returns SoftwareApplication', () => {
    const schema = generateCLIToolSchema();
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.name).toBe('mpak CLI');
  });
});

describe('search target', () => {
  // The homepage is static here, so a SearchAction pointing at / would render
  // the landing page and discard the term. Search belongs to the registry app.
  it('points the SearchAction at the app-owned browse route', () => {
    const schema = generateWebSiteSchema();
    expect(schema.potentialAction.target.urlTemplate).toBe(
      `${SITE_URL}/bundles/?search={search_term_string}`,
    );
  });

  it('advertises only reachable social profiles', () => {
    const schema = generateOrganizationSchema();
    expect(schema.sameAs).not.toContain('https://twitter.com/mpak_dev');
  });
});
