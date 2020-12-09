import { Component, Host, h, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';
import { key } from '../helpers/keyCodes';
import { MouseEvent } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { renderIcon, styles } from '../helpers/fa-icons';
import { get } from 'lodash';

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
  listWrap: HTMLElement = undefined;
  clickHandler = undefined;

  @State() opened = false;
  @State() focusedIndex = -1;

  /** Selected option */
  @Prop({ mutable: true }) value: OptionItem = null;
  /** Array of available options */
  @Prop() readonly options: Array<OptionItem> = [];
  /** Option key that is unique for each option */
  @Prop() readonly trackBy: string = 'label';
  /** If true, multiple options can be selected */
  @Prop() readonly multiselect: boolean = false;
  /** To determine if there's enough space under field on open */
  @Prop() readonly menuHeight: number = 170;

  /** Emitted on any selection change */
  @Event() zenInput: EventEmitter<OptionItem>;

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
    this.value = option;
    this.opened = false;
    this.zenInput.emit(this.value);
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
    return option[this.trackBy] === get(this, 'value.' + this.trackBy);
  }

  selectedIndex(): number {
    return this.options.findIndex(n => n[this.trackBy] === get(this, 'value.' + this.trackBy));
  }

  // Events
  closeOnClickOut(event: MouseEvent): void {
    const clickedInside = this.div.shadowRoot.contains(event.path[0]);
    if (!clickedInside) {
      this.opened = false;
    }
  }

  openAbove(): boolean {
    if (!this.listWrap) return false;
    let el: HTMLElement = this.listWrap;
    let y = el.offsetTop;
    while (el.offsetParent) {
      el = el.offsetParent as HTMLElement;
      y += el.offsetTop;
    }
    return y < window.pageYOffset || y + this.menuHeight > window.pageYOffset + window.innerHeight;
  }

  render(): HTMLElement {
    return (
      <Host tabindex="0" class="zen-multiselect" ref={el => (this.div = el)}>
        <style>{styles}</style>
        <div
          class={{
            field: true,
            opened: this.opened,
          }}
          onClick={() => {
            this.toggleDropdown(true);
          }}
        >
          {get(this, 'value.label') || 'Select something'}
          <div class="arrow">{renderIcon(faChevronDown)}</div>
        </div>
        <div class={{ 'list-wrap': true, 'open-above': this.openAbove() }} ref={el => (this.listWrap = el)}>
          <zen-animate show={this.opened}>
            <ul class="list">
              {this.options.map((option, index) => (
                <li class={{ selected: this.focusedIndex === index }} onClick={() => this.selectValue(option)}>
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
