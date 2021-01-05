import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'html-playground',
  styleUrl: 'html-playground.scss',
  shadow: true,
})
export class DocsTable {
  /** html source code to preview */
  @Prop() readonly html: string = '<div>Blank</div>';

  render(): HTMLElement {
    return <Host class="html-playground">{this.html}</Host>;
  }
}
