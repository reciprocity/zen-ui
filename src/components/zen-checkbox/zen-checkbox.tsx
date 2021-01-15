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
  @Element() hostElement: HTMLZenCheckboxElement;

  /** Set checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Disables checkbox. */
  @Prop() readonly disabled = false;

  /** Label of the checkbox. */
  @Prop() readonly label: string = '';

  /** Shows a red asterisk after label. */
  @Prop() readonly required = false;

  @Watch('checked')
  checkedChanged(): void {
    this.hostElement.dispatchEvent(new window.Event('change'));
  }

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (this.disabled) return;
    this.checked = !this.checked;
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
