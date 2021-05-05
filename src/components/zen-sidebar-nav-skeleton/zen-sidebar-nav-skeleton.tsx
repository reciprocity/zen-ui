import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

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
        <ZenSpace block padding="none">
          <ZenSpace class="program-selector" padding="md" spacing="xl" no-wrap>
            <ZenSkeleton class="no-shrink" style={{ width: '1.5rem', height: '1.5rem' }}></ZenSkeleton>
            <ZenSkeleton style={{ width: `100%`, height: '1rem' }}></ZenSkeleton>
          </ZenSpace>
          <ZenSpace padding="xl md" spacing="xl" vertical>
            <div class="selected-item-bg"></div>
            {this.widths.map(width => (
              <ZenSkeleton style={{ width: `${width}%`, height: '1rem' }}></ZenSkeleton>
            ))}
          </ZenSpace>
        </ZenSpace>
      </Host>
    );
  }
}
