import { Component, Host, h, Prop } from '@stencil/core';
import { querySelectorAllDeep } from 'query-selector-shadow-dom';

@Component({
  tag: 'zen-radio',
  styleUrl: 'zen-radio.scss',
  shadow: true,
})
export class ZenRadio {
  /** Shows a red asterisk after label. */
  @Prop() readonly required = false;

  /** Group id to which this radio belongs */
  @Prop() readonly group: string = '';

  onClick(event: Event): void {
    // Since we're in a shadow dom, we have to manually deselect all other
    //   radios of the same group:
    const radios = querySelectorAllDeep(`input[name=${this.group}]`);
    Array.from(radios)
      .filter(radio => radio !== event.target)
      .forEach((radio: HTMLInputElement) => {
        radio.checked = false;
      });
  }

  render(): HTMLElement {
    return (
      <Host>
        <input
          type="radio"
          class="input-control"
          id="radio"
          name={this.group}
          onChange={event => this.onClick(event)}
        />
        <label htmlFor="radio">
          <slot />
        </label>
        {this.required ? <span class="required">*</span> : null}
      </Host>
    );
  }
}
