/*
  HOW THESE ANIMATIONS WORK:
  Base idea is to change attribute `animate` based on current element's state.
  We can then apply different css props using selector `[animate=state]`.

  Possible states and animate value in each state:
  1. Animate show FROM params - `[animate = in-start]`
  2. Animate show TO params - `[animate = in-end]`
  3. Animate hide FROM params - `[animate = out-start]`
  4. Animate hide TO params - `[animate = out-end]`
  5. Hide transition finished - `[animate = out-finished]` - here we can set `display:none` or destroy object(s) in the callback.

  Check `zen-popover` component for example.
*/

import { waitNextFrame } from '../helpers/helpers';

async function transitionAnimateAttr(element: HTMLElement, fromAttr: string, toAttr: string, fromCurrentValue = true) {
  // fromCurrentValue: Animate to toAttr from current values. Else it will force fromAttr before animating to toAttr values.

  if (!fromCurrentValue) {
    element.style.transition = 'none'; // remove transition, so from values are applied instantly
  }
  element.setAttribute('animate', fromAttr);
  await waitNextFrame();
  if (!fromCurrentValue) {
    element.style.transition = '';
  }
  element.setAttribute('animate', toAttr);
}

function clearHideTimer(element: HTMLElement) {
  const hideTimerId = parseInt(element.getAttribute('data-anim-hide-timer'), 10);
  if (!hideTimerId) return;
  clearTimeout(hideTimerId);
}

export async function showWithAnimation(element: HTMLElement, fromCurrentValue = true): Promise<void> {
  clearHideTimer(element);
  await transitionAnimateAttr(element, 'in-start', 'in-end', fromCurrentValue);
}

export async function showInstantly(element: HTMLElement): Promise<void> {
  clearHideTimer(element);
  element.setAttribute('animate', 'in-end');
}

export async function hideWithAnimation(
  element: HTMLElement,
  callback?: () => void,
  fromCurrentValue = true,
): Promise<void> {
  clearHideTimer(element);

  await transitionAnimateAttr(element, 'out-start', 'out-end', fromCurrentValue);

  // Remove element with delay, so transition finishes first:
  const transitionTime = parseFloat(getComputedStyle(element)['transitionDuration']) * 1000;
  const hideTimerId = setTimeout(() => {
    element.setAttribute('animate', 'out-finished');
    if (callback) callback();
  }, transitionTime || 10);
  element.setAttribute('data-anim-hide-timer', hideTimerId.toString());
}

export async function hideInstantly(element: HTMLElement): Promise<void> {
  clearHideTimer(element);
  element.setAttribute('animate', 'out-finished');
}
