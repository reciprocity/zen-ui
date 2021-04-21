import { Component, Host, h, Prop, Element, Listen, Watch, Method } from '@stencil/core';
import { querySelectorAllDeep } from 'query-selector-shadow-dom';
import last from 'lodash/last';
import { applyPrefix, toggleAttribute } from '../helpers/helpers';

/**
 * @event change | Called each time radio.selected changes
 */

@Component({
  tag: 'zen-radio',
  styleUrl: 'zen-radio.scss',
  shadow: true,
})
export class ZenRadio {
  @Element() host: HTMLZenRadioElement;

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';

  /** Check/uncheck radio */
  @Prop({ reflect: true }) readonly checked: boolean = false;

  /** Value of this radio option */
  @Prop() readonly value: string = '';

  /** Value of selected radio in this group */
  @Prop() readonly selected: string = '';

  /** Shows a red asterisk after label */
  @Prop() readonly required = false;

  /** Radio can't be selected (but you can still set `checked=true`) */
  @Prop() readonly disabled = false;

  /** Group id to which this radio belongs */
  @Prop({ reflect: true }) readonly group: string = '';

  @Watch('checked')
  async checkedChanged(checked: boolean): Promise<void> {
    this.setSelected(checked ? this.value : '');
  }

  @Watch('selected')
  async selectedChanged(selected: string): Promise<void> {
    this.setSelected(selected);
  }

  setSelected(selected: string): void {
    const dispatchChangeEvents = (): void => {
      this.elementsInSameGroup().forEach((element: HTMLZenRadioElement) => {
        element.dispatchEvent(new window.Event('change'));
      });
    };

    const setUpdating = (toggle = false): void => {
      const elements = this.elementsInSameGroup();
      elements.forEach((element: HTMLZenRadioElement) => {
        toggleAttribute(element, 'updating-group', toggle ? 'true' : '');
      });
    };

    const isUpdating = (): boolean => {
      return !!this.host.getAttribute('updating-group');
    };

    const updateElement = (element: HTMLZenRadioElement, selected: string): void => {
      const radio = element.shadowRoot.querySelector('input[type=radio]') as HTMLInputElement;
      if (!radio) return;
      radio.checked = element.value === selected;
      element.checked = element.value === selected;
      element.selected = selected;
    };

    if (isUpdating()) return; // Only first element should update group!

    setUpdating(true); // Lock it

    this.elementsInSameGroup().forEach((element: HTMLZenRadioElement) => {
      updateElement(element, selected);
    });
    dispatchChangeEvents();

    setUpdating(false); // Unlock
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
    return this.host.shadowRoot.querySelector('input[type=radio]');
  }

  elementsInSameGroup(onlyEnabled?: boolean): HTMLZenRadioElement[] {
    const radioWithPrefix = applyPrefix('zen-radio', this.host);
    const selector = `${radioWithPrefix}[group=${this.group}]${onlyEnabled ? ':not([disabled])' : ''}`;
    return this.group ? (Array.from(querySelectorAllDeep(selector)) as HTMLZenRadioElement[]) : [this.host];
  }

  onClick(event: Event): void {
    if (this.disabled) return;
    this.setSelected(this.value);
    this.radioInput().focus();
    event.preventDefault();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    // Since we're in a shadow dom, arrow up/down doesn't work to move
    //   amoung the options, so we have to do it manually:
    const radios = this.elementsInSameGroup(true);
    const index = radios.findIndex(radio => radio === this.host);
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
      <Host onClick={e => this.onClick(e)}>
        <input
          type="radio"
          class="input-control"
          id="radio"
          name={this.group}
          onClick={e => this.onClick(e)}
          disabled={this.disabled}
        />
        <div class="radiomark" />
        <label htmlFor="radio">
          <slot />
        </label>
        {this.required ? <span class="required">*</span> : null}
      </Host>
    );
  }
}