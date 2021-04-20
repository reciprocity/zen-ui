import { Component, Host, h, Prop } from '@stencil/core';
import { LozengeVariant, LozengeSize, LozengeTextVariant } from '../helpers/types';

/**
 * @slot default - Text content of the Lozenge
 */
@Component({
  tag: 'zen-lozenge',
  styleUrl: 'zen-lozenge.scss',
  shadow: true,
})
export class ZenLozenge {
  /** Variant */
  @Prop({ reflect: true }) readonly variant: LozengeVariant = 'light-grey';

  /** Size */
  @Prop({ reflect: true }) readonly size: LozengeSize = 'default';

  /** Size */
  @Prop({ reflect: true }) readonly textVariant: LozengeTextVariant = 'uppercase';

  render(): HTMLElement {
    return (
      <Host>
        <slot>Default</slot>
      </Host>
    );
  }
}
