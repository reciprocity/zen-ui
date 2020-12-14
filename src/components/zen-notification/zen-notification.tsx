import { Component, Host, h, Prop } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { getIcon, getTimeout, ZenDismissDuration, ZenVariant } from './zen-notification-helper';

@Component({
  tag: 'zen-notification',
  styleUrl: 'zen-notification.scss',
  shadow: true,
})
export class ZenNotification {
  div: HTMLElement = undefined;

  /** Variant  */
  @Prop() readonly variant: ZenVariant = ZenVariant.SUCCESS;

  /** Height */
  @Prop() readonly height: string = '5rem';

  /** Width */
  @Prop() readonly width: string = '25rem';

  /** Title */
  @Prop() readonly heading: string = '';

  /** Message */
  @Prop() readonly message: string = '';

  /** Hide duration */
  @Prop() readonly dismissDuration: ZenDismissDuration = ZenDismissDuration.MEDIUM;

  /** Can dismiss */
  @Prop() readonly dismiss: boolean = false;

  close(el: HTMLElement): void {
    el.className = '';
  }

  componentDidRender(): void {
    if (this.dismissDuration !== ZenDismissDuration.NONE) {
      setTimeout(() => {
        this.close(this.div);
      }, getTimeout(this.dismissDuration));
    }
  }

  render(): HTMLElement {
    const classes = {
      notification: true,
      [`notification-${this.variant}`]: true,
    };

    const close = {
      close: true,
      [`close-${this.variant}`]: true,
      hide: this.dismiss == false,
    };

    const icon = {
      [`icon-${this.variant}`]: true,
    };

    return (
      <Host class="show" ref={el => (this.div = el)}>
        <div class={classes} style={{ width: this.width, 'min-height': this.height }}>
          <div
            class={close}
            onClick={() => {
              this.close(this.div);
            }}
          >
            {renderIcon(faTimes)}
          </div>
          <div class="row">
            <div class="icon-container">
              <div class={icon}>{getIcon(this.variant)}</div>
            </div>
            <div class="content-container">
              <div class="title">{this.heading}</div>
              <div class="message">{this.message}</div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
