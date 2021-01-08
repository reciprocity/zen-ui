import { storybookUrl } from './constants';

/**
 * Returns URL for iframe content of a given Storybook docs page
 *
 * @param {string} id  Storybook docs page id
 */
export function toInlineFrameContentUrl(id) {
  return `${storybookUrl}/iframe.html?id=${id}&viewMode=docs`;
}
