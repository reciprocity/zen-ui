import { renderIcon } from '../helpers/fa-icons';
import { faBell, faCheck, faExclamation, faTimes } from '@fortawesome/pro-solid-svg-icons';

export enum ZenVariant {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum ZenDismissDuration {
  NONE = 'none',
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
}

export function getIcon(variant): HTMLElement {
  let icon: HTMLElement;
  switch (variant) {
    case ZenVariant.SUCCESS:
      icon = renderIcon(faCheck);
      break;
    case ZenVariant.INFO:
      icon = renderIcon(faBell);
      break;
    case ZenVariant.WARNING:
      icon = renderIcon(faExclamation);
      break;
    case ZenVariant.ERROR:
      icon = renderIcon(faTimes);
      break;
  }
  return icon;
}

export function getTimeout(dismissDuration: ZenDismissDuration): number {
  let duration;
  switch (dismissDuration) {
    case ZenDismissDuration.SHORT:
      duration = 1000;
      break;
    case ZenDismissDuration.MEDIUM:
      duration = 5000;
      break;
    case ZenDismissDuration.LONG:
      duration = 10000;
      break;
    default:
      duration = 0;
  }
  return duration;
}
