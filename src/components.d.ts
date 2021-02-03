/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { StringifiedJson } from "./stories/components/color-swatch-group/color-swatch-group";
import { Align, Avatar, AvatarData, AvatarIconSize, Duration, IconSizes, None, NotificationVariant, Position, Size, TextSize, TextVariant, TooltipVariant } from "./components/helpers/types";
import { ButtonVariants } from "./components/zen-button/types";
import { OptionValue } from "./components/zen-menu-item/zen-option";
import { IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { OptionValue as OptionValue1 } from "./components/zen-menu-item/zen-option";
import { StepItem } from "./components/zen-progress-tracker/zen-progress-tracker";
import { StepsFilter } from "./components/zen-progress-tracker/types";
import { TabItem, TabValue } from "./components/zen-tabs/zen-tabs";
export namespace Components {
    interface ColorSwatch {
        /**
          * Hex color value
         */
        "color": string;
        /**
          * True if color is considered bright
         */
        "isBrightColor": boolean;
        /**
          * Scss variable name
         */
        "varName": string;
    }
    interface ColorSwatchGroup {
        /**
          * Array of colors
         */
        "colors": StringifiedJson;
    }
    interface DocsTable {
        /**
          * Data from stencilDocs.json
         */
        "docs": string;
    }
    interface HtmlPlayground {
        /**
          * Save current value to local storage and restore it on load
         */
        "saveValue": true;
        /**
          * What framework is initally selected
         */
        "selectedFramework": string;
        /**
          * What framework is initally selected
         */
        "sourceCodes": SourceCodes;
    }
    interface TextWithDetails {
    }
    interface ZenAnimate {
        /**
          * Prop that will show the slot
         */
        "show": boolean;
    }
    interface ZenAvatar {
        /**
          * Show icon animation
         */
        "animation": boolean;
        /**
          * Users
         */
        "users": AvatarData[];
    }
    interface ZenAvatarGroup {
        /**
          * Max number of users to display
         */
        "displayMax": number;
        /**
          * Array of user's data
         */
        "users": Avatar[];
    }
    interface ZenAvatarIcon {
        /**
          * Background color
         */
        "background": string;
        /**
          * Font color
         */
        "color": string;
        /**
          * Email
         */
        "email": string;
        /**
          * Image URL
         */
        "imageUrl": string;
        /**
          * Icon size
         */
        "size": AvatarIconSize;
        /**
          * Name and Surname
         */
        "userName": string;
    }
    interface ZenBreadcrumbs {
        /**
          * The separator string
         */
        "separator": string;
    }
    interface ZenButton {
        /**
          * If present, button will be disabled
         */
        "disabled"?: boolean;
        /**
          * If present, will show a spinner
         */
        "loading"?: boolean;
        /**
          * Color variant of the button
         */
        "variant": ButtonVariants;
    }
    interface ZenCard {
        /**
          * Disables card.
         */
        "disabled": false;
    }
    interface ZenCheckbox {
        /**
          * Set checked state.
         */
        "checked": boolean;
        /**
          * Disables checkbox.
         */
        "disabled": false;
        /**
          * Label of the checkbox.
         */
        "label": string;
        /**
          * Shows a red asterisk after label.
         */
        "required": false;
    }
    interface ZenDivider {
    }
    interface ZenDropdown {
        /**
          * Don't draw border around field
         */
        "borderless": false;
        /**
          * Close dropdown menu after selecting an item
         */
        "closeOnSelect": true;
        /**
          * Disable any changes
         */
        "disabled"?: boolean;
        /**
          * Alignment of field content and menu (if menuWidth set).
         */
        "fieldAlign": Align;
        /**
          * To determine if there's enough space under field on open
         */
        "menuHeight": number;
        /**
          * Width of menu. Set '100%' to match field width.
         */
        "menuWidth": string;
        /**
          * Text in field if nothing selected
         */
        "placeholder": string;
        /**
          * Close an opened dropdown menu
         */
        "toggle": (open?: boolean) => Promise<void>;
        /**
          * Selected option
         */
        "value": OptionValue;
    }
    interface ZenFormGroup {
    }
    interface ZenIcon {
        /**
          * Icon data (js file) imported from Font Awesome SVG package.
         */
        "icon": IconDefinition;
        /**
          * Size of the icon.
         */
        "size": IconSizes;
    }
    interface ZenInput {
        /**
          * Disables input.
         */
        "disabled": false;
        /**
          * Focus next control when pressing Enter key
         */
        "enterToTab": true;
        /**
          * Paint focused border
         */
        "hasFocus": boolean;
        /**
          * Shows invalid styles.
         */
        "invalid": false;
        /**
          * Placeholder of the input.
         */
        "placeholder": string;
        /**
          * The value of the input.
         */
        "value"?: string;
    }
    interface ZenModal {
        /**
          * Hide default top-right X and default Cancel button
         */
        "hideCancel": boolean;
        /**
          * Modal title (irrelevant if slot `header` passed)
         */
        "label": string;
        /**
          * Set `true` to show and `false` to hide modal
         */
        "show": false;
    }
    interface ZenNotification {
        /**
          * Can dismiss
         */
        "dismiss": boolean;
        /**
          * Hide duration
         */
        "dismissDuration": Duration;
        /**
          * Title
         */
        "heading": string;
        /**
          * Message
         */
        "message": string;
        /**
          * Variant
         */
        "variant": NotificationVariant;
    }
    interface ZenOption {
        /**
          * False to enable custom item padding
         */
        "defaultPadding": boolean;
        /**
          * Disable selecting option in dropdown
         */
        "disabled"?: boolean;
        /**
          * Render item as focused
         */
        "focused": boolean;
        /**
          * Prevents default hover style on mouse hover
         */
        "noHover"?: boolean;
        /**
          * Render item as selected
         */
        "selected": boolean;
        /**
          * Value of option when used inside a dropdown
         */
        "value": OptionValue;
    }
    interface ZenProgressTracker {
        /**
          * Index of currently active step
         */
        "activeIndex": number;
        /**
          * User can click step to go to step
         */
        "clickable": StepsFilter;
        /**
          * Ordered array of possible steps
         */
        "steps": Array<StepItem>;
    }
    interface ZenRadio {
    }
    interface ZenSpace {
        /**
          * Horizontal align of items
         */
        "horizontalAlign": FlexAlign;
        /**
          * Break row/column if content doesn't fit
         */
        "noWrap": boolean;
        /**
          * Inner spacing of container
         */
        "padding": Size | None | string;
        /**
          * Spacing between items
         */
        "spacing": Size | None;
        /**
          * Is it row or column?
         */
        "vertical": boolean;
        /**
          * Vertical align of items
         */
        "verticalAlign": FlexAlign;
    }
    interface ZenSpinner {
    }
    interface ZenTable {
    }
    interface ZenTableCell {
    }
    interface ZenTableHeader {
        /**
          * Remains fixed at the top of the table during vertical scrolling
         */
        "sticky": false;
    }
    interface ZenTableHeaderCell {
        /**
          * Remains fixed at the top of the table during vertical scrolling
         */
        "sticky": false;
    }
    interface ZenTableRow {
    }
    interface ZenTabs {
        /**
          * Index of currently selected tab.
         */
        "tabs": TabItem[];
        /**
          * Index of currently selected tab.
         */
        "value": TabValue;
    }
    interface ZenText {
        /**
          * Align content to left, right, center (text-align)
         */
        "align": Align;
        /**
          * Render bold text
         */
        "bold": boolean;
        /**
          * Disabled
         */
        "disabled": boolean;
        /**
          * Layout as inlined
         */
        "inline": boolean;
        /**
          * Render italic text
         */
        "italic": boolean;
        /**
          * Convert casing to lowercase
         */
        "lowercase": boolean;
        /**
          * Show text as gray. Useful for disabled things
         */
        "pale": boolean;
        /**
          * Shows a red asterisk at the end
         */
        "required": false;
        /**
          * Font size
         */
        "size": TextSize;
        /**
          * Strikethrough
         */
        "strikethrough": boolean;
        /**
          * Truncate
         */
        "truncate": boolean;
        /**
          * Underlined
         */
        "underline": boolean;
        /**
          * Convert casing to uppercase
         */
        "uppercase": boolean;
        /**
          * Apply heading styles
         */
        "variant": TextVariant;
    }
    interface ZenTextarea {
        /**
          * Appends attribute disabled.
         */
        "disabled": false;
        /**
          * Placeholder of the textarea.
         */
        "placeholder": string;
        /**
          * Appends attribute required.
         */
        "required": false;
        /**
          * Prefilled text content
         */
        "text"?: string | null;
    }
    interface ZenToggle {
        /**
          * Set checked state.
         */
        "checked": boolean;
        /**
          * Set disabled state.
         */
        "disabled": false;
    }
    interface ZenTooltip {
        /**
          * Dont hide tooltip
         */
        "alwaysVisible"?: boolean;
        /**
          * Pointing arrow - like a cartoon balloon
         */
        "hasArrow"?: boolean;
        /**
          * Delay between mouse out and tooltip hide (in ms)
         */
        "hideDelay": number;
        /**
          * Set tooltip label
         */
        "label"?: string;
        /**
          * Limit tooltip's height and make content scroll
         */
        "maxHeight": string;
        /**
          * Set tooltip offset to target element
         */
        "offset"?: number;
        /**
          * Set tooltip position
         */
        "position"?: Position;
        /**
          * Delay between mouse enter and tooltip show (in ms)
         */
        "showDelay": number;
        /**
          * Set tooltip variant
         */
        "variant"?: TooltipVariant;
    }
}
declare global {
    interface HTMLColorSwatchElement extends Components.ColorSwatch, HTMLStencilElement {
    }
    var HTMLColorSwatchElement: {
        prototype: HTMLColorSwatchElement;
        new (): HTMLColorSwatchElement;
    };
    interface HTMLColorSwatchGroupElement extends Components.ColorSwatchGroup, HTMLStencilElement {
    }
    var HTMLColorSwatchGroupElement: {
        prototype: HTMLColorSwatchGroupElement;
        new (): HTMLColorSwatchGroupElement;
    };
    interface HTMLDocsTableElement extends Components.DocsTable, HTMLStencilElement {
    }
    var HTMLDocsTableElement: {
        prototype: HTMLDocsTableElement;
        new (): HTMLDocsTableElement;
    };
    interface HTMLHtmlPlaygroundElement extends Components.HtmlPlayground, HTMLStencilElement {
    }
    var HTMLHtmlPlaygroundElement: {
        prototype: HTMLHtmlPlaygroundElement;
        new (): HTMLHtmlPlaygroundElement;
    };
    interface HTMLTextWithDetailsElement extends Components.TextWithDetails, HTMLStencilElement {
    }
    var HTMLTextWithDetailsElement: {
        prototype: HTMLTextWithDetailsElement;
        new (): HTMLTextWithDetailsElement;
    };
    interface HTMLZenAnimateElement extends Components.ZenAnimate, HTMLStencilElement {
    }
    var HTMLZenAnimateElement: {
        prototype: HTMLZenAnimateElement;
        new (): HTMLZenAnimateElement;
    };
    interface HTMLZenAvatarElement extends Components.ZenAvatar, HTMLStencilElement {
    }
    var HTMLZenAvatarElement: {
        prototype: HTMLZenAvatarElement;
        new (): HTMLZenAvatarElement;
    };
    interface HTMLZenAvatarGroupElement extends Components.ZenAvatarGroup, HTMLStencilElement {
    }
    var HTMLZenAvatarGroupElement: {
        prototype: HTMLZenAvatarGroupElement;
        new (): HTMLZenAvatarGroupElement;
    };
    interface HTMLZenAvatarIconElement extends Components.ZenAvatarIcon, HTMLStencilElement {
    }
    var HTMLZenAvatarIconElement: {
        prototype: HTMLZenAvatarIconElement;
        new (): HTMLZenAvatarIconElement;
    };
    interface HTMLZenBreadcrumbsElement extends Components.ZenBreadcrumbs, HTMLStencilElement {
    }
    var HTMLZenBreadcrumbsElement: {
        prototype: HTMLZenBreadcrumbsElement;
        new (): HTMLZenBreadcrumbsElement;
    };
    interface HTMLZenButtonElement extends Components.ZenButton, HTMLStencilElement {
    }
    var HTMLZenButtonElement: {
        prototype: HTMLZenButtonElement;
        new (): HTMLZenButtonElement;
    };
    interface HTMLZenCardElement extends Components.ZenCard, HTMLStencilElement {
    }
    var HTMLZenCardElement: {
        prototype: HTMLZenCardElement;
        new (): HTMLZenCardElement;
    };
    interface HTMLZenCheckboxElement extends Components.ZenCheckbox, HTMLStencilElement {
    }
    var HTMLZenCheckboxElement: {
        prototype: HTMLZenCheckboxElement;
        new (): HTMLZenCheckboxElement;
    };
    interface HTMLZenDividerElement extends Components.ZenDivider, HTMLStencilElement {
    }
    var HTMLZenDividerElement: {
        prototype: HTMLZenDividerElement;
        new (): HTMLZenDividerElement;
    };
    interface HTMLZenDropdownElement extends Components.ZenDropdown, HTMLStencilElement {
    }
    var HTMLZenDropdownElement: {
        prototype: HTMLZenDropdownElement;
        new (): HTMLZenDropdownElement;
    };
    interface HTMLZenFormGroupElement extends Components.ZenFormGroup, HTMLStencilElement {
    }
    var HTMLZenFormGroupElement: {
        prototype: HTMLZenFormGroupElement;
        new (): HTMLZenFormGroupElement;
    };
    interface HTMLZenIconElement extends Components.ZenIcon, HTMLStencilElement {
    }
    var HTMLZenIconElement: {
        prototype: HTMLZenIconElement;
        new (): HTMLZenIconElement;
    };
    interface HTMLZenInputElement extends Components.ZenInput, HTMLStencilElement {
    }
    var HTMLZenInputElement: {
        prototype: HTMLZenInputElement;
        new (): HTMLZenInputElement;
    };
    interface HTMLZenModalElement extends Components.ZenModal, HTMLStencilElement {
    }
    var HTMLZenModalElement: {
        prototype: HTMLZenModalElement;
        new (): HTMLZenModalElement;
    };
    interface HTMLZenNotificationElement extends Components.ZenNotification, HTMLStencilElement {
    }
    var HTMLZenNotificationElement: {
        prototype: HTMLZenNotificationElement;
        new (): HTMLZenNotificationElement;
    };
    interface HTMLZenOptionElement extends Components.ZenOption, HTMLStencilElement {
    }
    var HTMLZenOptionElement: {
        prototype: HTMLZenOptionElement;
        new (): HTMLZenOptionElement;
    };
    interface HTMLZenProgressTrackerElement extends Components.ZenProgressTracker, HTMLStencilElement {
    }
    var HTMLZenProgressTrackerElement: {
        prototype: HTMLZenProgressTrackerElement;
        new (): HTMLZenProgressTrackerElement;
    };
    interface HTMLZenRadioElement extends Components.ZenRadio, HTMLStencilElement {
    }
    var HTMLZenRadioElement: {
        prototype: HTMLZenRadioElement;
        new (): HTMLZenRadioElement;
    };
    interface HTMLZenSpaceElement extends Components.ZenSpace, HTMLStencilElement {
    }
    var HTMLZenSpaceElement: {
        prototype: HTMLZenSpaceElement;
        new (): HTMLZenSpaceElement;
    };
    interface HTMLZenSpinnerElement extends Components.ZenSpinner, HTMLStencilElement {
    }
    var HTMLZenSpinnerElement: {
        prototype: HTMLZenSpinnerElement;
        new (): HTMLZenSpinnerElement;
    };
    interface HTMLZenTableElement extends Components.ZenTable, HTMLStencilElement {
    }
    var HTMLZenTableElement: {
        prototype: HTMLZenTableElement;
        new (): HTMLZenTableElement;
    };
    interface HTMLZenTableCellElement extends Components.ZenTableCell, HTMLStencilElement {
    }
    var HTMLZenTableCellElement: {
        prototype: HTMLZenTableCellElement;
        new (): HTMLZenTableCellElement;
    };
    interface HTMLZenTableHeaderElement extends Components.ZenTableHeader, HTMLStencilElement {
    }
    var HTMLZenTableHeaderElement: {
        prototype: HTMLZenTableHeaderElement;
        new (): HTMLZenTableHeaderElement;
    };
    interface HTMLZenTableHeaderCellElement extends Components.ZenTableHeaderCell, HTMLStencilElement {
    }
    var HTMLZenTableHeaderCellElement: {
        prototype: HTMLZenTableHeaderCellElement;
        new (): HTMLZenTableHeaderCellElement;
    };
    interface HTMLZenTableRowElement extends Components.ZenTableRow, HTMLStencilElement {
    }
    var HTMLZenTableRowElement: {
        prototype: HTMLZenTableRowElement;
        new (): HTMLZenTableRowElement;
    };
    interface HTMLZenTabsElement extends Components.ZenTabs, HTMLStencilElement {
    }
    var HTMLZenTabsElement: {
        prototype: HTMLZenTabsElement;
        new (): HTMLZenTabsElement;
    };
    interface HTMLZenTextElement extends Components.ZenText, HTMLStencilElement {
    }
    var HTMLZenTextElement: {
        prototype: HTMLZenTextElement;
        new (): HTMLZenTextElement;
    };
    interface HTMLZenTextareaElement extends Components.ZenTextarea, HTMLStencilElement {
    }
    var HTMLZenTextareaElement: {
        prototype: HTMLZenTextareaElement;
        new (): HTMLZenTextareaElement;
    };
    interface HTMLZenToggleElement extends Components.ZenToggle, HTMLStencilElement {
    }
    var HTMLZenToggleElement: {
        prototype: HTMLZenToggleElement;
        new (): HTMLZenToggleElement;
    };
    interface HTMLZenTooltipElement extends Components.ZenTooltip, HTMLStencilElement {
    }
    var HTMLZenTooltipElement: {
        prototype: HTMLZenTooltipElement;
        new (): HTMLZenTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "color-swatch": HTMLColorSwatchElement;
        "color-swatch-group": HTMLColorSwatchGroupElement;
        "docs-table": HTMLDocsTableElement;
        "html-playground": HTMLHtmlPlaygroundElement;
        "text-with-details": HTMLTextWithDetailsElement;
        "zen-animate": HTMLZenAnimateElement;
        "zen-avatar": HTMLZenAvatarElement;
        "zen-avatar-group": HTMLZenAvatarGroupElement;
        "zen-avatar-icon": HTMLZenAvatarIconElement;
        "zen-breadcrumbs": HTMLZenBreadcrumbsElement;
        "zen-button": HTMLZenButtonElement;
        "zen-card": HTMLZenCardElement;
        "zen-checkbox": HTMLZenCheckboxElement;
        "zen-divider": HTMLZenDividerElement;
        "zen-dropdown": HTMLZenDropdownElement;
        "zen-form-group": HTMLZenFormGroupElement;
        "zen-icon": HTMLZenIconElement;
        "zen-input": HTMLZenInputElement;
        "zen-modal": HTMLZenModalElement;
        "zen-notification": HTMLZenNotificationElement;
        "zen-option": HTMLZenOptionElement;
        "zen-progress-tracker": HTMLZenProgressTrackerElement;
        "zen-radio": HTMLZenRadioElement;
        "zen-space": HTMLZenSpaceElement;
        "zen-spinner": HTMLZenSpinnerElement;
        "zen-table": HTMLZenTableElement;
        "zen-table-cell": HTMLZenTableCellElement;
        "zen-table-header": HTMLZenTableHeaderElement;
        "zen-table-header-cell": HTMLZenTableHeaderCellElement;
        "zen-table-row": HTMLZenTableRowElement;
        "zen-tabs": HTMLZenTabsElement;
        "zen-text": HTMLZenTextElement;
        "zen-textarea": HTMLZenTextareaElement;
        "zen-toggle": HTMLZenToggleElement;
        "zen-tooltip": HTMLZenTooltipElement;
    }
}
declare namespace LocalJSX {
    interface ColorSwatch {
        /**
          * Hex color value
         */
        "color"?: string;
        /**
          * True if color is considered bright
         */
        "isBrightColor"?: boolean;
        /**
          * Scss variable name
         */
        "varName"?: string;
    }
    interface ColorSwatchGroup {
        /**
          * Array of colors
         */
        "colors"?: StringifiedJson;
    }
    interface DocsTable {
        /**
          * Data from stencilDocs.json
         */
        "docs"?: string;
    }
    interface HtmlPlayground {
        /**
          * Save current value to local storage and restore it on load
         */
        "saveValue"?: true;
        /**
          * What framework is initally selected
         */
        "selectedFramework"?: string;
        /**
          * What framework is initally selected
         */
        "sourceCodes"?: SourceCodes;
    }
    interface TextWithDetails {
    }
    interface ZenAnimate {
        /**
          * Prop that will show the slot
         */
        "show"?: boolean;
    }
    interface ZenAvatar {
        /**
          * Show icon animation
         */
        "animation"?: boolean;
        /**
          * Users
         */
        "users"?: AvatarData[];
    }
    interface ZenAvatarGroup {
        /**
          * Max number of users to display
         */
        "displayMax"?: number;
        /**
          * Array of user's data
         */
        "users"?: Avatar[];
    }
    interface ZenAvatarIcon {
        /**
          * Background color
         */
        "background"?: string;
        /**
          * Font color
         */
        "color"?: string;
        /**
          * Email
         */
        "email"?: string;
        /**
          * Image URL
         */
        "imageUrl"?: string;
        /**
          * Icon size
         */
        "size"?: AvatarIconSize;
        /**
          * Name and Surname
         */
        "userName"?: string;
    }
    interface ZenBreadcrumbs {
        /**
          * The separator string
         */
        "separator"?: string;
    }
    interface ZenButton {
        /**
          * If present, button will be disabled
         */
        "disabled"?: boolean;
        /**
          * If present, will show a spinner
         */
        "loading"?: boolean;
        /**
          * Color variant of the button
         */
        "variant"?: ButtonVariants;
    }
    interface ZenCard {
        /**
          * Disables card.
         */
        "disabled"?: false;
    }
    interface ZenCheckbox {
        /**
          * Set checked state.
         */
        "checked"?: boolean;
        /**
          * Disables checkbox.
         */
        "disabled"?: false;
        /**
          * Label of the checkbox.
         */
        "label"?: string;
        /**
          * Shows a red asterisk after label.
         */
        "required"?: false;
    }
    interface ZenDivider {
    }
    interface ZenDropdown {
        /**
          * Don't draw border around field
         */
        "borderless"?: false;
        /**
          * Close dropdown menu after selecting an item
         */
        "closeOnSelect"?: true;
        /**
          * Disable any changes
         */
        "disabled"?: boolean;
        /**
          * Alignment of field content and menu (if menuWidth set).
         */
        "fieldAlign"?: Align;
        /**
          * To determine if there's enough space under field on open
         */
        "menuHeight"?: number;
        /**
          * Width of menu. Set '100%' to match field width.
         */
        "menuWidth"?: string;
        /**
          * Text in field if nothing selected
         */
        "placeholder"?: string;
        /**
          * Selected option
         */
        "value"?: OptionValue;
    }
    interface ZenFormGroup {
    }
    interface ZenIcon {
        /**
          * Icon data (js file) imported from Font Awesome SVG package.
         */
        "icon"?: IconDefinition;
        /**
          * Size of the icon.
         */
        "size"?: IconSizes;
    }
    interface ZenInput {
        /**
          * Disables input.
         */
        "disabled"?: false;
        /**
          * Focus next control when pressing Enter key
         */
        "enterToTab"?: true;
        /**
          * Paint focused border
         */
        "hasFocus"?: boolean;
        /**
          * Shows invalid styles.
         */
        "invalid"?: false;
        /**
          * Placeholder of the input.
         */
        "placeholder"?: string;
        /**
          * The value of the input.
         */
        "value"?: string;
    }
    interface ZenModal {
        /**
          * Hide default top-right X and default Cancel button
         */
        "hideCancel"?: boolean;
        /**
          * Modal title (irrelevant if slot `header` passed)
         */
        "label"?: string;
        /**
          * Top-right X button or default Cancel button clicked
         */
        "onCancel"?: (event: CustomEvent<void>) => void;
        /**
          * Default Ok button clicked (irrelevant if slot `buttons` passed)
         */
        "onOk"?: (event: CustomEvent<void>) => void;
        /**
          * Set `true` to show and `false` to hide modal
         */
        "show"?: false;
    }
    interface ZenNotification {
        /**
          * Can dismiss
         */
        "dismiss"?: boolean;
        /**
          * Hide duration
         */
        "dismissDuration"?: Duration;
        /**
          * Title
         */
        "heading"?: string;
        /**
          * Message
         */
        "message"?: string;
        /**
          * Variant
         */
        "variant"?: NotificationVariant;
    }
    interface ZenOption {
        /**
          * False to enable custom item padding
         */
        "defaultPadding"?: boolean;
        /**
          * Disable selecting option in dropdown
         */
        "disabled"?: boolean;
        /**
          * Render item as focused
         */
        "focused"?: boolean;
        /**
          * Prevents default hover style on mouse hover
         */
        "noHover"?: boolean;
        /**
          * Render item as selected
         */
        "selected"?: boolean;
        /**
          * Value of option when used inside a dropdown
         */
        "value"?: OptionValue;
    }
    interface ZenProgressTracker {
        /**
          * Index of currently active step
         */
        "activeIndex"?: number;
        /**
          * User can click step to go to step
         */
        "clickable"?: StepsFilter;
        /**
          * Ordered array of possible steps
         */
        "steps"?: Array<StepItem>;
    }
    interface ZenRadio {
    }
    interface ZenSpace {
        /**
          * Horizontal align of items
         */
        "horizontalAlign"?: FlexAlign;
        /**
          * Break row/column if content doesn't fit
         */
        "noWrap"?: boolean;
        /**
          * Inner spacing of container
         */
        "padding"?: Size | None | string;
        /**
          * Spacing between items
         */
        "spacing"?: Size | None;
        /**
          * Is it row or column?
         */
        "vertical"?: boolean;
        /**
          * Vertical align of items
         */
        "verticalAlign"?: FlexAlign;
    }
    interface ZenSpinner {
    }
    interface ZenTable {
    }
    interface ZenTableCell {
    }
    interface ZenTableHeader {
        /**
          * Remains fixed at the top of the table during vertical scrolling
         */
        "sticky"?: false;
    }
    interface ZenTableHeaderCell {
        /**
          * Remains fixed at the top of the table during vertical scrolling
         */
        "sticky"?: false;
    }
    interface ZenTableRow {
    }
    interface ZenTabs {
        /**
          * Index of currently selected tab.
         */
        "tabs"?: TabItem[];
        /**
          * Index of currently selected tab.
         */
        "value"?: TabValue;
    }
    interface ZenText {
        /**
          * Align content to left, right, center (text-align)
         */
        "align"?: Align;
        /**
          * Render bold text
         */
        "bold"?: boolean;
        /**
          * Disabled
         */
        "disabled"?: boolean;
        /**
          * Layout as inlined
         */
        "inline"?: boolean;
        /**
          * Render italic text
         */
        "italic"?: boolean;
        /**
          * Convert casing to lowercase
         */
        "lowercase"?: boolean;
        /**
          * Show text as gray. Useful for disabled things
         */
        "pale"?: boolean;
        /**
          * Shows a red asterisk at the end
         */
        "required"?: false;
        /**
          * Font size
         */
        "size"?: TextSize;
        /**
          * Strikethrough
         */
        "strikethrough"?: boolean;
        /**
          * Truncate
         */
        "truncate"?: boolean;
        /**
          * Underlined
         */
        "underline"?: boolean;
        /**
          * Convert casing to uppercase
         */
        "uppercase"?: boolean;
        /**
          * Apply heading styles
         */
        "variant"?: TextVariant;
    }
    interface ZenTextarea {
        /**
          * Appends attribute disabled.
         */
        "disabled"?: false;
        /**
          * Placeholder of the textarea.
         */
        "placeholder"?: string;
        /**
          * Appends attribute required.
         */
        "required"?: false;
        /**
          * Prefilled text content
         */
        "text"?: string | null;
    }
    interface ZenToggle {
        /**
          * Set checked state.
         */
        "checked"?: boolean;
        /**
          * Set disabled state.
         */
        "disabled"?: false;
    }
    interface ZenTooltip {
        /**
          * Dont hide tooltip
         */
        "alwaysVisible"?: boolean;
        /**
          * Pointing arrow - like a cartoon balloon
         */
        "hasArrow"?: boolean;
        /**
          * Delay between mouse out and tooltip hide (in ms)
         */
        "hideDelay"?: number;
        /**
          * Set tooltip label
         */
        "label"?: string;
        /**
          * Limit tooltip's height and make content scroll
         */
        "maxHeight"?: string;
        /**
          * Set tooltip offset to target element
         */
        "offset"?: number;
        /**
          * Set tooltip position
         */
        "position"?: Position;
        /**
          * Delay between mouse enter and tooltip show (in ms)
         */
        "showDelay"?: number;
        /**
          * Set tooltip variant
         */
        "variant"?: TooltipVariant;
    }
    interface IntrinsicElements {
        "color-swatch": ColorSwatch;
        "color-swatch-group": ColorSwatchGroup;
        "docs-table": DocsTable;
        "html-playground": HtmlPlayground;
        "text-with-details": TextWithDetails;
        "zen-animate": ZenAnimate;
        "zen-avatar": ZenAvatar;
        "zen-avatar-group": ZenAvatarGroup;
        "zen-avatar-icon": ZenAvatarIcon;
        "zen-breadcrumbs": ZenBreadcrumbs;
        "zen-button": ZenButton;
        "zen-card": ZenCard;
        "zen-checkbox": ZenCheckbox;
        "zen-divider": ZenDivider;
        "zen-dropdown": ZenDropdown;
        "zen-form-group": ZenFormGroup;
        "zen-icon": ZenIcon;
        "zen-input": ZenInput;
        "zen-modal": ZenModal;
        "zen-notification": ZenNotification;
        "zen-option": ZenOption;
        "zen-progress-tracker": ZenProgressTracker;
        "zen-radio": ZenRadio;
        "zen-space": ZenSpace;
        "zen-spinner": ZenSpinner;
        "zen-table": ZenTable;
        "zen-table-cell": ZenTableCell;
        "zen-table-header": ZenTableHeader;
        "zen-table-header-cell": ZenTableHeaderCell;
        "zen-table-row": ZenTableRow;
        "zen-tabs": ZenTabs;
        "zen-text": ZenText;
        "zen-textarea": ZenTextarea;
        "zen-toggle": ZenToggle;
        "zen-tooltip": ZenTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "color-swatch": LocalJSX.ColorSwatch & JSXBase.HTMLAttributes<HTMLColorSwatchElement>;
            "color-swatch-group": LocalJSX.ColorSwatchGroup & JSXBase.HTMLAttributes<HTMLColorSwatchGroupElement>;
            "docs-table": LocalJSX.DocsTable & JSXBase.HTMLAttributes<HTMLDocsTableElement>;
            "html-playground": LocalJSX.HtmlPlayground & JSXBase.HTMLAttributes<HTMLHtmlPlaygroundElement>;
            "text-with-details": LocalJSX.TextWithDetails & JSXBase.HTMLAttributes<HTMLTextWithDetailsElement>;
            "zen-animate": LocalJSX.ZenAnimate & JSXBase.HTMLAttributes<HTMLZenAnimateElement>;
            "zen-avatar": LocalJSX.ZenAvatar & JSXBase.HTMLAttributes<HTMLZenAvatarElement>;
            "zen-avatar-group": LocalJSX.ZenAvatarGroup & JSXBase.HTMLAttributes<HTMLZenAvatarGroupElement>;
            "zen-avatar-icon": LocalJSX.ZenAvatarIcon & JSXBase.HTMLAttributes<HTMLZenAvatarIconElement>;
            "zen-breadcrumbs": LocalJSX.ZenBreadcrumbs & JSXBase.HTMLAttributes<HTMLZenBreadcrumbsElement>;
            "zen-button": LocalJSX.ZenButton & JSXBase.HTMLAttributes<HTMLZenButtonElement>;
            "zen-card": LocalJSX.ZenCard & JSXBase.HTMLAttributes<HTMLZenCardElement>;
            "zen-checkbox": LocalJSX.ZenCheckbox & JSXBase.HTMLAttributes<HTMLZenCheckboxElement>;
            "zen-divider": LocalJSX.ZenDivider & JSXBase.HTMLAttributes<HTMLZenDividerElement>;
            "zen-dropdown": LocalJSX.ZenDropdown & JSXBase.HTMLAttributes<HTMLZenDropdownElement>;
            "zen-form-group": LocalJSX.ZenFormGroup & JSXBase.HTMLAttributes<HTMLZenFormGroupElement>;
            "zen-icon": LocalJSX.ZenIcon & JSXBase.HTMLAttributes<HTMLZenIconElement>;
            "zen-input": LocalJSX.ZenInput & JSXBase.HTMLAttributes<HTMLZenInputElement>;
            "zen-modal": LocalJSX.ZenModal & JSXBase.HTMLAttributes<HTMLZenModalElement>;
            "zen-notification": LocalJSX.ZenNotification & JSXBase.HTMLAttributes<HTMLZenNotificationElement>;
            "zen-option": LocalJSX.ZenOption & JSXBase.HTMLAttributes<HTMLZenOptionElement>;
            "zen-progress-tracker": LocalJSX.ZenProgressTracker & JSXBase.HTMLAttributes<HTMLZenProgressTrackerElement>;
            "zen-radio": LocalJSX.ZenRadio & JSXBase.HTMLAttributes<HTMLZenRadioElement>;
            "zen-space": LocalJSX.ZenSpace & JSXBase.HTMLAttributes<HTMLZenSpaceElement>;
            "zen-spinner": LocalJSX.ZenSpinner & JSXBase.HTMLAttributes<HTMLZenSpinnerElement>;
            "zen-table": LocalJSX.ZenTable & JSXBase.HTMLAttributes<HTMLZenTableElement>;
            "zen-table-cell": LocalJSX.ZenTableCell & JSXBase.HTMLAttributes<HTMLZenTableCellElement>;
            "zen-table-header": LocalJSX.ZenTableHeader & JSXBase.HTMLAttributes<HTMLZenTableHeaderElement>;
            "zen-table-header-cell": LocalJSX.ZenTableHeaderCell & JSXBase.HTMLAttributes<HTMLZenTableHeaderCellElement>;
            "zen-table-row": LocalJSX.ZenTableRow & JSXBase.HTMLAttributes<HTMLZenTableRowElement>;
            "zen-tabs": LocalJSX.ZenTabs & JSXBase.HTMLAttributes<HTMLZenTabsElement>;
            "zen-text": LocalJSX.ZenText & JSXBase.HTMLAttributes<HTMLZenTextElement>;
            "zen-textarea": LocalJSX.ZenTextarea & JSXBase.HTMLAttributes<HTMLZenTextareaElement>;
            "zen-toggle": LocalJSX.ZenToggle & JSXBase.HTMLAttributes<HTMLZenToggleElement>;
            "zen-tooltip": LocalJSX.ZenTooltip & JSXBase.HTMLAttributes<HTMLZenTooltipElement>;
        }
    }
}
