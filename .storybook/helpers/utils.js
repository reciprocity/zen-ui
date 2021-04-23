import { cloneDeep } from 'lodash';

export const camelToKebab = str => str.replace(/[A-Z]/g, '-$&').toLowerCase();

export function camelKeysToKebab(object) {
  const obj = cloneDeep(object);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const kebab = camelToKebab(key);
      if (kebab === key) continue;
      obj[kebab] = obj[key];
      delete obj[key];
    }
  }
  return obj;
}

export function waitForElement(selector, callback) {
  function afterRender() {
    const elements = document.querySelectorAll(selector);
    if (!elements || !elements.length) return;
    observer.disconnect();
    callback(elements.length === 1 ? elements[0] : elements);
  }

  const observer = new MutationObserver(afterRender);
  observer.observe(document.body, { subtree: true, childList: true });
}

export function loremIpsum(repeat = 1) {
  return 'Lorem Ipsum Quam vestibulum malesuada porta dignissim tristique in facilisi dapibus, iaculis vulputate cum orci vel eleifend potenti vehicula per, pulvinar nam porttitor aliquet nisl augue lacus. '.repeat(repeat);
}
