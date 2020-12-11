import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  leftSlotFulfilled: boolean;
  rightSlotFulfilled: boolean;

  @Element() hostElement: HTMLZenButtonElement;

  /** Color variant of the button */
  @Prop() readonly variant = 'primary';

  /** Label of the button */
  @Prop() readonly label = '';

  /** If present, will show a spinner */
  @Prop() readonly loading?: boolean = false;

  /** If present, button will be disabled */
  @Prop() readonly disabled?: boolean = false;

  componentWillLoad(): void {
    this.leftSlotFulfilled = !!this.hostElement.querySelector('[slot="leadingIcon"]');
    this.rightSlotFulfilled = !!this.hostElement.querySelector('[slot="trailingIcon"]');
  }

  render(): HTMLElement {
    return (
      <Host>
        <button type="button" class={{ btn: true, [`btn-${this.variant}`]: true }} disabled={this.disabled}>
          <slot name="leadingIcon" />
          {this.loading ? <zen-spinner></zen-spinner> : null}
          {this.label ? (
            <span class={{ ml: this.leftSlotFulfilled, mr: this.rightSlotFulfilled }}>{this.label}</span>
          ) : null}
          <slot name="trailingIcon" />
        </button>
      </Host>
    );
  }
}
