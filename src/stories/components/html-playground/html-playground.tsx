import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'html-playground',
  styleUrl: 'html-playground.scss',
  shadow: true,
})
export class DocsTable {
  /** html source code to preview */
  @Prop({ mutable: true }) html = '<zen-button label="My button" variant="primary"></zen-button>';

  onTextareaChange(e: Event): void {
    this.html = (e.target as HTMLTextAreaElement).value;
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
