import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { Key } from 'ts-key-enum';
import { indent, unindent } from './helpers';

@Component({
  tag: 'html-playground',
  styleUrl: 'html-playground.scss',
  shadow: true,
})
export class DocsTable {
  @Element() hostElement: HTMLHtmlPlaygroundElement;

  /** html source code to preview */
  @Prop({ mutable: true }) html = '<zen-button label="My button" variant="primary"></zen-button>';

  /** Save current value to local storage and restore it on load */
  @Prop() readonly saveValue = true;

  localStorageKey(): string {
    return `html-playground${this.hostElement.id ? '-' + this.hostElement.id : ''}-value`;
  }

  onTextareaChange(e: Event): void {
    this.html = (e.target as HTMLTextAreaElement).value;
    if (this.saveValue && !!window.localStorage) {
      window.localStorage.setItem(this.localStorageKey(), this.html);
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === Key.Tab) {
      ev.preventDefault();
      const textarea = this.hostElement.shadowRoot.querySelector('textarea');
      if (ev.shiftKey) {
        unindent(textarea);
      } else {
        indent(textarea);
      }
    }

    const ctrl = ev.metaKey || ev.shiftKey || ev.ctrlKey;
    const apply = (ev.key === Key.Enter && ctrl) || ev.key === Key.Escape || (ev.key === 's' && ctrl);
    if (apply) {
      // Apply changes:
      const textarea = this.hostElement.shadowRoot.querySelector('textarea');
      textarea.dispatchEvent(new Event('change'));
      ev.preventDefault();
    }
  }

  componentWillLoad(): void {
    if (window.localStorage && window.localStorage.getItem(this.localStorageKey())) {
      this.html = window.localStorage.getItem(this.localStorageKey());
    }
  }

  render(): HTMLElement {
    return (
      <Host class="html-playground">
        <textarea value={this.html} onChange={e => this.onTextareaChange(e)} />
        <p class="preview-title">Preview</p>
        <div class="preview" innerHTML={this.html}></div>
      </Host>
    );
  }
}
