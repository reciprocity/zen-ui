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

  getChildren(): HTMLZenLozengeElement[] {
    return (Array.from(this.host.children) as unknown) as HTMLZenLozengeElement[];
  }

  hasIdsSet(): boolean {
    return this.getChildren().every(item => item.hasAttribute('id'));
  }

  hasChildren(): boolean {
    return this.getChildren().length > 0;
  }

  isValid(): boolean {
    if (!this.hasChildren()) {
      console.error('zen-status-tracker: There is no `zen-lozenge` elements!', this.host);
      return false;
    }

    if (!this.hasIdsSet()) {
      console.error('zen-status-tracker: Not all of `zen-lozenge`elements have id defined!!', this.host);
      return false;
    }

    return true;
  }

  setLozengeProperties(): void {
    if (!this.isValid()) return;
    const children = this.getChildren();

    if (this.archived) {
      children.forEach(lozenge => {
        lozenge.setAttribute('variant', 'none');
        lozenge.setAttribute('size', 'lg');
      });

      return;
    }

    const lastChild = children[children.length - 1];
    children.reduce((hasSelected, lozenge) => {
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
    this.childObserver = new MutationObserver(() => this.setLozengeProperties());

    this.childObserver.observe(this.host, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  componentWillLoad(): void {
    this.setLozengeProperties();
  }

  componentDidLoad(): void {
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
