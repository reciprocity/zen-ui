import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Component, Host, h, Prop, Element } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { IconSizes } from '../helpers/types';

@Component({
  tag: 'zen-icon',
  styleUrl: 'zen-icon.scss',
  shadow: true,
})
export class ZenIcon {
  @Element() hostElement: HTMLZenIconElement;

  /** Size of the icon. */
  @Prop({ reflect: true }) readonly size: IconSizes = 'md';

  /** Icon data (js file) imported from Font Awesome SVG package. */
  @Prop() readonly icon: IconDefinition = null;

  render(): HTMLElement {
    return <Host>{this.icon ? renderIcon(this.icon) : null}</Host>;
  }
}
