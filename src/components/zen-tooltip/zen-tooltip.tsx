import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { TooltipVariant } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';
import { Placement } from '@popperjs/core';
import { SpacingShorthand, Spacing } from '../helpers/types';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';

/**
 * @slot defaultSlot - Tooltip content
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

  /** Hyperlink title */
  @Prop() readonly header: string = '';

  /** Link title */
  @Prop() readonly linkTitle: string = '';

  /** Link to resource */
  @Prop() readonly link: string = '';

  /** Set tooltip offset to target element */
  @Prop() readonly offset?: number = 10;

  /** Limit tooltips height and make content scroll  */
  @Prop() readonly maxHeight: string = 'none';

  /** Show and hide delay. Eg. '100' - both show & hide 100ms. '100 500' - show 100ms, hide 500ms. */
  @Prop() readonly delay: string = '0';

  /** Description generated in helper file */
  @Prop() readonly padding: SpacingShorthand = 'lg';
  /** Skipped */
  @Prop() readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingLeft: Spacing = null;

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
    const ZenPopover = applyPrefix('zen-popover', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
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
          interactive={this.link || isScrollable}
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
        >
          {this.header && (
            <ZenText class="header" size="md" bold>
              {this.header}
            </ZenText>
          )}
          <slot>
            <ZenText size="sm" style={{ color: this.color }}>
              {this.label}
            </ZenText>
          </slot>
          {this.link && (
            <ZenSpace no-wrap padding-top="lg">
              <ZenText size="md">
                <a class="link" href={this.link}>
                  {this.linkTitle ? this.linkTitle : this.link}
                  <ZenIcon size="md" padding-left="md" class="icon" icon={faExternalLink} />
                </a>
              </ZenText>
            </ZenSpace>
          )}
        </ZenPopover>
      </Host>
    );
  }
}
