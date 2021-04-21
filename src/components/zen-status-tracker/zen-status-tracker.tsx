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
    if (this.archived) {
      this.children.forEach(lozenge => {
        lozenge.setAttribute('variant', 'none');
        lozenge.setAttribute('size', 'lg');
      });

      return;
    }

    this.children.reduce((hasSelected, lozenge, index) => {
      lozenge.setAttribute('size', 'lg');
      const isSelected = this.selected === index;
      if (isSelected) {
        hasSelected = true;
        lozenge.setAttribute('variant', index === this.children.length - 1 ? 'green' : 'dark-blue-ghost');
      } else {
        lozenge.setAttribute('variant', 'none');
      }

      if (hasSelected && !isSelected) lozenge.setAttribute('disabled', '');
      if (index && this.selected === index - 1) lozenge.style.borderLeft = '1px solid transparent';

      return hasSelected;
    }, false);
  }

  componentDidLoad(): void {
    if (this.host.children.length == 0) throw new Error("There's no lozenge children");
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
