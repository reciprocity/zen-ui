import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';

/**
 * @event change | Called whenever checkbox value changes
 * @event click | Called when checkbox value changes due to user action
 */

@Component({
  tag: 'zen-checkbox',
  styleUrl: 'zen-checkbox.scss',
  shadow: true,
})
export class ZenCheckbox {
  @Element() host: HTMLZenCheckboxElement;

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';

  /** Set checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Disables checkbox. */
  @Prop() readonly disabled = false;

  /** Label of the checkbox. */
  @Prop() readonly label: string = '';

  /** Shows a red asterisk after label. */
  @Prop() readonly required = false;

  /** Shows the checkbox in indeterminate state */
  @Prop({ mutable: true }) indeterminate = false;

  @Watch('checked')
  checkedChanged(): void {
    this.host.dispatchEvent(new window.Event('change'));
  }

  @Watch('indeterminate')
  indeterminateChanged(): void {
    this.host.shadowRoot.querySelector('input').indeterminate = this.indeterminate;
  }

  componentDidLoad(): void {
    if (this.indeterminate) this.host.shadowRoot.querySelector('input').indeterminate = true;
  }

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (this.disabled) return;
    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
      this.host.shadowRoot.querySelector('input').indeterminate = false;
    } else {
      this.checked = !this.checked;
    }
  };

  render(): HTMLElement {
    return (
      <Host onClick={this.onClick}>
        <input
          type="checkbox"
          class="input-control"
          disabled={this.disabled}
          checked={this.checked}
          required={this.required}
        />
        <label class={{ disabled: this.disabled }}>
          {this.label} {this.required ? <span class="required">*</span> : null}
        </label>
      </Host>
    );
  }
}
