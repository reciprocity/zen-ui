import { Component, Host, h, Prop, State, Element } from '@stencil/core';
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

  /** Set tooltip position */
  @Prop() readonly position?: Placement = 'top';

  /** Set tooltip label */
  @Prop() readonly label?: string = '';

  /** Set tooltip title */
  @Prop() readonly heading: string = '';

  /** Set link title */
  @Prop() readonly linkTitle: string = '';

  /** Set link to resource */
  @Prop() readonly link: string = '';

  /** Set tooltip offset to target element */
  @Prop() readonly offset?: number = 10;

  /** Set tooltip max width */
  @Prop() readonly maxWidth: string = '22.5rem';

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

  componentDidLoad(): void {
    this.popover.targetElement = this.host.previousElementSibling as HTMLElement;
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
          style={{
            'max-height': this.maxHeight,
            'max-width': this.maxWidth,
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
          {this.heading && (
            <ZenText class="heading" size="md" bold>
              {this.heading}
            </ZenText>
          )}
          <slot>
            <ZenText size="md" pale>
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
