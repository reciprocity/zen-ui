import { Component, Host, h, Prop, Element } from '@stencil/core';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { NotificationVariant } from '../helpers/types';
import { getIcon } from './helpers';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-notification',
  styleUrl: 'zen-notification.scss',
  shadow: true,
})
export class ZenNotification {
  @Element() host: HTMLZenNotificationElement;

  /** Variant  */
  @Prop() readonly variant: NotificationVariant = 'success';

  /** Title */
  @Prop() readonly heading: string = '';

  /** Can dismiss */
  @Prop() readonly dismiss: boolean = false;

  close(el: HTMLElement): void {
    el.className = '';
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host class={{ show: true }}>
        <ZenIcon
          class={{ close: true, hide: this.dismiss == false }}
          onClick={() => {
            this.close(this.host);
          }}
          icon={faTimes}
        />
        <ZenSpace spacing="sm" padding="none">
          <ZenIcon class="icon" icon={getIcon(this.variant)} />
          <ZenText bold class="title">
            {this.heading}
          </ZenText>
        </ZenSpace>
        <ZenSpace class="content">
          <slot />
        </ZenSpace>
      </Host>
    );
  }
}
