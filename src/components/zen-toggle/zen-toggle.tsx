import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'zen-toggle',
  styleUrl: 'zen-toggle.scss',
  shadow: true,
})
export class ZenToggle {
  @Element() hostElement: HTMLZenToggleElement;

  /** Set disabled state. */
  @Prop({ reflect: true }) readonly disabled = false;

  /** Set checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Sets if component can be tabbable/focusable. */
  @State() tabindex = 0;

  @Watch('checked')
  checkedChanged(): void {
    this.hostElement.dispatchEvent(new window.Event('change'));
  }

  @Watch('disabled')
  async disabledChanged(disabled: boolean): Promise<void> {
    this.tabindex = disabled ? -1 : 0;
  }

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (this.disabled) return;
    this.checked = !this.checked;
  };

  private onKeyDown = (ev: KeyboardEvent) => {
    ev.preventDefault();
    const toggleKeys = ['Space', 'Enter'];
    if (this.disabled || !toggleKeys.includes(ev.code)) return;
    this.checked = !this.checked;
  };

  componentWillLoad(): void {
    this.disabledChanged(this.disabled);
  }

  render(): HTMLElement {
    return (
      <Host onClick={this.onClick} onKeyDown={this.onKeyDown}>
        <span class={{ switch: true, checked: this.checked }} tabindex={this.tabindex}>
          <span class={{ slider: true, checked: this.checked }}></span>
        </span>
      </Host>
    );
  }
}
