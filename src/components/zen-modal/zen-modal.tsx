import { Component, Prop, Host, h, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { modalsService } from './zen-modals-service';

/**
 * @slot header - Totally custom header
 * @slot buttons - Standard buttons in the footer
 * @slot footer - Totally custom footer
 */

@Component({
  tag: 'zen-modal',
  styleUrl: 'zen-modal.scss',
  shadow: true,
})
export class ZenModal {
  @Element() hostElement: HTMLZenModalElement;

  /** Set `true` to show and `false` to hide modal */
  @Prop({ reflect: true }) readonly show = false;

  /** Modal title (irrelevant if slot `header` passed) */
  @Prop() readonly label: string = 'Zen-UI modal window';

  /** Hide default top-right X and default Cancel button */
  @Prop() readonly hideCancel: boolean = false;

  /** Top-right X button or default Cancel button clicked */
  @Event() cancelClicked: EventEmitter<undefined>;

  /** Default Ok button clicked (irrelevant if slot `buttons` passed) */
  @Event() okClicked: EventEmitter<undefined>;

  @Watch('show')
  async showChanged(show: boolean): Promise<void> {
    if (show) {
      modalsService.makeTopmost(this.hostElement);
    } else {
      modalsService.modalClosed(this.hostElement);
    }
  }

  onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  onOkClicked(): void {
    this.okClicked.emit();
  }

  render(): HTMLElement {
    return (
      <Host>
        <zen-animate show={this.show}>
          <div class="dimmer"></div>
          <div class="window">
            <div class="header">
              <slot name="header">
                <zen-text class="title" size="2xl">
                  {this.label}
                </zen-text>
                {!this.hideCancel ? (
                  <div class="x-button" onClick={() => this.onCancelClicked()}>
                    x
                  </div>
                ) : (
                  ''
                )}
              </slot>
            </div>
            <div class="content">
              <slot>Zen-ui Modal</slot>
            </div>
            <slot name="footer">
              <div class="footer">
                <slot name="buttons">
                  <div class="buttons-row">
                    {!this.hideCancel ? (
                      <zen-button variant="secondary" onClick={() => this.onCancelClicked()}>
                        Cancel
                      </zen-button>
                    ) : (
                      ''
                    )}
                    <zen-button class="btn-ok ml-4" onClick={() => this.onOkClicked()}>
                      Ok
                    </zen-button>
                  </div>
                </slot>
              </div>
            </slot>
          </div>
        </zen-animate>
      </Host>
    );
  }
}
