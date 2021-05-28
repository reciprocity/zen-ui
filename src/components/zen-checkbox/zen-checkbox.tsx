import { Component, Host, h, Prop, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { faHorizontalRule } from '@fortawesome/pro-solid-svg-icons';

/**
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
  @Prop() readonly disabled: boolean = false;

  /** Label of the checkbox. */
  @Prop() readonly label: string = '';

  /** Shows a red asterisk after label. */
  @Prop() readonly required: boolean = false;

  /** Shows the checkbox in indeterminate state */
  @Prop({ mutable: true }) indeterminate = false;

  /** Checkbox change event */
  @Event() zenChange: EventEmitter<void>;

  /** Same as native click, but triggered AFTER `checked` is propperly set. This allows us to determine the state of checkbox inside the event handler. */
  @Event() zenClick: EventEmitter<void>;

  @Watch('checked')
  checkedChanged(): void {
    this.zenChange.emit();
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
    this.zenClick.emit();
  };

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);

    return (
      <Host onClick={this.onClick}>
        <input
          type="checkbox"
          class="input-control"
          disabled={this.disabled}
          checked={this.checked}
          required={this.required}
          indeterminate={this.indeterminate}
        />
        {this.checked && !this.indeterminate && <ZenIcon class="icon" icon={faCheck} size="sm"></ZenIcon>}
        {this.indeterminate && <ZenIcon class="icon" icon={faHorizontalRule} size="sm"></ZenIcon>}
        {this.label && (
          <label class={{ disabled: this.disabled }}>
            {this.label} {this.required ? <span class="required">*</span> : null}
          </label>
        )}
      </Host>
    );
  }
}
