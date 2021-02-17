import { Component, Host, h, Prop, State, Listen, Watch, Element, Method } from '@stencil/core';
import { getDefaultSlotContent, waitNextFrame, getComposedPath } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { OptionValue } from '../zen-menu-item/zen-option';
import { Align } from '../helpers/types';

export interface OptionItem {
  label: string;
}

/**
 * @slot [default] - Content for dropdown menu
 * @slot placeholder - Slot visible in field when nothing is selected
 * @event change | Called on any selection change
 */

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

  @Element() hostElement: HTMLZenDropdownElement;

  @State() opened = false;

  /** Name of element, can be used as reference for form data */
  @Prop() readonly name: string = '';
  /** Selected option */
  @Prop({ mutable: true }) value: OptionValue = undefined;
  /** Alignment of field content and menu (if menuWidth set). */
  @Prop() readonly fieldAlign: Align = 'left';
  /** Width of menu. Set '100%' to match field width. */
  @Prop() readonly menuWidth: string = '100%';
  /** To determine if there's enough space under field on open */
  @Prop() readonly menuHeight: number = 170;
  /** Close dropdown menu after selecting an item */
  @Prop() readonly closeOnSelect = true;
  /** Don't draw border around field */
  @Prop() readonly borderless = false;
  /** Text in field if nothing selected */
  @Prop() readonly placeholder: string = 'Select something';
  /** Disable any changes */
  @Prop() readonly disabled?: boolean = false;

  /** Close an opened dropdown menu */
  @Method()
  async toggle(open?: boolean): Promise<void> {
    if (open === this.opened) return;
    this.opened = open;
  }

  @Watch('opened')
  async openedChanged(opened: boolean): Promise<void> {
    if (opened) {
      if (!this.clickHandler) {
        this.clickHandler = event => this.closeOnClickOut(event);
      }
      setTimeout(() => {
        document.addEventListener('mousedown', this.clickHandler);
      }, 50);

      // Reset scroll:
      if (this.list) {
        await waitNextFrame();
        await waitNextFrame();
        this.list.scrollTop = 0;
      }

      this.markSelectedSlottedOption(this.value);

      this.appendOptionsOnClickHandlers();
    } else {
      document.removeEventListener('mousedown', this.clickHandler);
    }
  }

  @Watch('value')
  async valueChanged(): Promise<void> {
    this.cloneSelectedToField();
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    const toggleKeys = ['Space', 'Enter', 'ArrowUp', 'ArrowDown'];

    if (!this.opened && toggleKeys.includes(ev.key)) {
      this.toggleDropdown();
      ev.preventDefault();
      return;
    }

    switch (ev.key) {
      case 'ArrowDown':
        this.moveFocusedOption('forward');
        ev.preventDefault();
        break;

      case 'ArrowUp':
        this.moveFocusedOption('backward');
        ev.preventDefault();
        break;

      case 'Enter':
      case 'Space':
        const focused = this.getFocusedOption();
        if (focused) {
          this.selectValue(focused.getAttribute('value'));
        }
        ev.preventDefault();
        break;
    }
  }

  cloneSelectedToField(): void {
    // Clear previously copied item from slot[name=field]:
    if (!this.value) return;

    const slot = this.hostElement.shadowRoot.querySelector('slot[name=field-private]') as HTMLSlotElement;
    if (!slot) return;
    const existing = slot.assignedNodes ? (slot.assignedNodes()[0] as HTMLElement) : false;
    if (existing) {
      existing.parentNode.removeChild(existing);
    }
    // Clone selected item and append it to component's host element:
    // WHY NOT JUST APPENDING IT TO <div class="field">?
    // - Because .field is defined in our shadow dom and...
    // - zen-option is defined in host's dome, where it's styles are defined
    // if we would append it to .field directly it would be in shadow dom
    // and styles from host's dom can't style it
    const selected = this.getSelectedOptionElement();
    if (!selected) return;
    const copy = selected.cloneNode(true) as HTMLElement;
    copy.setAttribute('no-hover', 'true');
    copy.removeAttribute('focused');
    copy.removeAttribute('selected');
    this.hostElement.appendChild(copy);
    (copy as Element).slot = 'field-private';
    return;
  }

  getOptionValue(option: HTMLZenOptionElement): OptionValue {
    return option.getAttribute('value');
  }

  getSlottedOptionItems(): HTMLZenOptionElement[] | undefined[] {
    return Array.from(getDefaultSlotContent(this.hostElement))
      .filter(n => n.nodeName === 'ZEN-OPTION' && !n.getAttribute('disabled'))
      .map(n => n as HTMLZenOptionElement);
  }

  markSelectedSlottedOption(value: OptionValue): void {
    // Set attr `selected` to currently selected slotted item:
    const items = this.getSlottedOptionItems();
    if (!items.length) return;
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
    this.hostElement.dispatchEvent(new window.Event('change'));
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
    const path = getComposedPath(event);
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

  appendOptionsOnClickHandlers(): void {
    const items = this.getSlottedOptionItems();
    if (!items.length) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].getAttribute('data-click-mounted')) continue;
      items[i].setAttribute('data-click-mounted', 'true');
      items[i].addEventListener('click', () => {
        this.selectValue(this.getOptionValue(items[i]));
      });
    }
  }

  async connectedCallback(): Promise<void> {
    await waitNextFrame();
    await waitNextFrame();
    this.valueChanged();
  }

  render(): HTMLElement {
    return (
      <Host tabindex={this.disabled ? null : 0} ref={el => (this.div = el)}>
        <div
          class={{
            field: true,
            opened: this.opened,
            borderless: this.borderless,
            disabled: this.disabled,
          }}
          onMouseDown={() => {
            this.toggleDropdown(true);
          }}
        >
          <div class={{ hidden: !this.value }}>
            <slot name="field-private" />
          </div>
          <div class={{ hidden: !!this.value }}>
            <slot name="placeholder">
              <div class="placeholder">{this.placeholder}</div>
            </slot>
          </div>
          <div class="arrow">
            <zen-icon icon={faChevronDown}></zen-icon>
          </div>
        </div>
        <div
          class={{ 'list-wrap': true, 'open-above': this.openAbove(), 'align-right': this.fieldAlign !== 'left' }}
          style={{ width: this.menuWidth }}
          ref={el => (this.listWrap = el)}
        >
          <zen-animate show={this.opened}>
            <div class="list" ref={el => (this.list = el)}>
              <slot />
            </div>
          </zen-animate>
        </div>
      </Host>
    );
  }
}
