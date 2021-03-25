import { Component, Host, h, Prop, Element, State } from '@stencil/core';
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

  @State() visible = true;

  /** Variant  */
  @Prop() readonly variant: NotificationVariant = 'success';

  /** Title */
  @Prop() readonly heading: string = '';

  /** Can dismiss */
  @Prop() readonly dismissable: boolean = false;

  close(): void {
    this.host.classList.add('closing');
    this.host.onanimationend = () => {
      this.host.remove();
    };
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host class={{ hidden: !this.visible }}>
        <ZenIcon
          class={{ close: true, hidden: !this.dismissable }}
          onClick={() => {
            this.close();
          }}
          icon={faTimes}
          padding="sm"
        />
        <ZenSpace spacing="sm" padding="sm">
          <ZenIcon class="icon" icon={getIcon(this.variant)} padding="sm" />
          <ZenText bold class="title">
            {this.heading}
          </ZenText>
        </ZenSpace>
        <ZenSpace class="content" padding="sm">
          <slot />
        </ZenSpace>
      </Host>
    );
  }
}
