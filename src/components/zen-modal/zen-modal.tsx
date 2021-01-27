import { Component, Prop, Host, h, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { modalsService } from './zen-modals-service';

/**
 * @slot header - Put custom content in header
 * @slot buttons - Standard buttons in the footer
 * @slot footer - In case you need a totally customized footer design
 */

@Component({
  tag: 'zen-modal',
  styleUrl: 'zen-modal.scss',
  shadow: true,
})
export class ZenModal {
  @Element() hostElement: HTMLZenModalElement;

  /** Set to true to show and false to hide modal */
  @Prop({ reflect: true }) readonly show = false;

  /** Set to true to show and false to hide modal */
  @Prop() readonly label: string = 'Zen-UI modal window';

  /** Top-right X button clicked */
  @Event() cancelClicked: EventEmitter<undefined>;

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

  render(): HTMLElement {
    return (
      <Host>
        {this.show ? (
          <div>
            <div class="dimmer"></div>
            <div class="window">
              <div class="header">
                <slot name="header">
                  <zen-text class="title" size="2xl">
                    {this.label}
                  </zen-text>
                  <div class="x-button" onClick={() => this.onCancelClicked()}>
                    x
                  </div>
                </slot>
              </div>
              <div class="content">
                <slot>Zen-ui Modal</slot>
              </div>
              <slot name="footer">
                <div class="footer">
                  <slot name="buttons">
                    <div class="buttons-row">
                      <zen-button onClick={() => this.onCancelClicked()}>Cancel</zen-button>
                    </div>
                  </slot>
                </div>
              </slot>
            </div>
          </div>
        ) : (
          ''
        )}
      </Host>
    );
  }
}
