import { getIcon } from '../helpers';
import { NotificationVariant } from '../../helpers/types';

describe('zen-notification', () => {
  it.each(['success', 'info', 'warning', 'error'])('should set title and message', (variant: NotificationVariant) => {
    const iconObject = getIcon(variant);
    switch (variant) {
      case 'success':
        expect(iconObject.iconName).toBe('check-circle');
        break;
      case 'info':
        expect(iconObject.iconName).toBe('info-circle');
        break;
      case 'warning':
        expect(iconObject.iconName).toBe('exclamation-triangle');
        break;
      case 'error':
        expect(iconObject.iconName).toBe('times-hexagon');
        break;
    }
  });
});
