import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import { Position, TooltipVariant, Point, Rect } from '../helpers/types';
import { containsRect, oppositePosition } from '../helpers/helpers';
import debounce from 'lodash/debounce';

@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  @Element() element: HTMLZenTooltipElement;

  @State() visible = false;

  @State() realPosition: Position = 'top';

  /** Set tooltip position */
  @Prop() readonly position?: Position = 'top';

  /** Set tooltip variant */
  @Prop() readonly variant?: TooltipVariant = 'dark';

  /** Set tooltip label */
  @Prop() readonly label?: string = '';

  /** Set tooltip offset to target element */
  @Prop() readonly offset?: number = 10;

  /** Dont hide tooltip */
  @Prop() readonly alwaysVisible?: boolean = false;

  /** Limit tooltip's height and make content scroll  */
  @Prop() readonly maxHeight: string = 'none';

  /** Delay between mouse out and tooltip hide (in ms)  */
  @Prop() readonly hideDelay: number = 0;

  /** Delay between mouse enter and tooltip show (in ms)  */
  @Prop() readonly showDelay: number = 300;

  /** Pointing arrow - like a cartoon balloon */
  @Prop() readonly hasArrow?: boolean = true;

  positionTooltip(position?: Position): Rect {
    const previousElement = this.element.previousElementSibling as HTMLElement;
    const bounds = previousElement.getBoundingClientRect();

    this.element.style.display = 'block';
    this.element.style.left = '0';
    this.element.style.top = '0';
    const myBounds = this.element.getBoundingClientRect();
    this.element.style.display = '';

    let x = bounds.left - myBounds.left + (bounds.width - myBounds.width) / 2;
    let y = bounds.top - myBounds.top + (bounds.height - myBounds.height) / 2;

    switch (position || this.position) {
      case 'left':
        x -= (bounds.width + myBounds.width) / 2 + this.offset;
        break;

      case 'right':
        x += (bounds.width + myBounds.width) / 2 + this.offset;
        break;

      case 'top':
        y -= (bounds.height + myBounds.height) / 2 + this.offset;
        break;

      case 'bottom':
        y += (bounds.height + myBounds.height) / 2 + this.offset;
        break;
    }

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;

    myBounds.x += x;
    myBounds.y += y;
    return myBounds;
  }

  isTooltipFullyVisible(tooltipRect?: Rect): boolean {
    const myBounds = tooltipRect || this.element.getBoundingClientRect();
    const viewBounds = {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
    return containsRect(viewBounds, myBounds, 10);
  }

  show(): void {
    this.debounceHide.cancel();
    if (this.visible) return;
    const tooltipRect = this.positionTooltip();

    this.realPosition = this.position;
    // if it's alwaysVisible we shouldn't change it if it's out of view:
    if (!this.alwaysVisible && !this.isTooltipFullyVisible(tooltipRect)) {
      this.realPosition = oppositePosition(this.position);
      this.positionTooltip(this.realPosition);
    }
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  debounceShow = debounce(this.show, this.showDelay);

  delay = this.maxHeight != 'none' ? Math.max(this.hideDelay, 150) : this.hideDelay;
  debounceHide = debounce(this.hide, this.delay);

  componentDidLoad(): void {
    let lastPoint: Point = { x: 0, y: 0 };

    const show = (event?: MouseEvent) => {
      this.debounceHide.cancel();

      // Show only if mouse hasn't moved too much:
      if (event) {
        const dist = Math.sqrt((lastPoint.x - event.clientX) ** 2 + (lastPoint.y - event.clientY) ** 2);
        const moveThreshold = 3;
        if (dist <= moveThreshold) return;
        lastPoint = { x: event.clientX, y: event.clientY };
      }

      this.debounceShow();
    };

    const hide = () => {
      this.debounceShow.cancel();
      this.debounceHide();
    };

    if (this.alwaysVisible) {
      this.realPosition = this.position;
      // Add timeout, so target component is already layed-out correctly:
      setTimeout(() => this.show(), 100);
      return;
    }

    const tooltip = this.element;
    const previousElement = tooltip.previousElementSibling;
    for (const el of [tooltip, previousElement]) {
      if (!el) continue;
      el.addEventListener('mousemove', (event: MouseEvent) => show(event));
      el.addEventListener('touchstart', () => show());
      el.addEventListener('mouseout', (event: MouseEvent) => {
        // filter events bubbling from children:
        if (event.target !== tooltip && event.target !== previousElement) return;
        hide();
      });
      el.addEventListener('touchcancel', () => hide());
    }
  }

  render(): HTMLElement {
    const classes = {
      tooltip: true,
      [this.variant]: true,
      [this.realPosition]: true,
      scrollable: this.maxHeight !== 'none',
    };
    return (
      <Host style={{ 'max-height': this.maxHeight }} class={{ visible: this.visible, ...classes }}>
        <slot>{this.label}</slot>
        <div
          class={{
            arrow: this.hasArrow,
            [this.realPosition]: true,
            [this.variant]: true,
          }}
        ></div>
      </Host>
    );
  }
}
