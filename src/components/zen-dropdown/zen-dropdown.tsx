import { Component, Host, h, Prop, State, Listen, Watch, Element, Method } from '@stencil/core';
import { getDefaultSlotContent, applyPrefix } from '../helpers/helpers';
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
  popover: HTMLZenPopoverElement = null;

  @Element() host: HTMLZenDropdownElement;

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
    if (open === undefined) {
      open = !this.popover.visible;
    }
    if (open === this.popover.visible) return;
    this.popover.visible = open;
    this.setFocusedOption();
  }

  @Watch('opened')
  async openedChanged(opened: boolean): Promise<void> {
    if (!opened) return;

    // Reset scroll:
    /* TODO: if (this.list) {
      await waitNextFrame();
      await waitNextFrame();
      this.list.scrollTop = 0;
    } */

    this.markSelectedSlottedOption(this.value);

    this.appendOptionsOnClickHandlers();
  }

  @Watch('value')
  async valueChanged(): Promise<void> {
    this.cloneSelectedToField();
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent): void {
    const getFocusedOption = (): HTMLZenOptionElement =>
      Array.from(this.getSlottedOptionItems()).filter(el => el.hasAttribute('focused'))[0];

    const toggleKeys = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];

    if (!this.popover.visible && toggleKeys.includes(ev.key)) {
      this.toggle();
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
      case ' ':
        const focused = getFocusedOption();
        if (focused) {
          this.selectValue(focused.getAttribute('value'));
        }
        ev.preventDefault();
        break;

      case 'Escape':
        this.popover.toggle(false);
        break;
    }
  }

  focusChanged(e: Event): void {
    const show = e.target === (this.hostElement as HTMLElement);
    this.popover.toggle(show);
  }

  cloneSelectedToField(): void {
    // Clear previously copied item from slot[name=field]:
    if (!this.value) return;

    const slot = this.host.shadowRoot.querySelector('slot[name=field-private]') as HTMLSlotElement;
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
    this.host.appendChild(copy);
    (copy as Element).slot = 'field-private';
  }

  getOptionValue(option: HTMLZenOptionElement): OptionValue {
    return option.getAttribute('value');
  }

  getSlottedOptionItems(): HTMLZenOptionElement[] | undefined[] {
    return Array.from(getDefaultSlotContent(this.host))
      .filter(n => n.nodeName === applyPrefix('zen-option', this.host).toUpperCase() && !n.getAttribute('disabled'))
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
      this.popover.visible = false;
    }
    this.host.dispatchEvent(new window.Event('change'));
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

  onOpenToggle(): void {
    this.opened = this.popover.visible;
  }

  componentDidLoad(): void {
    this.valueChanged();
    document.addEventListener('focusin', e => this.focusChanged(e));
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenPopover = applyPrefix('zen-popover', this.host);

    const offset = {
      x: 0,
      y: this.menuWidth === '100%' ? 0 : 3,
    };

    let align = 'bottom';
    switch (this.fieldAlign) {
      case 'left':
        align = 'bottom-start';
        break;
      case 'right':
        align = 'bottom-end';
        break;
    }

    return (
      <Host tabindex={this.disabled ? null : 0}>
        <div
          class={{
            field: true,
            opened: this.opened,
            borderless: this.borderless,
            disabled: this.disabled,
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
          <ZenIcon class="arrow" icon={faChevronDown}></ZenIcon>
        </div>
        <ZenPopover
          class="list"
          tabindex={this.opened ? 0 : -1}
          ref={el => (this.popover = el)}
          interactive
          position={align}
          onVisibleChange={() => this.onOpenToggle()}
          style={{ width: this.menuWidth }}
          offset={offset}
        >
          <slot />
        </ZenPopover>
      </Host>
    );
  }
}
