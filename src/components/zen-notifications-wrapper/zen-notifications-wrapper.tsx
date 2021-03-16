import { Component, Host, h, Prop, Element, Method } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { PositionVariant, Notification } from '../helpers/types';

declare global {
  interface Window {
    ZenUINotificationsWrapper: HTMLZenNotificationsWrapperElement;
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
  private notificationWrapper(): HTMLZenNotificationsWrapperElement {
    return global.window.ZenUINotificationsWrapper ? global.window.ZenUINotificationsWrapper : this.host;
  }

  /** Displays a notification */
  @Method()
  async displayNotification(n: Notification): Promise<void> {
    const { heading, content, variant, position } = n;

    const notification = document.createElement(
      applyPrefix('zen-notification', this.host),
    ) as HTMLZenNotificationElement;

    notification.setAttribute('heading', heading);
    notification.setAttribute('variant', variant);
    notification.setAttribute('dismiss', 'true');
    notification.innerText = content;

    global.window.ZenUINotificationsWrapper.setAttribute('position', position);
    global.window.ZenUINotificationsWrapper.appendChild(notification);
  }

  render(): HTMLElement | null {
    if (this.notificationWrapper() === this.host) {
      global.window.ZenUINotificationsWrapper = this.host;
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    } else {
      return null;
    }
  }
}
