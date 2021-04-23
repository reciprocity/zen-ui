import { Component, Element, Host, h, Prop, Watch, Event, EventEmitter, State } from '@stencil/core';
import { Position, SpacingShorthand, Spacing } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-sidebar',
  styleUrl: 'zen-sidebar.scss',
  shadow: true,
})
export class ZenSidebar {
  private sidebar: HTMLElement = null;

  @Element() host: HTMLZenSidebarElement;

  @State() hostStyle: { [key: string]: string } = { display: 'none' };

  /** Is sidebar visible */
  @Prop({ reflect: true }) readonly expanded = true;

  /** Width/height of sidebar in collapsed state (in px) */
  @Prop() readonly collapsedSize: number = 48;

  /** Width of sidebar in maximized state (css prop).<br />Has no impact if position is top or bottom.<br />Can also be set to `auto`.  */
  @Prop() readonly width: string = '20rem';

  /** Position */
  @Prop({ reflect: true }) readonly position: Position = 'left';

  /** <Description generated in helper file> */
  @Prop() readonly padding: SpacingShorthand = 'lg';
  /** Skipped */
  @Prop() readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingLeft: Spacing = null;

  /** Inner sidebar hide button clicked */
  @Event() collapse: EventEmitter<void>;

  @Watch('expanded')
  async expandedChanged(): Promise<void> {
    this.toggle();
  }

  isVertical = (): boolean => ['left', 'right'].includes(this.position);

  toggle(animated = true): void {
    const getSidebarSize = (): number => {
      // note: we have to get width in px, because `width: auto` isn't animated
      const originalHostDisplay = this.host.style.display;
      this.host.style.display = 'block';

      const prop = this.isVertical() ? 'offsetWidth' : 'offsetHeight';
      const width = this.sidebar[prop];

      this.host.style.display = originalHostDisplay;
      return width;
    };

    const prop = this.isVertical() ? 'width' : 'height';
    const sidebarSize = getSidebarSize();
    // note: we have to get width in px, because `width: auto` isn't animated

    const duration = animated ? 'all 0.2s ease-out' : 'none';

    this.hostStyle = {
      [prop]: `${this.expanded ? sidebarSize : this.collapsedSize}px`,
      transition: duration,
    };
  }

  onCloseClicked(): void {
    this.collapse.emit();
  }

  componentDidLoad(): void {
    this.toggle(false);
  }

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);

    return (
      <Host data-position={this.position} style={this.hostStyle}>
        <ZenSpace
          class="sidebar"
          data-position={this.position}
          ref={el => (this.sidebar = el)}
          block
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
          style={this.isVertical() ? { width: this.width } : {}}
        >
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
