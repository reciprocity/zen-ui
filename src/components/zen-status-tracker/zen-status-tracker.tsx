import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-status-tracker',
  styleUrl: 'zen-status-tracker.scss',
  shadow: true,
})
export class ZenStatusTracker {
  children: HTMLZenLozengeElement[];
  @Element() host: HTMLZenStatusTrackerElement;

  /** Selected index */
  @Prop() readonly selected: number = 0;

  /** Status archived */
  @Prop() readonly archived: boolean = false;

  setChildStyles(): void {
    let hasSelected = false;

    this.children.forEach((lozenge, index) => {
      lozenge.setAttribute('variant', 'none');
      lozenge.setAttribute('size', 'lg');

      if (this.archived) return;
      // change the lozenge variant based on the selected index
      if (this.selected == index) {
        hasSelected = true;
        index == this.children.length - 1
          ? lozenge.setAttribute('variant', 'green')
          : lozenge.setAttribute('variant', 'dark-blue-ghost');
      }

      // disable all the lozenge elements after the selected one
      if (hasSelected && this.selected != index) lozenge.setAttribute('disabled', '');

      // remove border left after selected lozenge
      if (this.selected == index - 1) {
        lozenge.style.borderLeft = '1px solid transparent';
      }
    });
  }

  componentDidLoad(): void {
    this.children = Array.from(this.host.children).map(n => n as HTMLZenLozengeElement);
    this.setChildStyles();
  }

  render(): HTMLElement {
    const ZenLozenge = applyPrefix('zen-lozenge', this.host);
    return (
      <Host>
        <slot></slot>
        {this.archived && (
          <ZenLozenge data-test="archived" size="lg" variant="dark-grey">
            Archived
          </ZenLozenge>
        )}
      </Host>
    );
  }
}
