import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { querySelectorAllDeep } from 'query-selector-shadow-dom';
import last from 'lodash/last';

@Component({
  tag: 'zen-radio',
  styleUrl: 'zen-radio.scss',
  shadow: true,
})
export class ZenRadio {
  @Element() hostElement: HTMLZenRadioElement;

  /** Shows a red asterisk after label. */
  @Prop() readonly required = false;

  /** Group id to which this radio belongs */
  @Prop() readonly group: string = '';

  selectRadio(radio: HTMLInputElement): void {
    // Since we're in a shadow dom, we have to manually deselect all other
    //   radios of the same group:
    const radios = querySelectorAllDeep(`input[name=${this.group}]`);
    Array.from(radios)
      .filter(n => n !== radio)
      .forEach((radio: HTMLInputElement) => {
        radio.checked = false;
      });
    radio.checked = true;
  }

  onClick(event: Event): void {
    // Since we're in a shadow dom, we have to manually deselect all other
    //   radios of the same group:
    this.selectRadio(event.target as HTMLInputElement);
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    // Since we're in a shadow dom, arrow up/down doesn't work to move
    //   amoung the options, so we have to do it manually:
    const radios = Array.from(querySelectorAllDeep(`input[name=${this.group}]`));
    const input = this.hostElement.shadowRoot.querySelector('input[type=radio]');
    const index = radios.findIndex(radio => radio === input);
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      const forward = event.key === 'ArrowUp';
      const next = radios[forward ? index + 1 : index - 1];
      const fallback = forward ? radios[0] : last(radios);
      const focus = (next || fallback) as HTMLInputElement;

      this.selectRadio(focus);
      focus.focus();

      event.preventDefault();
    }
  }

  render(): HTMLElement {
    return (
      <Host>
        <input type="radio" class="input-control" id="radio" name={this.group} onClick={event => this.onClick(event)} />
        <label htmlFor="radio">
          <slot />
        </label>
        {this.required ? <span class="required">*</span> : null}
      </Host>
    );
  }
}
