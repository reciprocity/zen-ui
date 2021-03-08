import { Notification } from './types';

function getNotificationsWrapper(): HTMLElement {
  return document.getElementById('zen-notifications-wrapper');
}

function createNotificationsWrapper(): void {
  let wrapper: HTMLElement;
  if (!getNotificationsWrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'zen-notifications-wrapper';
    document.body.appendChild(wrapper);
  }
}

export function displayNotification(notification: Notification): void {
  createNotificationsWrapper();
  const notificationsWrapper = getNotificationsWrapper();

  console.log(notification);
  /////
  const notificasion = new Node();
  notificationsWrapper.appendChild(notificasion);
}
