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
      content: true,
      visible: this.internalVisible,
    };
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);

    return (
      <Host>
        <div class="header-container" onClick={() => this.toggleContent()}>
          <ZenIcon icon={this.icon()} size="sm" class="icon fill chevron" />
          <slot name="header" />
        </div>
        <div class={this.contentClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
