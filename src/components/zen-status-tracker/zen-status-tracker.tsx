import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-status-tracker',
  styleUrl: 'zen-status-tracker.scss',
  shadow: true,
})
export class ZenStatusTracker {
  childObserver: MutationObserver = null;
  children: HTMLZenLozengeElement[];

  @Element() host: HTMLZenStatusTrackerElement;

  /** Selected id */
  @Prop({ reflect: true }) readonly selectedId: string = '';

  /** Status archived */
  @Prop({ reflect: true }) readonly archived: boolean = false;

  hasIdsSet(): boolean {
    return this.children.every(item => item.hasAttribute('id'));
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  validate(): void {
    if (!this.hasChildren()) throw new Error("There's no lozenge children!");
    if (!this.hasIdsSet()) throw new Error("Not all lozenge elements have id's!");
  }

  updateParameters(statusTracker: HTMLZenStatusTrackerElement): void {
    this.validate();
    statusTracker.selectedId = this.selectedId;
    statusTracker.archived = this.archived;
  }

  setLozengeProperties(): void {
    this.validate();

    if (this.archived) {
      this.children.forEach(lozenge => {
        lozenge.setAttribute('variant', 'none');
        lozenge.setAttribute('size', 'lg');
      });

      return;
    }

    const lastChild = this.children[this.children.length - 1];
    this.children.reduce((hasSelected, lozenge) => {
      lozenge.setAttribute('size', 'lg');
      const isSelected = this.selectedId === lozenge.id;
      if (isSelected) {
        hasSelected = true;
        lozenge.setAttribute('variant', lozenge.id === lastChild.id ? 'green' : 'dark-blue-ghost');
      } else {
        lozenge.setAttribute('variant', 'none');
      }

      // Every lozenge after selected is "disabled"
      if (hasSelected && !isSelected) lozenge.setAttribute('disabled', '');

      // Remove left border if previous lozenge is selected
      const previousElement = lozenge.previousElementSibling;
      if (previousElement && previousElement.id === this.selectedId) lozenge.style.borderLeft = '1px solid transparent';

      return hasSelected;
    }, false);
  }

  startChildObserver(): void {
    this.childObserver = new MutationObserver(() => this.updateParameters(this.host));

    this.childObserver.observe(this.host, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  componentDidLoad(): void {
    this.children = Array.from(this.host.children).map(n => n as HTMLZenLozengeElement);
    this.setLozengeProperties();
    this.startChildObserver();
  }

  disconnectedCallback(): void {
    if (this.childObserver) this.childObserver.disconnect();
  }

  render(): HTMLElement {
    const ZenLozenge = applyPrefix('zen-lozenge', this.host);
    return (
      <Host>
        <slot></slot>
        {this.archived && (
          <ZenLozenge id="archived" data-test="archived" size="lg" variant="dark-grey">
            Archived
          </ZenLozenge>
        )}
      </Host>
    );
  }
}
