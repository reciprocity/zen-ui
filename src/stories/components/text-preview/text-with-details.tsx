import { Component, Host, h, State, Element } from '@stencil/core';
import { getDefaultSlotContent } from '../../../components/helpers/helpers';

@Component({
  tag: 'text-with-details',
  styleUrl: 'text-with-details.scss',
  shadow: true,
})
export class TextWithDetails {
  @Element() hostElement: HTMLTextWithDetailsElement;

  @State() details: string;

  renderDetails(element: HTMLElement): void {
    const style = getComputedStyle(element);
    this.details = `Font size: ${style.fontSize}, Line height: ${style.lineHeight}, Weight: ${style.fontWeight}`;
  }

  copyContentToShadowDom(): HTMLElement {
    // this way outside styles won't ruin our h1, h2, h3,...
    const children = getDefaultSlotContent(this.hostElement);
    const copy = children[0].cloneNode(true) as HTMLElement;
    const detailsEl = this.hostElement.shadowRoot.querySelector('.element-details');
    detailsEl.parentNode.insertBefore(copy, detailsEl);
    return copy;
  }

  componentDidLoad(): void {
    const content = this.copyContentToShadowDom();
    this.renderDetails(content);
  }

  render(): HTMLElement {
    return (
      <Host class="text-with-details">
        <div style={{ display: 'none' }}>
          <slot />
        </div>
        <p class="element-details">{this.details}</p>
      </Host>
    );
  }
}
