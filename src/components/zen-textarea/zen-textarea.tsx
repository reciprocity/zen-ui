import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'zen-textarea',
  styleUrl: 'zen-textarea.scss',
  shadow: true,
})
export class ZenTextarea {
  @Element() host: HTMLZenTextareaElement;

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';

  /** Columns (size) */
  @Prop({ reflect: true }) readonly cols: number = 20;

  /** Rows (size) */
  @Prop({ reflect: true }) readonly rows: number = 5;

  /** Appends attribute disabled. */
  @Prop() readonly disabled = false;

  /** Appends attribute required. */
  @Prop() readonly required = false;

  /** Placeholder of the textarea. */
  @Prop() readonly placeholder: string = null;

  /** Can be resized. */
  @Prop() readonly resizable: boolean = false;

  /** Prefilled text content */
  @Prop({ mutable: true }) text?: string | null = '';

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.text = input.value || '';
    }
  };

  private onChange = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.text = input.value || '';
    }
    // change event should be forwarded, because it's not composed:
    this.host.dispatchEvent(new window.Event('change'));
  };

  render(): HTMLElement {
    const text = this.text;
    const style = this.resizable ? { resize: 'both' } : { resize: 'none' };
    return (
      <Host>
        <textarea
          class="input-control"
          style={style}
          cols={this.cols}
          rows={this.rows}
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
