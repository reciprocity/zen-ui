import { Component, Prop, Host, h, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { modalsService } from './zen-modals-service';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { SpacingShorthand } from '../helpers/types';

/**
 * @slot header - Custom header content
 * @slot footer - Footer content (buttons usually)
 * @slot (default) - Window content
 */

@Component({
  tag: 'zen-modal',
  styleUrl: 'zen-modal.scss',
  shadow: true,
})
export class ZenModal {
  @Element() host: HTMLZenModalElement;

  /** Set `true` to show and `false` to hide modal */
  @Prop({ reflect: true }) readonly show: boolean = false;

  /** Modal title (irrelevant if slot `header` passed) */
  @Prop() readonly label: string = 'Zen-UI modal window';

  /** Hide default top-right X and default Cancel button */
  @Prop() readonly hideCancel: boolean = false;

  /** Top-right X button or default Cancel button clicked */
  @Event() cancel: EventEmitter<void>;

  /** Default Ok button clicked (irrelevant if slot `buttons` passed) */
  @Event() ok: EventEmitter<void>;

  /** Padding of header */
  @Prop() readonly headerPadding: SpacingShorthand = 'lg xl';

  /** Padding of content */
  @Prop() readonly contentPadding: SpacingShorthand = 'xl';

  /** Padding of footer */
  @Prop() readonly footerPadding: SpacingShorthand = 'lg xl';

  @Watch('show')
  async showChanged(show: boolean): Promise<void> {
    if (show) {
      modalsService.makeTopmost(this.host);
    } else {
      modalsService.modalClosed(this.host);
    }
  }

  onCancelClicked(): void {
    this.cancel.emit();
  }

  onOkClicked(): void {
    this.ok.emit();
  }

  async componentDidRender(): Promise<void> {
    if (this.show) {
      this.showChanged(true);
    }
  }

  render(): HTMLElement {
    const ZenAnimate = applyPrefix('zen-animate', this.host);
    const ZenButton = applyPrefix('zen-button', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host>
        <ZenAnimate show={this.show}>
          <div class="dimmer"></div>
          <div class="window">
            <ZenSpace class="header" padding={this.headerPadding}>
              <slot name="header">
                <ZenText variant="heading" size="sm">
                  {this.label}
                </ZenText>
                {!this.hideCancel ? (
                  <ZenIcon
                    class="x-button"
                    icon={faTimes}
                    size="lg"
                    role="button"
                    onClick={() => this.onCancelClicked()}
                  ></ZenIcon>
                ) : (
                  ''
                )}
              </slot>
            </ZenSpace>
            <ZenSpace vertical padding={this.contentPadding}>
              <slot>Zen-ui Modal</slot>
            </ZenSpace>
            <ZenSpace class="footer" padding={this.footerPadding} horizontalAlign="end">
              <slot name="footer">
                {!this.hideCancel ? (
                  <ZenButton class="btn-cancel" variant="blue-ghost" onClick={() => this.onCancelClicked()}>
                    Cancel
                  </ZenButton>
                ) : (
                  ''
                )}
                <ZenButton class="btn-ok ml-4" onClick={() => this.onOkClicked()}>
                  Ok
                </ZenButton>
              </slot>
            </ZenSpace>
          </div>
        </ZenAnimate>
      </Host>
    );
  }
}
