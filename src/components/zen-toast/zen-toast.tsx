import { Component, Host, h, Prop } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { faBell, faCheck, faExclamation, faTimes } from '@fortawesome/pro-solid-svg-icons';

enum ZenToastVariant {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

@Component({
  tag: 'zen-toast',
  styleUrl: 'zen-toast.scss',
  shadow: true,
})
export class ZenToast {
  /** Color variant of the toast */
  @Prop() variant = 'success';
  /** Height */
  @Prop() height = '6rem';
  /** Width */
  @Prop() width = '35rem';
  /** Title */
  @Prop() toastTitle = 'Success';
  /** Message */
  @Prop() toastMessage = 'You have successfully created new audit!';
  /** Timeout to hide */
  @Prop() timeout = '500';
  /** Hide label */
  @Prop() dismissLabel = 'true';

  render(): HTMLElement {
    const classes = {
      toast: true,
      [`toast-${this.variant}`]: true,
    };

    const close = {
      close: true,
      [`close-${this.variant}`]: true,
    };

    const icon = {
      [`icon-${this.variant}`]: true,
    };

    return (
      <Host>
        <div class={classes} style={{ width: this.width, height: this.height }}>
          <div class={close}>{renderIcon(faTimes)}</div>
          <div class="row">
            <div class="icon-container">
              <div class={icon}>
                {this.variant === ZenToastVariant.Success && renderIcon(faCheck)}
                {this.variant === ZenToastVariant.Info && renderIcon(faBell)}
                {this.variant === ZenToastVariant.Warning && renderIcon(faExclamation)}
                {this.variant === ZenToastVariant.Error && renderIcon(faTimes)}
              </div>
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
