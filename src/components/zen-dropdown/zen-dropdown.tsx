import { Component, Host, h, Prop, State, Event, EventEmitter, Listen, Watch, Element, Method } from '@stencil/core';
import { MouseEvent, slotPassed, getSlotElement } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { renderIcon, styles } from '../helpers/fa-icons';
import { OptionValue } from '../zen-menu-item/zen-option';
import { waitNextFrame, getElementPath } from '../helpers/helpers';
import { Key } from 'ts-key-enum';
import { Align } from '../helpers/types';

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
  list: HTMLElement = undefined;
  clickHandler = undefined;
  hasOptionsSlot = false;

  @Element() hostElement: HTMLZenDropdownElement;

  @State() opened = false;

  /** Selected option */
  @Prop({ mutable: true }) value: OptionValue = undefined;
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
  @Event() zenChange: EventEmitter<OptionValue>;

  /** Close an opened dropdown menu */
  @Method()
  async toggle(open?: boolean): Promise<void> {
    if (open === undefined) {
      open = !this.opened;
    }
    this.opened = open;
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

      this.appendOptionsOnClickHandlers();
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
        this.moveFocusedOption('forward');
        ev.preventDefault();
        break;

      case Key.ArrowUp:
        this.moveFocusedOption('backward');
        ev.preventDefault();
        break;

      case Key.Enter:
      case 'Space':
        const focused = this.getFocusedOption();
        if (focused) {
          this.selectValue(focused.getAttribute('value'));
        }
        ev.preventDefault();
        break;
    }
  }

  getOptionValue(option: HTMLZenOptionElement): OptionValue {
    return option.getAttribute('value');
  }

  getSlottedOptionItems(): NodeListOf<HTMLZenOptionElement> | undefined[] {
    const list = getSlotElement(this.hostElement, 'options');
    if (!list) return []; // happens when dropdown isn't opened
    return list.querySelectorAll('zen-option[value]');
  }

  markSelectedSlottedOption(value: OptionValue): void {
    // Set attr `selected` to currently selected slotted item:
    if (!this.hasOptionsSlot) return;

    const items = this.getSlottedOptionItems();
    for (let i = 0; i < items.length; i++) {
      items[i].selected = this.getOptionValue(items[i]) === value;
    }
  }

  getSelectedOptionElement(): HTMLZenOptionElement {
    const items = this.getSlottedOptionItems();
    for (let i = 0; i < items.length; i++) {
      if (this.getOptionValue(items[i]) === this.value) {
        return items[i];
      }
    }
  }

  selectValue(value: OptionValue): void {
    this.value = value;
    if (open) {
      this.setFocusedOption(this.getSelectedOptionElement());
    }
    if (this.closeOnSelect) {
      this.opened = false;
    }
    this.zenChange.emit(value);
  }

  toggleDropdown(open?: boolean): void {
    if (open === undefined) open = !this.opened;
    this.setFocusedOption();
    this.opened = open;
  }

  setFocusedOption(option?: HTMLZenOptionElement): void {
    // only one item can be focused, so remove focus from all other items:
    const items = this.getSlottedOptionItems();
    for (let i = 0; i < items.length; i++) {
      items[i].removeAttribute('focused');
    }
    if (!option) return;
    option.setAttribute('focused', 'true');
  }

  getFocusedOption = (): HTMLZenOptionElement =>
    Array.from(this.getSlottedOptionItems()).filter(el => el.hasAttribute('focused'))[0];

  moveFocusedOption(direction = 'forward'): void {
    const items = this.getSlottedOptionItems();
    let prev = items[items.length - 1];
    let next = items[0];
    for (let i = 0; i < items.length; i++) {
      if (items[i].hasAttribute('focused')) {
        prev = items[i - 1] || prev;
        next = items[i + 1] || next;
      }
    }
    const focusOption = direction === 'forward' ? next : prev;
    this.setFocusedOption(focusOption);
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

  componentWillLoad(): void {
    this.hasOptionsSlot = slotPassed(this.hostElement, 'options');
  }

  appendOptionsOnClickHandlers(): void {
    if (!this.hasOptionsSlot) return;

    const items = this.getSlottedOptionItems();
    for (let i = 0; i < items.length; i++) {
      if (items[i].getAttribute('data-click-mounted')) continue;
      items[i].setAttribute('data-click-mounted', 'true');
      items[i].addEventListener('click', () => {
        this.selectValue(this.getOptionValue(items[i]));
      });
    }
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
          {this.value || 'Select something'}
          <div class="arrow">{renderIcon(faChevronDown)}</div>
        </div>
        <div
          class={{ 'list-wrap': true, 'open-above': this.openAbove(), 'align-right': this.fieldAlign !== Align.LEFT }}
          style={{ width: this.menuWidth }}
          ref={el => (this.listWrap = el)}
        >
          <zen-animate show={this.opened}>
            <div class="list" ref={el => (this.list = el)}>
              <slot name="options" />
            </div>
          </zen-animate>
        </div>
      </Host>
    );
  }
}
