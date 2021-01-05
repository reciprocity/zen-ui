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
  }

  componentWillLoad(): void {
    if (window.localStorage && window.localStorage.getItem(this.localStorageKey())) {
      this.html = window.localStorage.getItem(this.localStorageKey());
    }
  }

  render(): HTMLElement {
    return (
      <Host class="html-playground">
        <div class="preview" innerHTML={this.html}></div>
        <textarea value={this.html} onChange={e => this.onTextareaChange(e)} />
      </Host>
    );
  }
}
