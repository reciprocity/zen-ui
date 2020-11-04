export function isChildOf(div: HTMLElement, parent: HTMLElement) {
  let node = div.parentNode;
  while (node != null) {
    if (node === parent) return true;
    node = node.parentNode;
  }
  return false;
}