import { h, Component, Element, Host, Prop } from '@stencil/core';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';

import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-panel',
  styleUrl: 'zen-panel.scss',
  shadow: true,
})
export class ZenPanel {
  @Element() host: HTMLZenPanelElement;

  /** Default visible state */
  @Prop({ reflect: true, mutable: true }) visible = false;

  toggleContent(): void {
    this.visible = !this.visible;
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);

    return (
      <Host>
        <ZenSpace class="header" padding="md lg" onClick={() => this.toggleContent()}>
          <ZenIcon icon={faChevronRight} size="sm" padding="sm none" class="icon chevron" />
          <slot name="header" />
        </ZenSpace>
        <ZenSpace padding="md lg" class="content-wrapper">
          <div class="content">
            <slot></slot>
          </div>
        </ZenSpace>
      </Host>
    );
  }
}
