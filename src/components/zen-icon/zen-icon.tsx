import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { IconSizes, PaddingShorthand, Spacings } from '../helpers/types';
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
  @Prop({ reflect: true }) readonly p: PaddingShorthand = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly px: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly py: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pt: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pr: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pb: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pl: Spacings = null;

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
