import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { TooltipVariant } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';
import { Placement } from '@popperjs/core';

/**
 * @slot defaultSlot - Slot that has zen space padding lg set
 * @slot contentSlot - Slot for custom content without padding
 */
@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  private popover: HTMLZenPopoverElement = null;

  @Element() host: HTMLZenTooltipElement;

  @State() visible = false;
  @State() target: HTMLElement = null;
  @State() color = '';
  @State() backgroundColor = '';

  /** Set tooltip position */
  @Prop() readonly position?: Placement = 'top';

  /** Set tooltip variant */
  @Prop() readonly variant?: TooltipVariant = 'dark';

  /** Set tooltip label */
  @Prop() readonly label?: string = '';

  /** Set tooltip offset to target element */
  @Prop() readonly offset?: number = 10;

  /** Limit tooltips height and make content scroll  */
  @Prop() readonly maxHeight: string = 'none';

  /** Show and hide delay. Eg. '100' - both show & hide 100ms. '100 500' - show 100ms, hide 500ms. */
  @Prop() readonly delay: string = '0';

  @Watch('variant')
  async variantChanged(variant: TooltipVariant): Promise<void> {
    switch (variant) {
      case 'dark':
        this.backgroundColor = '#1e272c'; // $color-gray-800
        this.color = '#fff';
        break;

      case 'error':
        this.backgroundColor = '#c22f3d'; // $color-red-800
        this.color = '#fff';
        break;

      default:
        this.backgroundColor = '';
        this.color = '';
        break;
    }
  }

  componentDidLoad(): void {
    this.popover.targetElement = this.host.previousElementSibling as HTMLElement;
    this.variantChanged(this.variant);
  }

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenPopover = applyPrefix('zen-popover', this.host);
    const classes = {
      tooltip: true,
    };
    const isScrollable = this.maxHeight !== 'none';

    return (
      <Host class={{ visible: this.visible, ...classes }}>
        <ZenPopover
          ref={el => (this.popover = el)}
          class="popover"
          trigger-event="hover"
          position={this.position}
          background-color={this.backgroundColor}
          style={{
            color: this.color,
            'max-height': this.maxHeight,
          }}
          offset={{ x: 0, y: this.offset }}
          delay={this.delay}
          interactive={isScrollable}
        >
          <slot name="content">
            <ZenSpace padding="lg">
              <slot>
                <sb-zen-text size="sm" style={{ color: this.color }}>
                  {this.label}
                </sb-zen-text>
              </slot>
            </ZenSpace>
          </slot>
        </ZenPopover>
      </Host>
    );
  }
}
