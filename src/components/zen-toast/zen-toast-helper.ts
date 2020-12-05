import { renderIcon } from '../helpers/fa-icons';
import { faBell, faCheck, faExclamation, faTimes } from '@fortawesome/pro-solid-svg-icons';

export enum ZenToastVariant {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export function getToastIcon(variant) {
  if (variant === ZenToastVariant.Success) {
    return renderIcon(faCheck);
  } else if (variant === ZenToastVariant.Info) {
    return renderIcon(faBell);
  } else if (variant === ZenToastVariant.Warning) {
    return renderIcon(faExclamation);
  } else if (variant === ZenToastVariant.Error) {
    return renderIcon(faTimes);
  }
}
