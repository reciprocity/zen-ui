import { Component, Host, h, Prop, EventEmitter, Event, Element, Listen } from '@stencil/core';
import { Key } from 'ts-key-enum';
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
  @Element() hostElement: HTMLZenInputElement;

  /** Paint focused border */
  @Prop({ mutable: true }) hasFocus = false;

  /** Placeholder of the input. */
  @Prop() readonly placeholder: string = null;

  /** Disables input. */
  @Prop() readonly disabled = false;

  /** Shows invalid styles. */
  @Prop() readonly invalid = false;

  /** Focus next control when pressing Enter key */
  @Prop() readonly enterToTab = true;

  /** The value of the input. */
  @Prop({ mutable: true }) value?: string | number | null = '';

  /** Emitted when a keyboard input occurred. */
  @Event() zenInput!: EventEmitter<KeyboardEvent>;

  /** Emitted when the input loses focus. */
  @Event() zenBlur!: EventEmitter<FocusEvent>;

  /** Emitted when the input has focus. */
  @Event() zenFocus!: EventEmitter<FocusEvent>;

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === Key.Enter) {
      getNextField(this.hostElement).focus();
    }
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.zenInput.emit(ev as KeyboardEvent);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.zenBlur.emit(ev);
  };

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.zenFocus.emit(ev);
  };

  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }

  render(): HTMLElement {
    const value = this.getValue();

    return (
      <Host class={{ 'has-focus': this.hasFocus, invalid: this.invalid, disabled: this.disabled }}>
        <slot name="leadingSlot"></slot>
        <input
          type="text"
          placeholder={this.placeholder}
          value={value}
          disabled={this.disabled}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onInput={this.onInput}
        />
        <slot name="trailingSlot"></slot>
      </Host>
    );
  }
}
