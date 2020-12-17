import { Component, Host, h, Prop, Element } from '@stencil/core';
import { ButtonVariants } from './types';

/**
 * @slot leadingIcon - Slot for the icon at the left
 * @slot trailingIcon - Slot for the icon at the right
 */
@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  leadingIconSlotFulfilled: boolean;
  trailingIconSlotFulfilled: boolean;

  @Element() hostElement: HTMLZenButtonElement;

  /** Color variant of the button */
  @Prop() readonly variant: ButtonVariants = ButtonVariants.Primary;

  /** Label of the button */
  @Prop() readonly label = 'Button';

  /** If present, will show a spinner */
  @Prop() readonly loading?: boolean = false;

  /** If present, button will be disabled */
  @Prop() readonly disabled?: boolean = false;

  componentWillLoad(): void {
    this.leadingIconSlotFulfilled = !!this.hostElement.querySelector('[slot="leadingIcon"]');
    this.trailingIconSlotFulfilled = !!this.hostElement.querySelector('[slot="trailingIcon"]');
  }

  render(): HTMLElement {
    return (
      <Host class={{ disabled: this.disabled }}>
        <button type="button" class={{ btn: true, [`btn-${this.variant}`]: true }} disabled={this.disabled}>
          <slot name="leadingIcon" />
          {this.loading ? <zen-spinner></zen-spinner> : null}
          {this.label ? (
            <span class={{ ml: this.leadingIconSlotFulfilled, mr: this.trailingIconSlotFulfilled }}>{this.label}</span>
          ) : null}
          <slot name="trailingIcon" />
        </button>
      </Host>
    );
  }
}
