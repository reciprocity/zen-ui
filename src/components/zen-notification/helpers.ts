import {
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faTimesHexagon,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { Duration, NotificationVariant } from '../helpers/types';

export function getIcon(variant: NotificationVariant): IconDefinition {
  let icon: IconDefinition;
  switch (variant) {
    case 'success':
      icon = faCheckCircle;
      break;
    case 'info':
      icon = faInfoCircle;
      break;
    case 'warning':
      icon = faExclamationTriangle;
      break;
    case 'error':
      icon = faTimesHexagon;
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
