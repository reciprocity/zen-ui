import { Component, Host, h, State, Element } from '@stencil/core';

@Component({
  tag: 'text-with-details',
  styleUrl: 'text-with-details.scss',
  shadow: true,
})
export class TextWithDetails {
  @Element() host: HTMLTextWithDetailsElement;

  @State() details: string;

  renderDetails(element: Element): void {
    const style = getComputedStyle(element);
    const size = parseFloat(style.fontSize) / 16;
    const lineHeight = parseFloat(style.lineHeight) / 16;
    this.details = `Font size: ${size}rem, Line height: ${lineHeight}rem, Weight: ${style.fontWeight}`;
  }

  componentDidLoad(): void {
    setTimeout(() => {
      this.renderDetails(this.host.previousElementSibling);
    }, 1);
  }

  render(): HTMLElement {
    return <Host class="text-with-details">{this.details}</Host>;
  }
}
