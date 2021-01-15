import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { getNextField } from '../helpers/helpers';

/**
 * @slot leadingSlot - Slot placed at the left
 * @slot trailingSlot - Slot placed at the right
 */
@Component({
  tag: 'zen-input',
  styleUrl: 'zen-input.scss',
  shadow: true,
})
export class ZenInput {
  input = null;

  @Element() hostElement: HTMLZenInputElement;

  /** Paint focused border */
  @Prop({ mutable: true }) hasFocus = false;

  /** Placeholder of the input. */
  @Prop() readonly placeholder: string = '';

  /** Disables input. */
  @Prop() readonly disabled = false;

  /** Shows invalid styles. */
  @Prop() readonly invalid = false;

  /** Focus next control when pressing Enter key */
  @Prop() readonly enterToTab = true;

  /** The value of the input. */
  @Prop({ mutable: true }) value?: string = '';

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    // TODO: replace with ts-key-enum
    // currently it's impossible due to Cannot find module 'ts-key-enum' in jest
    if (ev.key === 'Enter' && this.enterToTab) {
      ev.preventDefault();
      getNextField(this.input).focus();
    }
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
  };

  private onChange = () => {
    // change event should be forwarded, because it's not composed:
    this.hostElement.dispatchEvent(new window.Event('change'));
  };

  private onBlur = () => {
    this.hasFocus = false;
  };

  private onFocus = () => {
    this.hasFocus = true;
  };

  private getValue(): string {
    return this.value;
  }

  render(): HTMLElement {
    const value = this.getValue();

    return (
      <Host class={{ 'has-focus': this.hasFocus, invalid: this.invalid, disabled: this.disabled }}>
        <slot name="leadingSlot"></slot>
        <input
          ref={el => (this.input = el)}
          type="text"
          placeholder={this.placeholder}
          value={value}
          disabled={this.disabled}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onInput={this.onInput}
          onChange={this.onChange}
        />
        <slot name="trailingSlot"></slot>
      </Host>
    );
  }
}
