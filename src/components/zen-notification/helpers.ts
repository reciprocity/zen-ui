import {
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faTimesHexagon,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { NotificationVariant } from '../helpers/types';

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
