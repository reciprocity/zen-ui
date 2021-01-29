import { Component, Host, h, Prop, Element } from '@stencil/core';

import { renderIcon } from '../helpers/fa-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

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
  @Prop() readonly icon: IconDefinition;

  render(): HTMLElement {
    return <Host class={{ lg: this.size === 'lg' }}>{renderIcon(this.icon)}</Host>;
  }
}
