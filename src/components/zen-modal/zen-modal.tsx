import { Component, Prop, Host, h, Watch, Element } from '@stencil/core';
import { modalsService } from './zen-modals-service';

@Component({
  tag: 'zen-modal',
  styleUrl: 'zen-modal.scss',
  shadow: true,
})
export class ZenModal {
  @Element() hostElement: HTMLZenModalElement;

  /** Set to true to show and false to hide modal */
  @Prop({ mutable: true }) show = false;

  @Watch('show')
  async showChanged(show: boolean): Promise<void> {
    if (show) {
      modalsService.makeTopmost(this.hostElement);
    } else {
      modalsService.modalClosed(this.hostElement);
    }
  }

  closeIt(): void {
    this.show = false;
  }

  render(): HTMLElement {
    return (
      <Host>
        {this.show ? (
          <div>
            <div class="dimmer"></div>
            <div class="window">
              <div class="content">
                <slot>Content</slot>
              </div>
              <div class="buttons">
                <zen-button onClick={() => this.closeIt()}>Close</zen-button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </Host>
    );
  }
}
