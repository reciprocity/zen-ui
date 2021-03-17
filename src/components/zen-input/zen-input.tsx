import { Component, Host, h, Prop, Element, Listen, State, Method, Watch } from '@stencil/core';
import { getNextField } from '../helpers/helpers';

/**
 * @slot leadingSlot - Slot placed at the left
 * @slot trailingSlot - Slot placed at the right
 * @event change | Content change applied
 * @event input | Content changed
 * @event focus | Focused
 * @event blur | Focus lost
 */
@Component({
  tag: 'zen-input',
  styleUrl: 'zen-input.scss',
  shadow: true,
})
export class ZenInput {
  input = null;

  @Element() host: HTMLZenInputElement;

  @State() inputFocused = false;

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';

  /** Paint focused border */
  @Prop() readonly hasFocus = false;

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
    if (ev.key === 'Enter' && this.enterToTab) {
      ev.preventDefault();
      getNextField(this.input).focus();
    }
  }

  @Watch('value')
  async monthViewedInCalendarChanged(value: string): Promise<void> {
    this.input.value = value;
  }

  /** Focus input */
  @Method()
  async focusInput(): Promise<void> {
    this.input.focus();
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
  };

  private onChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    // change event should be forwarded, because it's not composed:
    this.host.dispatchEvent(new window.Event('change'));
  };

  private onBlur = () => {
    this.inputFocused = false;
  };

  private onFocus = () => {
    this.inputFocused = true;
  };

  private getValue(): string {
    return this.value;
  }

  render(): HTMLElement {
    const value = this.getValue();

    return (
      <Host class={{ 'has-focus': this.hasFocus || this.inputFocused, invalid: this.invalid, disabled: this.disabled }}>
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
