/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { StringifiedJson } from "./stories/components/color-swatch-group/color-swatch-group";
import { ButtonVariants } from "./components/zen-button/types";
import { CheckboxChangeEventDetail } from "./components/zen-checkbox/types";
import { OptionItem, OptionValue } from "./components/zen-dropdown/zen-dropdown";
import { ZenDismissDuration, ZenVariant } from "./components/zen-notification/zen-notification-helper";
import { StepEvent, StepItem } from "./components/zen-steps/zen-steps";
import { StepsFilter } from "./components/zen-steps/types";
import { Position, Variant } from "./components/zen-tooltip/types";
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
    interface TextWithDetails {
    }
    interface ZenAnimate {
        /**
          * Prop that will show the slot
         */
        "show": boolean;
    }
    interface ZenButton {
        /**
          * If present, button will be disabled
         */
        "disabled"?: boolean;
        /**
          * Label of the button
         */
        "label": "Button";
        /**
          * If present, will show a spinner
         */
        "loading"?: boolean;
        /**
          * Color variant of the button
         */
        "variant": ButtonVariants;
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
    interface ZenDropdown {
        /**
          * Close dropdown menu after selecting an item
         */
        "closeOnSelect": true;
        /**
          * To determine if there's enough space under field on open
         */
        "menuHeight": number;
        /**
          * Array of available options
         */
        "options": Array<OptionItem>;
        /**
          * Close an opened dropdown menu
         */
        "toggle": (open?: boolean) => Promise<void>;
        /**
          * Option key that is unique for each option
         */
        "trackBy": string;
        /**
          * Selected option
         */
        "value": OptionValue;
    }
    interface ZenFormGroup {
    }
    interface ZenInput {
        /**
          * Disables input.
         */
        "disabled": false;
        /**
          * Placeholder of the input.
         */
        "placeholder": string;
        /**
          * Makes input required.
         */
        "required": false;
        /**
          * The value of the input.
         */
        "value"?: string | number | null;
    }
    interface ZenInputSupportText {
        /**
          * Supporting text
         */
        "text": string;
    }
    interface ZenLabel {
        /**
          * Text of the label
         */
        "label": string;
        /**
          * Shows a red asterisk after label
         */
        "required": false;
    }
    interface ZenMenuItem {
        /**
          * False to enable custom item padding
         */
        "defaultPadding": boolean;
        /**
          * Render item as focused
         */
        "focused": boolean;
        /**
          * Text inside the item
         */
        "label": string;
        /**
          * Render item as selected
         */
        "selected": boolean;
    }
    interface ZenNotification {
        /**
          * Can dismiss
         */
        "dismiss": boolean;
        /**
          * Hide duration
         */
        "dismissDuration": ZenDismissDuration;
        /**
          * Title
         */
        "heading": string;
        /**
          * Height
         */
        "height": string;
        /**
          * Message
         */
        "message": string;
        /**
          * Variant
         */
        "variant": ZenVariant;
        /**
          * Width
         */
        "width": string;
    }
    interface ZenSpinner {
        /**
          * Color of the spinner. Accepts any CSS Legal Color Value.
         */
        "color": string;
    }
    interface ZenSteps {
        /**
          * Index of currently active step
         */
        "activeIndex": 0;
        /**
          * User can click step to go to step
         */
        "clickable": StepsFilter;
        /**
          * Ordered array of possible steps
         */
        "steps": Array<StepItem>;
    }
    interface ZenTextarea {
        /**
          * Makes textarea disabled.
         */
        "disabled": false;
        /**
          * Placeholder of the textarea.
         */
        "placeholder": string;
        /**
          * Makes textarea required.
         */
        "required": false;
        /**
          * The text of the textarea.
         */
        "text"?: string | null;
    }
    interface ZenTooltip {
        /**
          * Set tooltip offset to target element
         */
        "offset"?: number;
        /**
          * Set tooltip position
         */
        "position"?: Position;
        /**
          * Set tooltip text
         */
        "text"?: string;
        /**
          * Set tooltip variant
         */
        "variant"?: Variant;
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
    interface HTMLZenButtonElement extends Components.ZenButton, HTMLStencilElement {
    }
    var HTMLZenButtonElement: {
        prototype: HTMLZenButtonElement;
        new (): HTMLZenButtonElement;
    };
    interface HTMLZenCheckboxElement extends Components.ZenCheckbox, HTMLStencilElement {
    }
    var HTMLZenCheckboxElement: {
        prototype: HTMLZenCheckboxElement;
        new (): HTMLZenCheckboxElement;
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
    interface HTMLZenInputElement extends Components.ZenInput, HTMLStencilElement {
    }
    var HTMLZenInputElement: {
        prototype: HTMLZenInputElement;
        new (): HTMLZenInputElement;
    };
    interface HTMLZenInputSupportTextElement extends Components.ZenInputSupportText, HTMLStencilElement {
    }
    var HTMLZenInputSupportTextElement: {
        prototype: HTMLZenInputSupportTextElement;
        new (): HTMLZenInputSupportTextElement;
    };
    interface HTMLZenLabelElement extends Components.ZenLabel, HTMLStencilElement {
    }
    var HTMLZenLabelElement: {
        prototype: HTMLZenLabelElement;
        new (): HTMLZenLabelElement;
    };
    interface HTMLZenMenuItemElement extends Components.ZenMenuItem, HTMLStencilElement {
    }
    var HTMLZenMenuItemElement: {
        prototype: HTMLZenMenuItemElement;
        new (): HTMLZenMenuItemElement;
    };
    interface HTMLZenNotificationElement extends Components.ZenNotification, HTMLStencilElement {
    }
    var HTMLZenNotificationElement: {
        prototype: HTMLZenNotificationElement;
        new (): HTMLZenNotificationElement;
    };
    interface HTMLZenSpinnerElement extends Components.ZenSpinner, HTMLStencilElement {
    }
    var HTMLZenSpinnerElement: {
        prototype: HTMLZenSpinnerElement;
        new (): HTMLZenSpinnerElement;
    };
    interface HTMLZenStepsElement extends Components.ZenSteps, HTMLStencilElement {
    }
    var HTMLZenStepsElement: {
        prototype: HTMLZenStepsElement;
        new (): HTMLZenStepsElement;
    };
    interface HTMLZenTextareaElement extends Components.ZenTextarea, HTMLStencilElement {
    }
    var HTMLZenTextareaElement: {
        prototype: HTMLZenTextareaElement;
        new (): HTMLZenTextareaElement;
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
        "text-with-details": HTMLTextWithDetailsElement;
        "zen-animate": HTMLZenAnimateElement;
        "zen-button": HTMLZenButtonElement;
        "zen-checkbox": HTMLZenCheckboxElement;
        "zen-dropdown": HTMLZenDropdownElement;
        "zen-form-group": HTMLZenFormGroupElement;
        "zen-input": HTMLZenInputElement;
        "zen-input-support-text": HTMLZenInputSupportTextElement;
        "zen-label": HTMLZenLabelElement;
        "zen-menu-item": HTMLZenMenuItemElement;
        "zen-notification": HTMLZenNotificationElement;
        "zen-spinner": HTMLZenSpinnerElement;
        "zen-steps": HTMLZenStepsElement;
        "zen-textarea": HTMLZenTextareaElement;
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
    interface TextWithDetails {
    }
    interface ZenAnimate {
        /**
          * Prop that will show the slot
         */
        "show"?: boolean;
    }
    interface ZenButton {
        /**
          * If present, button will be disabled
         */
        "disabled"?: boolean;
        /**
          * Label of the button
         */
        "label"?: "Button";
        /**
          * If present, will show a spinner
         */
        "loading"?: boolean;
        /**
          * Color variant of the button
         */
        "variant"?: ButtonVariants;
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
          * Emitted when the checked property has changed.
         */
        "onCheckboxChange"?: (event: CustomEvent<CheckboxChangeEventDetail>) => void;
        /**
          * Shows a red asterisk after label.
         */
        "required"?: false;
    }
    interface ZenDropdown {
        /**
          * Close dropdown menu after selecting an item
         */
        "closeOnSelect"?: true;
        /**
          * To determine if there's enough space under field on open
         */
        "menuHeight"?: number;
        /**
          * Focused item changed (keyboard arrows)
         */
        "onZenFocusItem"?: (event: CustomEvent<OptionValue>) => void;
        /**
          * Emitted on any selection change
         */
        "onZenInput"?: (event: CustomEvent<OptionValue>) => void;
        /**
          * Array of available options
         */
        "options"?: Array<OptionItem>;
        /**
          * Option key that is unique for each option
         */
        "trackBy"?: string;
        /**
          * Selected option
         */
        "value"?: OptionValue;
    }
    interface ZenFormGroup {
    }
    interface ZenInput {
        /**
          * Disables input.
         */
        "disabled"?: false;
        /**
          * Emitted when a keyboard input occurred.
         */
        "onZenInput"?: (event: CustomEvent<KeyboardEvent>) => void;
        /**
          * Placeholder of the input.
         */
        "placeholder"?: string;
        /**
          * Makes input required.
         */
        "required"?: false;
        /**
          * The value of the input.
         */
        "value"?: string | number | null;
    }
    interface ZenInputSupportText {
        /**
          * Supporting text
         */
        "text"?: string;
    }
    interface ZenLabel {
        /**
          * Text of the label
         */
        "label"?: string;
        /**
          * Shows a red asterisk after label
         */
        "required"?: false;
    }
    interface ZenMenuItem {
        /**
          * False to enable custom item padding
         */
        "defaultPadding"?: boolean;
        /**
          * Render item as focused
         */
        "focused"?: boolean;
        /**
          * Text inside the item
         */
        "label"?: string;
        /**
          * Render item as selected
         */
        "selected"?: boolean;
    }
    interface ZenNotification {
        /**
          * Can dismiss
         */
        "dismiss"?: boolean;
        /**
          * Hide duration
         */
        "dismissDuration"?: ZenDismissDuration;
        /**
          * Title
         */
        "heading"?: string;
        /**
          * Height
         */
        "height"?: string;
        /**
          * Message
         */
        "message"?: string;
        /**
          * Variant
         */
        "variant"?: ZenVariant;
        /**
          * Width
         */
        "width"?: string;
    }
    interface ZenSpinner {
        /**
          * Color of the spinner. Accepts any CSS Legal Color Value.
         */
        "color"?: string;
    }
    interface ZenSteps {
        /**
          * Index of currently active step
         */
        "activeIndex"?: 0;
        /**
          * User can click step to go to step
         */
        "clickable"?: StepsFilter;
        /**
          * User clicked a step
         */
        "onSelected"?: (event: CustomEvent<StepEvent>) => void;
        /**
          * Ordered array of possible steps
         */
        "steps"?: Array<StepItem>;
    }
    interface ZenTextarea {
        /**
          * Makes textarea disabled.
         */
        "disabled"?: false;
        /**
          * Emitted when a keyboard input occurred.
         */
        "onZenInput"?: (event: CustomEvent<KeyboardEvent>) => void;
        /**
          * Placeholder of the textarea.
         */
        "placeholder"?: string;
        /**
          * Makes textarea required.
         */
        "required"?: false;
        /**
          * The text of the textarea.
         */
        "text"?: string | null;
    }
    interface ZenTooltip {
        /**
          * Set tooltip offset to target element
         */
        "offset"?: number;
        /**
          * Set tooltip position
         */
        "position"?: Position;
        /**
          * Set tooltip text
         */
        "text"?: string;
        /**
          * Set tooltip variant
         */
        "variant"?: Variant;
    }
    interface IntrinsicElements {
        "color-swatch": ColorSwatch;
        "color-swatch-group": ColorSwatchGroup;
        "text-with-details": TextWithDetails;
        "zen-animate": ZenAnimate;
        "zen-button": ZenButton;
        "zen-checkbox": ZenCheckbox;
        "zen-dropdown": ZenDropdown;
        "zen-form-group": ZenFormGroup;
        "zen-input": ZenInput;
        "zen-input-support-text": ZenInputSupportText;
        "zen-label": ZenLabel;
        "zen-menu-item": ZenMenuItem;
        "zen-notification": ZenNotification;
        "zen-spinner": ZenSpinner;
        "zen-steps": ZenSteps;
        "zen-textarea": ZenTextarea;
        "zen-tooltip": ZenTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "color-swatch": LocalJSX.ColorSwatch & JSXBase.HTMLAttributes<HTMLColorSwatchElement>;
            "color-swatch-group": LocalJSX.ColorSwatchGroup & JSXBase.HTMLAttributes<HTMLColorSwatchGroupElement>;
            "text-with-details": LocalJSX.TextWithDetails & JSXBase.HTMLAttributes<HTMLTextWithDetailsElement>;
            "zen-animate": LocalJSX.ZenAnimate & JSXBase.HTMLAttributes<HTMLZenAnimateElement>;
            "zen-button": LocalJSX.ZenButton & JSXBase.HTMLAttributes<HTMLZenButtonElement>;
            "zen-checkbox": LocalJSX.ZenCheckbox & JSXBase.HTMLAttributes<HTMLZenCheckboxElement>;
            "zen-dropdown": LocalJSX.ZenDropdown & JSXBase.HTMLAttributes<HTMLZenDropdownElement>;
            "zen-form-group": LocalJSX.ZenFormGroup & JSXBase.HTMLAttributes<HTMLZenFormGroupElement>;
            "zen-input": LocalJSX.ZenInput & JSXBase.HTMLAttributes<HTMLZenInputElement>;
            "zen-input-support-text": LocalJSX.ZenInputSupportText & JSXBase.HTMLAttributes<HTMLZenInputSupportTextElement>;
            "zen-label": LocalJSX.ZenLabel & JSXBase.HTMLAttributes<HTMLZenLabelElement>;
            "zen-menu-item": LocalJSX.ZenMenuItem & JSXBase.HTMLAttributes<HTMLZenMenuItemElement>;
            "zen-notification": LocalJSX.ZenNotification & JSXBase.HTMLAttributes<HTMLZenNotificationElement>;
            "zen-spinner": LocalJSX.ZenSpinner & JSXBase.HTMLAttributes<HTMLZenSpinnerElement>;
            "zen-steps": LocalJSX.ZenSteps & JSXBase.HTMLAttributes<HTMLZenStepsElement>;
            "zen-textarea": LocalJSX.ZenTextarea & JSXBase.HTMLAttributes<HTMLZenTextareaElement>;
            "zen-tooltip": LocalJSX.ZenTooltip & JSXBase.HTMLAttributes<HTMLZenTooltipElement>;
        }
    }
}
