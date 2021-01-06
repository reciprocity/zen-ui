import { renderIcon } from '../helpers/fa-icons';
import { faBell, faCheck, faExclamation, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { Duration, NotificationVariant } from '../helpers/types';

export function getIcon(variant: NotificationVariant): HTMLElement {
  let icon: HTMLElement;
  switch (variant) {
    case 'success':
      icon = renderIcon(faCheck);
      break;
    case 'info':
      icon = renderIcon(faBell);
      break;
    case 'warning':
      icon = renderIcon(faExclamation);
      break;
    case 'error':
      icon = renderIcon(faTimes);
      break;
  }
  return icon;
}

export function getTimeout(dismissDuration: Duration): number {
  let duration;
  switch (dismissDuration) {
    case 'short':
      duration = 1000;
      break;
    case 'medium':
      duration = 5000;
      break;
    case 'long':
      duration = 10000;
      break;
    default:
      duration = 0;
  }
  return duration;
}
