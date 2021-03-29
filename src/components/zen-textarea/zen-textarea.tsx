import { Component, Host, h, Prop, Element } from '@stencil/core';
import { Resize } from '../helpers/types';

/**
 * @event change | Content change applied
 * @event input | Content changed
 * @event focus | Focused
 * @event blur | Focus lost
 */

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

  /** Shows invalid styles. */
  @Prop({ reflect: true }) readonly invalid = false;

  /** Placeholder of the textarea. */
  @Prop() readonly placeholder: string = null;

  /** Resize (variants) */
  @Prop() readonly resize: Resize = 'none';

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
    const style = { resize: this.resize };
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
