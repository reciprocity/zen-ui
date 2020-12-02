import { Component, Host, h, Prop, State, Watch, Event, EventEmitter, Listen } from '@stencil/core';
import { key } from '../helpers/keyCodes';
import { MouseEvent } from '../helpers/helpers';

export interface OptionItem {
  label: string;
}

@Component({
  tag: 'zen-dropdown',
  styleUrl: 'zen-dropdown.scss',
  shadow: true,
})
export class ZenDropdown {
  div: HTMLElement = undefined;
  clickHandler = undefined;

  @State() opened = false;
  @State() focusedIndex = -1;

  /** Selected option */
  @Prop() val: OptionItem = { label: '' };
  /** Array of available options */
  @Prop() options: Array<OptionItem> = [];
  /** Option key that is unique for each option */
  @Prop() trackBy = 'label';
  @Prop() selectedColor: string;
  /** If true, multiple options can be selected */
  @Prop() multiselect = false;

  @Watch('val')
  dataDidChangeHandler(val: OptionItem): void {
    this.emitValueChanged(val);
  }

  /** Emitted on any selection change */
  @Event() input2: EventEmitter<OptionItem>;
  emitValueChanged(value: OptionItem): void {
    this.input2.emit(value);
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    const toggleKeys = [key.SPACE, key.ENTER, key.UP, key.DOWN];

    if (!this.opened && toggleKeys.includes(ev.keyCode)) {
      this.toggleDropdown();
      ev.preventDefault();
      return;
    }

    switch (ev.keyCode) {
      case key.DOWN:
        this.focusedIndex++;
        if (this.focusedIndex > this.options.length - 1) {
          this.focusedIndex = 0;
        }
        ev.preventDefault();
        break;

      case key.UP:
        this.focusedIndex--;
        if (this.focusedIndex < 0) {
          this.focusedIndex = this.options.length - 1;
        }
        ev.preventDefault();
        break;

      case key.ENTER:
      case key.SPACE:
        const focused = this.options[this.focusedIndex];
        if (focused) {
          this.selectValue(focused);
        }
        ev.preventDefault();
        break;
    }
  }

  selectValue(option: OptionItem): void {
    this.val = option;
    this.opened = false;
  }

  toggleDropdown(open?: boolean): void {
    if (open === undefined) open = !this.opened;

    if (open) {
      this.focusedIndex = this.selectedIndex();
      this.clickHandler = event => this.closeOnClickOut(event);
      document.addEventListener('mousedown', this.clickHandler);
    } else {
      document.removeEventListener('mousedown', this.clickHandler);
    }
    this.opened = open;
  }

  isSelected(option: OptionItem): boolean {
    return option[this.trackBy] === this.val[this.trackBy];
  }

  selectedIndex(): number {
    return this.options.findIndex(n => n[this.trackBy] === this.val[this.trackBy]);
  }

  // Events
  closeOnClickOut(event: MouseEvent): void {
    const clickedInside = this.div.shadowRoot.contains(event.path[0]);
    if (!clickedInside) {
      this.opened = false;
    }
  }

  render(): HTMLElement {
    return (
      <Host tabindex="0" class="zen-multiselect" ref={el => (this.div = el)}>
        <div
          class={{
            field: true,
            opened: this.opened,
          }}
          onClick={() => {
            this.toggleDropdown(true);
          }}
        >
          {this.val.label || 'Select something'}
          <div class="arrow"></div>
        </div>
        <div class="list-wrap">
          <zen-animate show={this.opened}>
            <ul class="list">
              {this.options.map((option, index) => (
                <li
                  class={{ selected: this.focusedIndex === index }}
                  style={{ 'background-color': this.isSelected(option) ? this.selectedColor : '' }}
                  onClick={() => this.selectValue(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </zen-animate>
        </div>
      </Host>
    );
  }
}
