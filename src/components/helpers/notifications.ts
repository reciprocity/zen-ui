import { Notification, PositionVariant } from './types';

function getNotificationsWrapper(position: PositionVariant): HTMLZenNotificationsWrapperElement {
  const wrapper = document.querySelector('sb-zen-notifications-wrapper') as HTMLZenNotificationsWrapperElement;

  if (wrapper !== null) {
    if (wrapper.position === position) {
      return wrapper;
    } else {
      wrapper.setAttribute('position', position);
      return wrapper;
    }
  } else {
    return null;
  }
}

function createNotificationsWrapper(position: PositionVariant): void {
  let wrapper: HTMLZenNotificationsWrapperElement;
  const notificationsWrapper = getNotificationsWrapper(position);

  if (notificationsWrapper === null) {
    wrapper = document.createElement('sb-zen-notifications-wrapper') as HTMLZenNotificationsWrapperElement;
    wrapper.position = position;
    console.log(wrapper);
    document.body.appendChild(wrapper);
  }
}

export function displayNotification(n: Notification): void {
  const { heading, content, variant, position } = n;

  createNotificationsWrapper(position);

  const notificationsWrapper = getNotificationsWrapper(position);
  const notification = document.createElement('sb-zen-notification') as HTMLZenNotificationElement;

  notification.setAttribute('heading', heading);
  notification.setAttribute('variant', variant);
  notification.setAttribute('dismiss', 'true');
  notification.innerText = content;

  notificationsWrapper.appendChild(notification);
}
