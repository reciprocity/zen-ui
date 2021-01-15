import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'zen-textarea',
  styleUrl: 'zen-textarea.scss',
  shadow: true,
})
export class ZenTextarea {
  @Element() hostElement: HTMLZenTextareaElement;

  /** Appends attribute disabled. */
  @Prop() readonly disabled = false;

  /** Appends attribute required. */
  @Prop() readonly required = false;

  /** Placeholder of the textarea. */
  @Prop() readonly placeholder: string = null;

  /** Prefilled text content */
  @Prop({ mutable: true }) text?: string | null = '';

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.text = input.value || '';
    }
  };

  private onChange = () => {
    // change event should be forwarded, because it's not composed:
    this.hostElement.dispatchEvent(new window.Event('change'));
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
          onChange={this.onChange}
        >
          {text}
        </textarea>
      </Host>
    );
  }
}
