import { h, Component, Element, Host, Prop, State } from '@stencil/core';
import { faChevronRight, faChevronDown, IconDefinition } from '@fortawesome/pro-regular-svg-icons';

import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-panel',
  styleUrl: 'zen-panel.scss',
  shadow: true,
})
export class ZenPanel {
  @Element() host: HTMLZenPanelElement;

  /** Default visible state */
  @Prop() readonly visible: boolean = false;

  @State() internalVisible = this.visible;

  toggleContent(): void {
    this.internalVisible = !this.internalVisible;
  }

  icon(): IconDefinition {
    return this.internalVisible ? faChevronDown : faChevronRight;
  }

  contentClasses(): Record<string, boolean> {
    return {
      'content-wrapper': true,
      visible: this.internalVisible,
    };
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);

    return (
      <Host>
        <ZenSpace class="header" padding="md lg" onClick={() => this.toggleContent()}>
          <ZenIcon icon={this.icon()} size="sm" padding="sm none" class="icon chevron" />
          <slot name="header" />
        </ZenSpace>
        <ZenSpace padding="md lg" class={this.contentClasses()}>
          <div class="content">
            <slot></slot>
          </div>
        </ZenSpace>
      </Host>
    );
  }
}
