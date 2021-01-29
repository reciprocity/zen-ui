import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Component, Host, h, Prop, Element } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';

@Component({
  tag: 'zen-icon',
  styleUrl: 'zen-icon.scss',
  shadow: true,
})
export class ZenIcon {
  @Element() hostElement: HTMLZenIconElement;

  /** Size of the icon. */
  @Prop() readonly size: string = '';

  /** Icon to be rendered. */
  @Prop() readonly icon: IconDefinition = null;

  render(): HTMLElement {
    return <Host class={{ lg: this.size === 'lg' }}>{this.icon ? renderIcon(this.icon) : null}</Host>;
  }
}
