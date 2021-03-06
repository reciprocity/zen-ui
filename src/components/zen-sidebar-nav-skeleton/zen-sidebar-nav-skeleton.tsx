import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

/**
 * @slot beforeItems - Insert something above the items
 * @slot afterItems - Insert something beneath the items
 */

@Component({
  tag: 'zen-sidebar-nav-skeleton',
  styleUrl: 'zen-sidebar-nav-skeleton.scss',
  shadow: true,
})
export class ZenSidebarNavSkeleton {
  @Element() host: HTMLZenSidebarNavSkeletonElement;

  private widths = [];

  /** Width of sidebar in maximized state (css prop).<br>Should match `zen-sidebar-nav` width. */
  @Prop() readonly width: string = '13.5rem';

  /** Number of skeleton items  */
  @Prop() readonly items: number = 6;

  @Watch('items')
  async itemsChanged(items: number): Promise<void> {
    this.widths = [...Array(items)].map(() => 50 + Math.random() * 0.5 * 100);
  }

  async componentWillRender(): Promise<void> {
    this.itemsChanged(this.items);
  }

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenSkeleton = applyPrefix('zen-skeleton', this.host);
    return (
      <Host style={{ width: this.width }}>
        <slot name="beforeItems"></slot>
        <ZenSpace block padding="none">
          <ZenSpace padding="xl md" spacing="xl" vertical>
            <div class="selected-item-bg"></div>
            {this.widths.map(width => (
              <ZenSkeleton class="item" style={{ width: `${width}%`, height: '1rem' }}></ZenSkeleton>
            ))}
          </ZenSpace>
          <slot name="afterItems"></slot>
        </ZenSpace>
      </Host>
    );
  }
}
