import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'text-with-details',
  styleUrl: 'text-with-details.scss',
  shadow: false,
})
export class TextWithDetails {
  private slot: HTMLInputElement;
  @State() details: string;

  componentDidRender(): void {
    const style = getComputedStyle(this.slot.children[0]);
    this.details = `Font size: ${style.fontSize}, Line height: ${style.lineHeight}, Weight: ${style.fontWeight}`;
  }

  render(): HTMLElement {
    return (
      <Host class="text-with-details">
        <div ref={el => (this.slot = el as HTMLInputElement)}>
          <slot />
        </div>
        <p class="element-details">{this.details}</p>
      </Host>
    );
  }
}
