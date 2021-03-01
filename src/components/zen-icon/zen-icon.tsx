import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
import { renderIcon } from '../helpers/fa-icons';
import { IconSizes, PaddingShorthand } from '../helpers/types';
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

  /** Inner spacing of container */
  @Prop() readonly padding: PaddingShorthand = 'sm';

  /** Icon data (js file) imported from Font Awesome SVG package. */
  @Prop() readonly icon: IconDefinition = null;

  @Watch('padding')
  iconPaddingChanged(padding: string): void {
    this.paddingClasses = parsePadding(padding);
  }

  componentDidLoad(): void {
    this.iconPaddingChanged(this.padding);
  }

  render(): HTMLElement {
    return <Host class={this.paddingClasses}>{this.icon ? renderIcon(this.icon) : null}</Host>;
  }
}
