import { Component, Host, h, Prop, Element, Listen, Watch, Method } from '@stencil/core';
import { querySelectorAllDeep } from 'query-selector-shadow-dom';
import last from 'lodash/last';

/**
 * @event change | Called each time radio.selected changes
 */

@Component({
  tag: 'zen-radio',
  styleUrl: 'zen-radio.scss',
  shadow: true,
})
export class ZenRadio {
  @Element() hostElement: HTMLZenRadioElement;

  /** Check/uncheck radio */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Value of this radio option */
  @Prop() readonly value: string = '';

  /** Value of selected radio in this group */
  @Prop() readonly selected: string = '';

  /** Shows a red asterisk after label */
  @Prop() readonly required = false;

  /** Group id to which this radio belongs */
  @Prop({ reflect: true }) readonly group: string = '';

  @Watch('checked')
  async checkedChanged(checked: boolean): Promise<void> {
    const deselectElements = radios => {
      radios.forEach((radio: HTMLInputElement) => {
        if (!radio.checked) return;
        radio.checked = false;
      });
    };

    function updateResultAttrs(radios: HTMLZenRadioElement[], selected: string): void {
      radios.forEach((element: HTMLZenRadioElement) => {
        element.selected = selected;
      });
    }

    function dispatchChangeEvents(radios: HTMLZenRadioElement[]): void {
      radios.forEach((element: HTMLZenRadioElement) => {
        element.dispatchEvent(new window.Event('change'));
      });
    }

    // Trigger this procedure just once - just for cheched radio:
    this.radioInput().checked = checked;

    if (!checked) return;

    // Since we're in a shadow dom, we have to manually deselect all other
    //   radios of the same group:
    const radios = this.elementsInSameGroup();
    const others = radios.filter(n => n !== this.hostElement);

    deselectElements(others);
    updateResultAttrs(radios, this.value);
    this.checked = checked;
    dispatchChangeEvents(radios);
  }

  /** Focus radio programatically */
  @Method()
  async setFocus(focus?: boolean): Promise<void> {
    if (focus === undefined) {
      focus = document.activeElement !== this.radioInput();
    }
    if (focus) {
      this.radioInput().focus();
    } else {
      this.radioInput().blur();
    }
  }

  radioInput(): HTMLInputElement {
    return this.hostElement.shadowRoot.querySelector('input[type=radio]');
  }

  elementsInSameGroup(): HTMLZenRadioElement[] {
    return this.group
      ? (Array.from(querySelectorAllDeep(`zen-radio[group=${this.group}]`)) as HTMLZenRadioElement[])
      : [this.hostElement];
  }

  onClick(): void {
    this.checked = true;
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    // Since we're in a shadow dom, arrow up/down doesn't work to move
    //   amoung the options, so we have to do it manually:
    const radios = this.elementsInSameGroup();
    const index = radios.findIndex(radio => radio === this.hostElement);
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      const forward = event.key === 'ArrowDown';
      const next = radios[forward ? index + 1 : index - 1];
      const fallback = forward ? radios[0] : last(radios);
      const selected = next || fallback;

      selected.checked = true;
      selected.setFocus(true);
      event.preventDefault();
    }
  }

  componentDidLoad(): void {
    if (!this.checked) return;
    this.checkedChanged(this.checked);
  }

  render(): HTMLElement {
    return (
      <Host>
        <input type="radio" class="input-control" id="radio" name={this.group} onClick={() => this.onClick()} />
        <div class="radiomark" />
        <label htmlFor="radio">
          <slot />
        </label>
        {this.required ? <span class="required">*</span> : null}
      </Host>
    );
  }
}
