import { Component, Host, h, Prop, Element } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-sidebar-nav-skeleton',
  styleUrl: 'zen-sidebar-nav-skeleton.scss',
  shadow: true,
})
export class ZenSidebarNavSkeleton {
  @Element() host: HTMLZenSidebarNavSkeletonElement;

  /** Width of sidebar in maximized state (css prop)  */
  @Prop() readonly width: string = '13.5rem';

  private widths = [...Array(6)].map(() => 50 + Math.random() * 0.5 * 100);

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenSkeleton = applyPrefix('zen-skeleton', this.host);
    return (
      <Host style={{ width: this.width }}>
        <ZenSpace block padding="none">
          <ZenSpace padding="md" spacing="xl" vertical>
            {this.widths.map(width => (
              <ZenSkeleton style={{ width: `${width}%`, height: '1rem' }}></ZenSkeleton>
            ))}
          </ZenSpace>
        </ZenSpace>
      </Host>
    );
  }
}
