import { Component, Host, h, Prop, State, Event, EventEmitter, Listen, Watch, Element, Method } from '@stencil/core';
import { MouseEvent, slotPassed, getSlotElement } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { renderIcon, styles } from '../helpers/fa-icons';
import get from 'lodash/get';
import { waitNextFrame, getElementPath } from '../helpers/helpers';
import { Key } from 'ts-key-enum';
import { Align } from '../helpers/types';

export interface OptionItem {
  label: string;
}

export type OptionValue = string | number | undefined;

@Component({
  tag: 'zen-dropdown',
  styleUrl: 'zen-dropdown.scss',
  shadow: true,
})
export class ZenDropdown {
  div: HTMLElement = undefined;
  listWrap: HTMLElement = undefined;
  list: HTMLElement = undefined;
  clickHandler = undefined;
  selectedOption: OptionItem = null;
  hasOptionsSlot = false;

  @Element() hostElement: HTMLZenDropdownElement;

  @State() opened = false;
  @State() focusedIndex = -1;

  /** Selected option */
  @Prop({ mutable: true }) value: OptionValue = undefined;
  /** Array of available options */
  @Prop() readonly options: Array<OptionItem> = [];
  /** Option key that is unique for each option */
  @Prop() readonly trackBy: string = 'label';
  /** Alignment of field content and menu (if menuWidth set). */
  @Prop() readonly fieldAlign: Align = Align.LEFT;
  /** Width of menu. Set '100%' to match field width. */
  @Prop() readonly menuWidth: string = '100%';
  /** To determine if there's enough space under field on open */
  @Prop() readonly menuHeight: number = 170;
  /** Close dropdown menu after selecting an item */
  @Prop() readonly closeOnSelect = true;
  /** Don't draw border around field */
  @Prop() readonly borderless = false;

  /** Emitted on any selection change */
  @Event() zenInput: EventEmitter<OptionValue>;
  /** Focused item changed (keyboard arrows) */
  @Event() zenFocusItem: EventEmitter<OptionValue>;

  /** Close an opened dropdown menu */
  @Method()
  async toggle(open?: boolean): Promise<void> {
    if (open === undefined) {
      open = !this.opened;
    }
    this.opened = open;
  }

  @Watch('value')
  valueChanged(value: OptionValue): void {
    this.selectedOption = value ? this.options.find(n => n[this.trackBy] === value) : undefined;
  }

  @Watch('focusedIndex')
  focusedIndexChanged(focusedIndex: OptionValue): void {
    this.zenFocusItem.emit(focusedIndex);
    if (!this.hasOptionsSlot) return;

    const items = this.getSlottedOptionItems();
    for (let i = 0; i < items.length; i++) {
      items[i].focused = i === focusedIndex;
    }
  }

  @Watch('opened')
  async openedChanged(opened: boolean): Promise<void> {
    if (opened) {
      if (!this.clickHandler) {
        this.clickHandler = event => this.closeOnClickOut(event);
      }
      document.addEventListener('mouseup', this.clickHandler);

      // Reset scroll:
      if (this.list) {
        await waitNextFrame();
        await waitNextFrame();
        this.list.scrollTop = 0;
      }

      if (this.hasOptionsSlot) {
        this.markSelectedSlottedOption(this.value);
      }
    } else {
      document.removeEventListener('mouseup', this.clickHandler);
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    const toggleKeys = ['Space', Key.Enter, Key.ArrowUp, Key.ArrowDown];

    if (!this.opened && toggleKeys.includes(ev.key)) {
      this.toggleDropdown();
      ev.preventDefault();
      return;
    }

    switch (ev.key) {
      case Key.ArrowDown:
        this.focusedIndex++;
        if (this.focusedIndex > this.options.length - 1) {
          this.focusedIndex = 0;
        }
        ev.preventDefault();
        break;

      case Key.ArrowUp:
        this.focusedIndex--;
        if (this.focusedIndex < 0) {
          this.focusedIndex = this.options.length - 1;
        }
        ev.preventDefault();
        break;

      case Key.Enter:
      case 'Space':
        const focused = this.options[this.focusedIndex];
        if (focused) {
          this.selectValue(focused);
        }
        ev.preventDefault();
        break;
    }
  }

  getSlottedOptionItems(): NodeListOf<HTMLZenOptionElement> | undefined[] {
    const list = getSlotElement(this.hostElement, 'options');
    if (!list) return []; // happens when dropdown isn't opened
    return list.querySelectorAll('zen-option');
  }

  markSelectedSlottedOption(value: OptionValue): void {
    // Set attr `selected` to currently selected slotted item:
    if (!this.hasOptionsSlot) return;

    const items = this.getSlottedOptionItems();
    for (let i = 0; i < items.length; i++) {
      items[i].selected = this.options[i][this.trackBy] === value;
    }
  }

  selectValue(option: OptionItem): void {
    this.value = option[this.trackBy];
    if (open) {
      this.focusedIndex = this.selectedIndex();
    }
    if (this.closeOnSelect) {
      this.opened = false;
    }
    this.zenInput.emit(this.value);
  }

  toggleDropdown(open?: boolean): void {
    if (open === undefined) open = !this.opened;
    this.focusedIndex = -1;
    this.opened = open;
  }

  isSelected(option: OptionItem): boolean {
    return option[this.trackBy] === this.value;
  }

  selectedIndex(): number {
    return this.options.findIndex(n => n[this.trackBy] === this.value);
  }

  // Events
  async closeOnClickOut(event: MouseEvent): Promise<void> {
    const path = getElementPath(event.target as HTMLElement);
    const clickedInside = path.find(n => n === this.list);
    if (clickedInside) return;
    await waitNextFrame(); // prevent race with click-open
    this.opened = false;
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

  connectedCallback(): void {
    this.valueChanged(this.value);
  }

  componentWillLoad(): void {
    this.hasOptionsSlot = slotPassed(this.hostElement, 'options');
    this.valueChanged(this.value);
  }

  render(): HTMLElement {
    return (
      <Host tabindex="0" ref={el => (this.div = el)}>
        <style>{styles}</style>
        <div
          class={{
            field: true,
            opened: this.opened,
            borderless: this.borderless,
          }}
          onClick={() => {
            this.toggleDropdown(true);
          }}
        >
          {get(this.selectedOption, 'label') || 'Select something'}
          <div class="arrow">{renderIcon(faChevronDown)}</div>
        </div>
        <div
          class={{ 'list-wrap': true, 'open-above': this.openAbove(), 'align-right': this.fieldAlign !== Align.LEFT }}
          style={{ width: this.menuWidth }}
          ref={el => (this.listWrap = el)}
        >
          <zen-animate show={this.opened}>
            <div class="list" ref={el => (this.list = el)}>
              <slot name="options">
                {this.options.map((option, index) => (
                  <zen-option
                    label={option.label}
                    focused={this.focusedIndex === index}
                    selected={option[this.trackBy] === this.value}
                    onClick={() => this.selectValue(option)}
                  />
                ))}
              </slot>
            </div>
          </zen-animate>
        </div>
      </Host>
    );
  }
}
