import { REGISTRY_URL, SITE_URL, siteConfig } from '../config/site';

const BASE_URL = SITE_URL;

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'mpak',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description:
      'The package manager for MCP bundles. Discover, install, and publish Model Context Protocol servers.',
    sameAs: [siteConfig.github.repo, 'https://x.com/nimblebraininc'],
  };
}

/**
 * Generate WebSite schema with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'mpak',
    url: BASE_URL,
    // Search is the registry app's route, not this site's — / is static here.
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${REGISTRY_URL}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate SoftwareSourceCode schema for the mpak CLI tool
 */
export function generateCLIToolSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'mpak CLI',
    alternateName: 'mpak',
    description:
      'Command-line interface for discovering, installing, and managing MCP server bundles.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    downloadUrl: 'https://www.npmjs.com/package/@nimblebrain/mpak',
    softwareRequirements: 'Node.js 18+',
  };
}

/**
 * Generate ItemList schema for browse/listing pages
 */
export function generateItemListSchema(
  items: Array<{ name: string; url: string }>,
  listName: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
