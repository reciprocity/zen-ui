import { Component, Host, h, Prop } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { getToastIcon, ZenToastVariant } from './zen-toast-helper';

@Component({
  tag: 'zen-toast',
  styleUrl: 'zen-toast.scss',
  shadow: true,
})
export class ZenToast {
  div: HTMLElement = undefined;

  /** Variant of toast */
  @Prop() readonly variant: string = ZenToastVariant.Success;

  /** Height */
  @Prop() readonly height: string = '5rem';

  /** Width */
  @Prop() readonly width: string = '25rem';

  /** Title */
  @Prop() readonly toastTitle: string = '';

  /** Message */
  @Prop() readonly toastMessage: string = '';

  /** Hide toast in milliseconds */
  @Prop() readonly timeout: number | null = 5000;

  /** Can dismiss toast */
  @Prop() readonly dismiss: boolean = false;

  closeToast(el) {
    el.className = '';
  }

  componentDidRender() {
    if (!isNaN(this.timeout)) {
      setTimeout(() => {
        this.closeToast(this.div);
      }, this.timeout);
    }
  }

  render(): HTMLElement {
    const classes = {
      toast: true,
      [`toast-${this.variant}`]: true,
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
              this.closeToast(this.div);
            }}
          >
            {renderIcon(faTimes)}
          </div>
          <div class="row">
            <div class="icon-container">
              <div class={icon}>{getToastIcon(this.variant)}</div>
            </div>
            <div class="content-container">
              <div class="title">{this.toastTitle}</div>
              <div class="message">{this.toastMessage}</div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
