import { defaultOpenGraph, DEFAULT_OG_IMAGE } from "@/lib/defaultSocialMetadata";

/**
 * Per-page Open Graph metadata with correct url + default social image.
 * @param {string} path Canonical path (e.g. `/shop`, `/locations/houma-la`).
 */
export function pageOpenGraph(path, overrides = {}) {
  return {
    ...defaultOpenGraph,
    url: path,
    images: [DEFAULT_OG_IMAGE],
    ...overrides,
  };
}
