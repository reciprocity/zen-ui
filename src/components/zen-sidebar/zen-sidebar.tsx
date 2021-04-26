import { Component, Element, Host, h, Prop, Watch, Event, EventEmitter, State, Listen } from '@stencil/core';
import { Position, SpacingShorthand, Spacing } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';

/**
 * @slot wrapChildren - In case you want to place some absolute elements relative to sidebar wrap size (eg. close icon on zen-sidebar-nav)
 */

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
  @State() wrapPosition = 'absolute';

  @State() hover = false;

  /** Make sidebar fully expanded */
  @Prop({ reflect: true }) readonly expanded: boolean = true;

  /** Width/height of sidebar in collapsed state (in px) */
  @Prop() readonly collapsedSize: number = 48;

  /** Width of sidebar in maximized state (css prop).<br />Has no impact if position is top or bottom.<br />Can also be set to `auto`.  */
  @Prop() readonly width: string = '20rem';

  /** Position */
  @Prop({ reflect: true }) readonly position: Position = 'left';

  /** Temporary expand sidebar on mouse over.<br>To prevent this behavior for only some child elements, add class `hover-ignore` to such child. */
  @Prop() readonly expandOnHover: boolean = true;

  /** <Description generated in helper file> */
  @Prop() readonly padding: SpacingShorthand = 'none';
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
    if (!this.expanded) {
      this.hover = false;
    }
    this.wrapPosition = this.expanded ? 'relative' : 'absolute';
  }

  @Listen('mousemove')
  handleMouseOver(event: MouseEvent): void {
    if (!this.expandOnHover || this.expanded || this.hover) return;
    // todo: tried to add prop `@prop() ignoreOnHover: HtmlElement[]`, but it was
    //       always empty no matter of how I've set it from zen-sidebar-nav...
    if ((event.target as HTMLElement).classList.contains('hover-ignore')) return;
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
    this.wrapPosition = this.expanded ? 'relative' : 'absolute';
  }

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const hostWidth = this.expanded ? 'auto' : `${this.collapsedSize}px`;
    const prop = this.isVertical() ? 'width' : 'height';

    return (
      <Host style={{ [prop]: hostWidth }}>
        <div
          ref={el => (this.wrap = el)}
          class="sidebar-wrap"
          style={{ ...this.wrapStyle, position: this.wrapPosition }}
        >
          <ZenSpace
            class="sidebar"
            ref={el => (this.sidebar = el)}
            vertical
            vertical-align="start"
            padding={this.padding}
            padding-top={this.paddingTop}
            padding-right={this.paddingRight}
            padding-bottom={this.paddingBottom}
            padding-left={this.paddingLeft}
            style={this.isVertical() ? { width: this.width } : {}}
          >
            <slot></slot>
          </ZenSpace>
          <slot name="wrapChildren"></slot>
        </div>
      </Host>
    );
  }
}
