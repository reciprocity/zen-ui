import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { IconSizes, SpacingShorthand, Spacing } from '../helpers/types';
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
  @Prop({ reflect: true }) readonly size: IconSizes = 'md';

  /** <Description generated in helper file> */
  @Prop({ reflect: true }) readonly p: SpacingShorthand = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly px: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly py: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pt: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pr: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pb: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pl: Spacing = null;

  /** Icon data (js file) imported from Font Awesome SVG package. */
  @Prop() readonly icon: IconDefinition = null;

  @Watch('p')
  paddingChanged(p: string): void {
    this.paddingClasses = parsePadding(p);
  }

  componentDidLoad(): void {
    this.paddingChanged(this.p);
  }

  render(): HTMLElement {
    return <Host class={this.paddingClasses}>{this.icon ? renderIcon(this.icon) : null}</Host>;
  }
}
