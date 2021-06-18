import { Component, Host, h, Element, Method } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { Notification } from '../helpers/types';

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

  /** Displays a notification */
  @Method()
  async displayNotification({ heading, content, variant }: Notification): Promise<void> {
    const notificationElement = document.createElement(
      applyPrefix('zen-notification', this.host),
    ) as HTMLZenNotificationElement;

    notificationElement.setAttribute('heading', heading);
    notificationElement.setAttribute('variant', variant);
    notificationElement.setAttribute('dismissable', 'true');
    notificationElement.innerHTML = content;

    const wrapper = global.window.ZenUINotificationsWrapper || this.host;
    wrapper.appendChild(notificationElement);
  }

  render(): HTMLElement | null {
    const wrapper = global.window.ZenUINotificationsWrapper;
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
