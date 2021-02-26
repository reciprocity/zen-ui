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

  @Element() element: HTMLZenTooltipElement;

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

  /** Positions it self on other side if no space available */
  @Prop() readonly flip: boolean = true;

  /** Don't hide tooltip */
  @Prop() readonly alwaysVisible?: boolean = false;

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
    this.popover.targetElement = this.element.previousElementSibling as HTMLElement;
    this.variantChanged(this.variant);
  }

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.element);
    const ZenPopover = applyPrefix('zen-popover', this.element);
    const classes = {
      tooltip: true,
    };
    const isScrollable = this.maxHeight !== 'none';

    return (
      <Host class={{ visible: this.visible, ...classes }}>
        <ZenPopover
          ref={el => (this.popover = el)}
          class="popover"
          trigger-event={this.alwaysVisible ? 'click' : 'hover'}
          position={this.position}
          background-color={this.backgroundColor}
          style={{
            color: this.color,
            'max-height': this.maxHeight,
          }}
          offset={{ x: 0, y: this.offset }}
          close-on-click-out={this.alwaysVisible ? 'false' : 'true'}
          close-on-target-click={this.alwaysVisible ? 'false' : 'true'}
          visible={this.alwaysVisible}
          delay={this.delay}
          interactive={isScrollable}
          flip={this.flip}
        >
          <slot name="content">
            <ZenSpace padding="lg">
              <slot>{this.label}</slot>
            </ZenSpace>
          </slot>
        </ZenPopover>
      </Host>
    );
  }
}
