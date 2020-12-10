import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'zen-textarea',
  styleUrl: 'zen-textarea.scss',
  shadow: true,
})
export class ZenTextarea {
  /** Makes textarea disabled. */
  @Prop() readonly disabled = false;

  /** Makes textarea required. */
  @Prop() readonly required = false;

  /** Placeholder of the textarea. */
  @Prop() readonly placeholder: string = null;

  /** The text of the textarea. */
  @Prop({ mutable: true }) text?: string | null = '';

  /** Emitted when a keyboard input occurred. */
  @Event() zenInput!: EventEmitter<KeyboardEvent>;

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.text = input.value || '';
    }
    this.zenInput.emit(ev as KeyboardEvent);
  };

  render(): HTMLElement {
    const text = this.text;
    return (
      <Host>
        <textarea
          class="input-control"
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.onInput}
        >
          {text}
        </textarea>
      </Host>
    );
  }
}
