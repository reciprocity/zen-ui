// Props:
export type Align = 'left' | 'right' | 'center';

export type Position = 'top' | 'right' | 'bottom' | 'left';

export type TextVariant = null | 'heading' | 'label' | 'support';

export type TextState = null | 'error' | 'success';

export type NotificationVariant = 'success' | 'info' | 'warning' | 'error';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconSize = 'sm' | 'md' | 'lg';

export type AvatarIconSize = 'sm' | 'md';

export type InputSize = 'sm' | 'md' | 'lg';

export type DropdownSize = InputSize | 'custom';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Spacing = Size | null | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export type SpacingShorthand = Spacing | None | string;

export type None = 'none';

export type TriggerEvent = 'click' | 'hover';

export type Resize = 'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit';

export type PositionVariant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type AvatarDetailVariant = 'basic' | 'basic-lg' | 'detailed';

export type CardVariant = 'default' | 'shadow';

export interface AvatarData {
  userName?: string;
  email?: string;
  initials?: string;
  imageUrl?: string;
  background?: string;
  color?: string;
  size?: string;
}

export interface AvatarColor {
  background?: string;
  color?: string;
}

export type AvatarVariantSizes = {
  verticalAlignment: string;
  avatarIconSize: string;
  userNameBold: boolean;
  textSize: string;
};

export interface Notification {
  heading: string;
  content: string;
  variant: NotificationVariant;
  position: PositionVariant;
}
