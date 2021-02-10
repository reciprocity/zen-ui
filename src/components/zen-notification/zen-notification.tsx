import { Component, Host, h, Prop } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Duration, NotificationVariant } from '../helpers/types';
import { getIcon, getTimeout } from './functions';

@Component({
  tag: 'zen-notification',
  styleUrl: 'zen-notification.scss',
  shadow: true,
})
export class ZenNotification {
  div: HTMLElement = undefined;

  /** Variant  */
  @Prop() readonly variant: NotificationVariant = 'success';

  /** Title */
  @Prop() readonly heading: string = '';

  /** Message */
  @Prop() readonly message: string = '';

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
        this.close(this.div);
      }, getTimeout(this.dismissDuration));
    }
  }

  render(): HTMLElement {
    const classes = {
      show: true,
      notification: true,
      [`notification-${this.variant}`]: true,
    };

    const close = {
      close: true,
      hide: this.dismiss == false,
    };

    const icon = {
      icon: true,
      [`icon-${this.variant}`]: true,
    };

    const title = {
      title: true,
      [`title-${this.variant}`]: true,
    };

    return (
      <Host class="show" ref={el => (this.div = el)}>
        <div class={classes}>
          <div
            class={close}
            onClick={() => {
              this.close(this.div);
            }}
          >
            {renderIcon(faTimes)}
          </div>
          <div class="row">
            <div class={icon}>{getIcon(this.variant)}</div>
            <div class={title}>{this.heading}</div>
          </div>
          <div class="content">{this.message}</div>
        </div>
      </Host>
    );
  }
}
