import { Component, Host, h, Prop, Element, Listen, State, Method, Watch } from '@stencil/core';
import { getNextField } from '../helpers/helpers';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { applyPrefix } from '../helpers/helpers';
import { InputSize } from '../helpers/types';

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

  @State() isEmpty = true;

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';

  /** Paint focused border */
  @Prop() readonly hasFocus: boolean = false;

  /** Placeholder of the input. */
  @Prop() readonly placeholder: string = '';

  /** Disables input. */
  @Prop() readonly disabled: boolean = false;

  /** Shows invalid styles. */
  @Prop() readonly invalid: boolean = false;

  /** Focus next control when pressing Enter key */
  @Prop() readonly enterToTab: boolean = true;

  /** Should display clear button if focused and not empty */
  @Prop({ reflect: true }) readonly clearButton: boolean = true;

  /** The value of the input. */
  @Prop({ mutable: true }) value?: string = '';

  /** Size variant */
  @Prop({ reflect: true }) readonly size: InputSize = 'md';

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' && this.enterToTab) {
      ev.preventDefault();
      getNextField(this.input).focus();
    }
  }

  @Watch('value')
  async valueChanged(value: string): Promise<void> {
    this.input.value = value;
    this.isEmpty = !value;
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
      this.isEmpty = !input.value;
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

  private onClearClick(event: Event): void {
    this.value = '';
    this.input.value = '';
    this.host.dispatchEvent(new window.Event('change'));
    event.stopPropagation();
    event.preventDefault();
  }

  clearIconSize(): string {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  componentDidLoad(): void {
    this.valueChanged(this.value);
  }

  render(): HTMLElement {
    const value = this.getValue();
    const ZenIcon = applyPrefix('zen-icon', this.host);

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
        {!this.isEmpty && this.inputFocused && this.clearButton && (
          <ZenIcon
            slot="trailingSlot"
            padding="xs md xs none"
            class="icon clear"
            role="button"
            icon={faTimes}
            size={this.clearIconSize()}
            onMousedown={(event: MouseEvent) => this.onClearClick(event)}
          ></ZenIcon>
        )}
        <slot name="trailingSlot"></slot>
      </Host>
    );
  }
}
