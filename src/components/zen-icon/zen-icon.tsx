import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { IconSize, SpacingShorthand, Spacing } from '../helpers/types';
import { parsePadding } from '../helpers/helpers';

@Component({
  tag: 'zen-icon',
  styleUrl: 'zen-icon.scss',
  shadow: true,
})
export class ZenIcon {
  @Element() host: HTMLZenIconElement;

  @State() paddingClasses = {};

  /** Size of the icon. */
  @Prop({ reflect: true }) readonly size: IconSize = 'md';

  /** <Description generated in helper file> */
  @Prop({ reflect: true }) readonly padding: SpacingShorthand = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingLeft: Spacing = null;

  /** Icon data (js file) imported from Font Awesome SVG package. */
  @Prop() readonly icon: IconDefinition = null;

  @Watch('padding')
  paddingChanged(padding: string): void {
    this.paddingClasses = parsePadding(padding);
  }

  componentDidLoad(): void {
    this.paddingChanged(this.padding);
  }

  render(): HTMLElement {
    return <Host class={this.paddingClasses}>{this.icon ? renderIcon(this.icon) : null}</Host>;
  }
}
