import { h, Component, Element, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-breadcrumbs',
  styleUrl: 'zen-breadcrumbs.scss',
  shadow: true,
})
export class ZenBreadcrumbs {
  @Element() host: HTMLZenBreadcrumbsElement;

  /** The separator string */
  @Prop() readonly separator: string = '>';

  children: Element[];
  elements: Element[];

  componentWillLoad(): void {
    this.children = Array.from(this.host.children);
    this.elements = this.insertBetween<Element>(this.children, this.separatorEl());
  }

  insertBetween<T>(arr: Array<T>, betweenEl: T): Array<T> {
    arr = [].concat(...arr.map(el => [el, betweenEl]));
    arr.pop();
    return arr;
  }

  separatorEl(): Element {
    const separator = document.createElement('div');
    separator.classList.add('separator');
    separator.innerText = this.separator;
    return separator;
  }

  render(): HTMLElement {
    return (
      <Host>
        {this.elements.map(el => (
          <div innerHTML={el.outerHTML} />
        ))}
      </Host>
    );
  }
}
