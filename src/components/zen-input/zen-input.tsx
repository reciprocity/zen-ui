import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'zen-input',
  styleUrl: 'zen-input.scss',
  shadow: true,
})
export class ZenInput {
  /**
   * Placeholder of the input.
   */
  @Prop() readonly placeholder: string = null;

  /**
   * Disables input.
   */
  @Prop() readonly disabled = false;

  /**
   * Makes input required.
   */
  @Prop() readonly required = false;

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | number | null = '';

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() zenInput!: EventEmitter<KeyboardEvent>;

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.zenInput.emit(ev as KeyboardEvent);
  };

  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }

  render(): HTMLElement {
    const value = this.getValue();

    return (
      <Host>
        <input
          type="text"
          class="input-control"
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          value={value}
          onInput={this.onInput}
        />
      </Host>
    );
  }
}
