import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { CheckboxChangeEventDetail } from './types';

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
   * Label of the checkbox.
   */
  @Prop() readonly label: string = null;

  /**
   * Emitted when the checked property has changed.
   */
  @Event() change!: EventEmitter<CheckboxChangeEventDetail>;

  @Watch('checked')
  checkedChanged(isChecked: boolean): void {
    this.change.emit({
      checked: isChecked,
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
        {this.label ? <zen-label label={this.label} /> : null}
      </Host>
    );
  }
}
