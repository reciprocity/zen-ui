import { Host, h, Prop, Component } from '@stencil/core';

@Component({
  tag: 'zen-avatar',
  styleUrl: 'zen-avatar.scss',
  shadow: true,
})
export class ZenAvatar {
  /** Users  */
  @Prop() readonly user: Record<string, any> = [];

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
