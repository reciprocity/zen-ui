import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { CheckboxChangeEventDetail } from './zen-checkbox-interface';

@Component({
  tag: 'zen-checkbox',
  styleUrl: 'zen-checkbox.scss',
  shadow: true,
})
export class ZenCheckbox {
  /**
   * Set checked state.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Disables checkbox.
   */
  @Prop() readonly disabled = false;

  /**
   * The value of the checkbox does not mean if it's checked or not, use the `checked`
   * property for that.
   *
   * The value of a checkbox is analogous to the value of an `<input type="checkbox">`,
   * it's only used when the checkbox participates in a native `<form>`.
   */
  @Prop() readonly value = 'on';

  /**
   * Emitted when the checked property has changed.
   */
  @Event() zenChange!: EventEmitter<CheckboxChangeEventDetail>;

  @Watch('checked')
  checkedChanged(isChecked: boolean): void {
    this.zenChange.emit({
      checked: isChecked,
      value: this.value,
    });
  }

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    this.checked = !this.checked;
  };

  render(): HTMLElement {
    return (
      <Host onClick={this.onClick}>
        <input type="checkbox" class="input-control" disabled={this.disabled} checked={this.checked} />
      </Host>
    );
  }
}
