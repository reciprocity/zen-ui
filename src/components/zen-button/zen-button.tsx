import { Component, Host, h, Prop, Element, State, Watch, Listen } from '@stencil/core';
import { ButtonVariants } from './types';

/**
 * @slot leadingIcon - Slot for the icon on the left
 * @slot trailingIcon - Slot for the icon on the right
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

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';

  /** Color variant of the button */
  @Prop() readonly variant: ButtonVariants = 'primary';

  /** If present, will show a spinner */
  @Prop() readonly loading?: boolean = false;

  /** If present, button will be disabled */
  @Prop() readonly disabled?: boolean = false;

  /** Sets if button can be tabbable/focusable */
  @State() tabindex = 0;

  @Watch('disabled')
  async disabledChanged(disabled: boolean): Promise<void> {
    this.tabindex = disabled ? -1 : 0;
  }

  componentWillLoad(): void {
    this.leadingIconSlotFulfilled =
      !!this.hostElement.querySelector('[slot="leadingIcon"]') && this.hostElement.textContent.trim() != '';
    this.trailingIconSlotFulfilled =
      !!this.hostElement.querySelector('[slot="trailingIcon"]') && this.hostElement.textContent.trim() != '';
    this.disabledChanged(this.disabled);
  }

  @Listen('keyup')
  handleKeyUp(ev: KeyboardEvent): void {
    ev.code === 'Enter' ? this.hostElement.click() : null;
  }

  render(): HTMLElement {
    return (
      <Host class={{ btn: true, [`btn-${this.variant}`]: true, disabled: this.disabled }} tabindex={this.tabindex}>
        <slot name="leadingIcon" />
        {this.loading ? <zen-spinner></zen-spinner> : null}
        <span class={{ ml: this.leadingIconSlotFulfilled, mr: this.trailingIconSlotFulfilled }}>
          <slot>Button</slot>
        </span>
        <slot name="trailingIcon" />
      </Host>
    );
  }
}
