import { Component, Host, h, Prop, Element, State, Watch, Listen } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { ButtonVariants } from './types';
import { InputSize } from '../helpers/types';

/**
 * @slot leadingIcon - Slot for the icon on the left
 * @slot trailingIcon - Slot for the icon on the right
 * @event click | Button clicked
 */
@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  leadingIconSlotFulfilled: boolean;
  trailingIconSlotFulfilled: boolean;

  @Element() host: HTMLZenButtonElement;

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

  /** Size variant */
  @Prop({ reflect: true }) readonly size: InputSize = 'md';

  @Watch('disabled')
  async disabledChanged(disabled: boolean): Promise<void> {
    this.tabindex = disabled ? -1 : 0;
  }

  componentWillLoad(): void {
    this.leadingIconSlotFulfilled =
      !!this.host.querySelector('[slot="leadingIcon"]') && this.host.textContent.trim() != '';
    this.trailingIconSlotFulfilled =
      !!this.host.querySelector('[slot="trailingIcon"]') && this.host.textContent.trim() != '';
    this.disabledChanged(this.disabled);
  }

  @Listen('keyup')
  handleKeyUp(ev: KeyboardEvent): void {
    ev.code === 'Enter' ? this.host.click() : null;
  }

  render(): HTMLElement {
    const ZenSpinner = applyPrefix('zen-spinner', this.host);
    const spinnerStyle = {
      position: 'absolute',
      inset: 0,
    };
    return (
      <Host class={{ btn: true, [`btn-${this.variant}`]: true, disabled: this.disabled }} tabindex={this.tabindex}>
        <slot name="leadingIcon" />
        {this.loading ? <ZenSpinner style={spinnerStyle}></ZenSpinner> : null}
        <span class={{ ml: this.leadingIconSlotFulfilled, mr: this.trailingIconSlotFulfilled }}>
          <slot>Button</slot>
        </span>
        <slot name="trailingIcon" />
      </Host>
    );
  }
}
