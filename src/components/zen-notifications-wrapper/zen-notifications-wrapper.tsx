import { Component, Host, h, Prop, Element, Method } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { PositionVariant, Notification } from '../helpers/types';

declare global {
  interface Window {
    ZenUINotificationsWrapper?: HTMLZenNotificationsWrapperElement;
  }
}

@Component({
  tag: 'zen-notifications-wrapper',
  styleUrl: 'zen-notifications-wrapper.scss',
  shadow: true,
})
export class ZenNotificationsWrapper {
  @Element() host: HTMLZenNotificationsWrapperElement;

  /** Position of the notification */
  @Prop({ reflect: true }) readonly position: PositionVariant = 'top-right';

  /** Returns the notification wrapper reference */
  private getNotificationWrapper(): HTMLZenNotificationsWrapperElement {
    return global.window.ZenUINotificationsWrapper || this.host;
  }

  /** Displays a notification */
  @Method()
  async displayNotification({ heading, content, variant, position }: Notification): Promise<void> {
    const notificationElement = document.createElement(
      applyPrefix('zen-notification', this.host),
    ) as HTMLZenNotificationElement;

    notificationElement.setAttribute('heading', heading);
    notificationElement.setAttribute('variant', variant);
    notificationElement.setAttribute('dismiss', 'true');
    notificationElement.innerText = content;

    const wrapper = this.getNotificationWrapper();
    wrapper.setAttribute('position', position);
    wrapper.appendChild(notificationElement);
  }

  render(): HTMLElement | null {
    const wrapper = this.getNotificationWrapper();
    if (wrapper && wrapper !== this.host) return null;
    if (!wrapper) {
      global.window.ZenUINotificationsWrapper = this.host;
    }
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
