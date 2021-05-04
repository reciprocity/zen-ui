import { Component, Element, Host, h, Prop, Watch, Event, EventEmitter, State } from '@stencil/core';
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

  /** Make sidebar fully expanded */
  @Prop({ reflect: true }) readonly expanded: boolean = true;

  /** Width/height of sidebar in collapsed state (in px) */
  @Prop() readonly collapsedSize: number = 48;

  /** Width of sidebar in maximized state (css prop).<br />Has no impact if position is top or bottom.<br />Can also be set to `auto`.  */
  @Prop() readonly width: string = '13.5rem';

  /** Position */
  @Prop({ reflect: true }) readonly position: Position = 'left';

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
  @Event() zenCollapse: EventEmitter<void>;

  /** On sidebar collapse/expand */
  @Event() zenToggle: EventEmitter<{ expanded: boolean }>;

  @Watch('expanded')
  async expandedChanged(): Promise<void> {
    this.toggleSidebar();
    this.wrapPosition = this.expanded ? 'relative' : 'absolute';
  }

  isVertical = (): boolean => ['left', 'right'].includes(this.position);

  toggleSidebar(animated = true, triggerEvent = true): void {
    const [sizeProp, offsetProp] = this.isVertical() ? ['width', 'offsetWidth'] : ['height', 'offsetHeight'];

    // note: we have to get width in px, because `width: auto` isn't animated
    const originalHostDisplay = this.wrap.style.display;
    this.wrap.style.display = 'block';

    const sidebarSize = this.sidebar[offsetProp];
    this.wrap.style.display = originalHostDisplay;

    const duration = animated ? 'all 0.2s ease-out' : 'none';
    const expand = this.expanded;

    this.wrapStyle = {
      [sizeProp]: `${expand ? sidebarSize : this.collapsedSize}px`,
      transition: duration,
    };

    if (triggerEvent) this.zenToggle.emit({ expanded: expand });
  }

  onCloseClicked(): void {
    this.zenCollapse.emit();
  }

  componentDidLoad(): void {
    this.toggleSidebar(false, false);
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
            no-wrap
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
