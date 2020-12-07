import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'zen-textarea',
  styleUrl: 'zen-textarea.scss',
  shadow: true,
})
export class ZenTextarea {
  /**
   * Columns of the textarea.
   */
  @Prop() readonly cols = 30;

  /**
   * Rows of the textarea.
   */
  @Prop() readonly rows = 5;

  /**
   * Makes textarea disabled.
   */
  @Prop() readonly disabled = false;

  /**
   * Makes textarea required.
   */
  @Prop() readonly required = false;

  /**
   * Placeholder of the textarea.
   */
  @Prop() readonly placeholder: string = null;

  /**
   * The value of the textarea.
   */
  @Prop({ mutable: true }) value?: string | null = '';

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() zenTextarea!: EventEmitter<KeyboardEvent>;

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.zenTextarea.emit(ev as KeyboardEvent);
  };

  render(): HTMLElement {
    const value = this.value;
    return (
      <Host>
        <textarea
          class="input-control"
          cols={this.cols}
          rows={this.rows}
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.onInput}
        >
          {value}
        </textarea>
      </Host>
    );
  }
}
