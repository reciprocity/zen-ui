import { Component, Host, h, Prop, Element } from '@stencil/core';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Duration, NotificationVariant } from '../helpers/types';
import { getIcon, getTimeout } from './helpers';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-notification',
  styleUrl: 'zen-notification.scss',
  shadow: true,
})
export class ZenNotification {
  @Element() element: HTMLZenNotificationElement;

  /** Variant  */
  @Prop() readonly variant: NotificationVariant = 'success';

  /** Title */
  @Prop() readonly heading: string = '';

  /** Hide duration */
  @Prop() readonly dismissDuration: Duration = 'medium';

  /** Can dismiss */
  @Prop() readonly dismiss: boolean = false;

  close(el: HTMLElement): void {
    el.className = '';
  }

  componentDidRender(): void {
    if (this.dismissDuration !== 'none') {
      setTimeout(() => {
        this.close(this.element);
      }, getTimeout(this.dismissDuration));
    }
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.element);
    const ZenSpace = applyPrefix('zen-space', this.element);
    const ZenText = applyPrefix('zen-text', this.element);
    return (
      <Host class={{ show: true }}>
        <ZenIcon
          class={{ close: true, hide: this.dismiss == false }}
          onClick={() => {
            this.close(this.element);
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
