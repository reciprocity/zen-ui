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

  /** Whether the panel has an arrow */
  @Prop() readonly arrow: boolean = true;

  @State() visible = true;

  toggleContent(): void {
    this.visible = !this.visible;
  }

  icon(): IconDefinition {
    return this.visible ? faChevronRight : faChevronDown;
  }

  contentClasses(): Record<string, boolean> {
    return {
      content: true,
      visible: this.visible,
    };
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);

    return (
      <Host>
        <div class="header-container" onClick={() => this.toggleContent()}>
          {this.arrow && <ZenIcon icon={this.icon()} size="sm" class="icon fill chevron" />}
          <slot name="header" />
        </div>
        <div class={this.contentClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
