import { Component, Element, Host, h, Prop, Watch, Event, EventEmitter, State, Listen } from '@stencil/core';
import { Position, SpacingShorthand, Spacing } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-sidebar',
  styleUrl: 'zen-sidebar.scss',
  shadow: true,
})
export class ZenSidebar {
  private sidebar: HTMLElement = null;
  private wrap: HTMLElement = null;

  @Element() host: HTMLZenSidebarElement;

  @State() wrapStyle: { [key: string]: string } = { display: 'none' };

  @State() hover = false;

  /** Make sidebar fully expanded */
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

  @Watch('hover')
  async hoverChanged(): Promise<void> {
    this.toggle();
  }

  @Watch('expanded')
  async expandedChanged(): Promise<void> {
    this.toggle();
  }

  @Listen('mouseover')
  handleMouseOver(): void {
    this.hover = true;
  }

  @Listen('mouseout')
  handleMouseOut(): void {
    this.hover = false;
  }

  isVertical = (): boolean => ['left', 'right'].includes(this.position);

  toggle(animated = true): void {
    const getSidebarSize = (): number => {
      // note: we have to get width in px, because `width: auto` isn't animated
      const originalHostDisplay = this.wrap.style.display;
      this.wrap.style.display = 'block';

      const prop = this.isVertical() ? 'offsetWidth' : 'offsetHeight';
      const width = this.sidebar[prop];

      this.wrap.style.display = originalHostDisplay;
      return width;
    };

    const prop = this.isVertical() ? 'width' : 'height';
    const sidebarSize = getSidebarSize();
    // note: we have to get width in px, because `width: auto` isn't animated

    const duration = animated ? 'all 0.2s ease-out' : 'none';
    const expand = this.hover || this.expanded;

    this.wrapStyle = {
      [prop]: `${expand ? sidebarSize : this.collapsedSize}px`,
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
    const hostWidth = this.expanded ? 'auto' : `${this.collapsedSize}px`;
    const prop = this.isVertical() ? 'width' : 'height';

    return (
      <Host data-position={this.position} style={{ [prop]: hostWidth }}>
        <div ref={el => (this.wrap = el)} class="sidebar-wrap" style={this.wrapStyle}>
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
        </div>
      </Host>
    );
  }
}
