// Props:
export type Align = 'left' | 'right' | 'center';

export type Position = 'top' | 'right' | 'bottom' | 'left';

export type TooltipVariant = 'dark' | 'light' | 'error';

export type TextVariant = null | 'heading' | 'label' | 'support';

export type NotificationVariant = 'success' | 'info' | 'warning' | 'error';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconSizes = 'sm' | 'md' | 'lg';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type PaddingShorthand = Size | None;

export type None = 'none';

export type TriggerEvent = 'click' | 'hover';

export interface Avatar {
  userName?: string;
  email?: string;
  imageUrl?: string;
}

export interface AvatarData extends Avatar {
  background?: string;
  color?: string;
}

export interface AvatarColor {
  background?: string;
  color?: string;
}
