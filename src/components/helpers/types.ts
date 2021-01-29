// Props:
export type Align = 'left' | 'right' | 'center';

export type Position = 'top' | 'right' | 'bottom' | 'left';

export type TooltipVariant = 'dark' | 'light' | 'error';

export type TextVariant = null | 'heading' | 'label' | 'support';

export type NotificationVariant = 'success' | 'info' | 'warning' | 'error';

export type Duration = 'none' | 'short' | 'medium' | 'long';

export type AvatarIconSize = 'sm' | 'md' | 'lg';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Others:
export type Point = { x: number; y: number };

export type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};
