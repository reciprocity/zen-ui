import { Component, Host, h, Prop, Element } from '@stencil/core';
import { PositionVariant } from '../helpers/types';

@Component({
  tag: 'zen-notifications-wrapper',
  styleUrl: 'zen-notifications-wrapper.scss',
  shadow: true,
})
export class ZenNotificationsWrapper {
  @Element() host: HTMLZenNotificationsWrapperElement;

  /** Variant  */
  @Prop({ reflect: true }) readonly position: PositionVariant = 'top-right';

  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
