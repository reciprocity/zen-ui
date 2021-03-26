import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { SpacingShorthand, Spacing } from '../helpers/types';
import { parsePadding } from '../helpers/helpers';

@Component({
  tag: 'zen-skeleton',
  styleUrl: 'zen-skeleton.scss',
  shadow: true,
})
export class ZenSkeleton {
  @State() paddingClasses = {};

  /** Makes the skeleton rounded */
  @Prop({ reflect: true }) readonly rounded: boolean = false;

  /** Description generated in helper file */
  @Prop({ reflect: true }) readonly padding: SpacingShorthand = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingLeft: Spacing = null;

  @Watch('padding')
  paddingChanged(padding: string): void {
    this.paddingClasses = parsePadding(padding);
  }

  componentDidLoad(): void {
    this.paddingChanged(this.padding);
  }

  render(): HTMLElement {
    return (
      <Host>
        <span>&nbsp;</span>
      </Host>
    );
  }
}
