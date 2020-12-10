import { Component, Host, h, Prop, State, Event, EventEmitter, Listen, Watch, Element, Method } from '@stencil/core';
import { key } from '../helpers/keyCodes';
import { MouseEvent } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { renderIcon, styles } from '../helpers/fa-icons';
import { get } from 'lodash';
import { waitNextFrame } from '../helpers/helpers';

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
  /** If true, multiple options can be selected */
  @Prop() readonly multiselect: boolean = false;
  /** To determine if there's enough space under field on open */
  @Prop() readonly menuHeight: number = 170;

  /** Emitted on any selection change */
  @Event() zenInput: EventEmitter<OptionValue>;
  /** Close an opened dropdown menu */
  @Method()
  async close(): Promise<void> {
    this.opened = false;
  }

  @Watch('value')
  valueChanged(value: OptionValue): void {
    this.selectedOption = value ? this.options.find(n => n[this.trackBy] === value) : undefined;
  }

  @Watch('focusedIndex')
  focusedIndexChanged(focusedIndex: OptionValue): void {
    if (!this.hasOptionsSlot) return;

    const optionsSlot = this.hostElement.shadowRoot.querySelector('slot[name=options]') as HTMLSlotElement;
    const list = optionsSlot.assignedNodes()[0] as HTMLElement;
    const items = list.querySelectorAll('zen-menu-item');
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
      document.addEventListener('mousedown', this.clickHandler);

      // Reset scroll:
      if (this.list) {
        await waitNextFrame();
        await waitNextFrame();
        this.list.scrollTop = 0;
      }
    } else {
      document.removeEventListener('mousedown', this.clickHandler);
    }
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
    this.value = option[this.trackBy];
    if (open) {
      this.focusedIndex = this.selectedIndex();
    }
    this.opened = false;
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
  closeOnClickOut(event: MouseEvent): void {
    const clickedInside = event.path.find(n => n === this.div);
    if (clickedInside) return;
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
    this.valueChanged(this.value);
    this.hasOptionsSlot = !!this.hostElement.querySelector('[slot="options"]');
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
          {get(this.selectedOption, 'label') || 'Select something'}
          <div class="arrow">{renderIcon(faChevronDown)}</div>
        </div>
        <div class={{ 'list-wrap': true, 'open-above': this.openAbove() }} ref={el => (this.listWrap = el)}>
          <zen-animate show={this.opened}>
            <div class="list" ref={el => (this.list = el)}>
              {!this.hasOptionsSlot ? (
                this.options.map((option, index) => (
                  <zen-menu-item
                    label={option.label}
                    focused={this.focusedIndex === index}
                    selected={option[this.trackBy] === this.value}
                    onClick={() => this.selectValue(option)}
                  />
                ))
              ) : (
                <slot name="options"></slot>
              )}
            </div>
          </zen-animate>
        </div>
      </Host>
    );
  }
}
