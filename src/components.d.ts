/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { StringifiedJson } from "./stories/components/color-swatch-group/color-swatch-group";
import { OptionItem } from "./components/zen-dropdown/zen-dropdown";
import { StepItem } from "./components/zen-steps/zen-steps";
export namespace Components {
    interface ColorSwatch {
        "color": string;
        /**
          * True if color is considered bright
         */
        "isBrightColor": boolean;
        "varName": string;
    }
    interface ColorSwatchGroup {
        "colors": StringifiedJson;
    }
    interface TextWithDetails {
    }
    interface ZenButton {
        "disabled"?: boolean;
        "label": string;
        "loading"?: boolean;
        "variant": string;
    }
    interface ZenDropdown {
        /**
          * If true, multiple options can be selected
         */
        "multiselect": boolean;
        /**
          * Array of available options
         */
        "options": Array<OptionItem>;
        "selectedColor": string;
        /**
          * Option key that is unique for each option
         */
        "trackBy": string;
        /**
          * Selected option
         */
        "val": OptionItem;
    }
    interface ZenSpinner {
    }
    interface ZenSteps {
        /**
          * Index of currently active step
         */
        "activeIndex": number;
        /**
          * User can click step to go to step
         */
        "selectable": boolean;
        /**
          * Ordered array of possible steps
         */
        "steps": Array<StepItem>;
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
    interface HTMLZenButtonElement extends Components.ZenButton, HTMLStencilElement {
    }
    var HTMLZenButtonElement: {
        prototype: HTMLZenButtonElement;
        new (): HTMLZenButtonElement;
    };
    interface HTMLZenDropdownElement extends Components.ZenDropdown, HTMLStencilElement {
    }
    var HTMLZenDropdownElement: {
        prototype: HTMLZenDropdownElement;
        new (): HTMLZenDropdownElement;
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
    interface HTMLElementTagNameMap {
        "color-swatch": HTMLColorSwatchElement;
        "color-swatch-group": HTMLColorSwatchGroupElement;
        "text-with-details": HTMLTextWithDetailsElement;
        "zen-button": HTMLZenButtonElement;
        "zen-dropdown": HTMLZenDropdownElement;
        "zen-spinner": HTMLZenSpinnerElement;
        "zen-steps": HTMLZenStepsElement;
    }
}
declare namespace LocalJSX {
    interface ColorSwatch {
        "color"?: string;
        /**
          * True if color is considered bright
         */
        "isBrightColor"?: boolean;
        "varName"?: string;
    }
    interface ColorSwatchGroup {
        "colors"?: StringifiedJson;
    }
    interface TextWithDetails {
    }
    interface ZenButton {
        "disabled"?: boolean;
        "label"?: string;
        "loading"?: boolean;
        "variant"?: string;
    }
    interface ZenDropdown {
        /**
          * If true, multiple options can be selected
         */
        "multiselect"?: boolean;
        /**
          * Emitted on any selection change
         */
        "onInput2"?: (event: CustomEvent<OptionItem>) => void;
        /**
          * Array of available options
         */
        "options"?: Array<OptionItem>;
        "selectedColor"?: string;
        /**
          * Option key that is unique for each option
         */
        "trackBy"?: string;
        /**
          * Selected option
         */
        "val"?: OptionItem;
    }
    interface ZenSpinner {
    }
    interface ZenSteps {
        /**
          * Index of currently active step
         */
        "activeIndex"?: number;
        /**
          * User clicked a step
         */
        "onSelected"?: (event: CustomEvent<Object>) => void;
        /**
          * User can click step to go to step
         */
        "selectable"?: boolean;
        /**
          * Ordered array of possible steps
         */
        "steps"?: Array<StepItem>;
    }
    interface IntrinsicElements {
        "color-swatch": ColorSwatch;
        "color-swatch-group": ColorSwatchGroup;
        "text-with-details": TextWithDetails;
        "zen-button": ZenButton;
        "zen-dropdown": ZenDropdown;
        "zen-spinner": ZenSpinner;
        "zen-steps": ZenSteps;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "color-swatch": LocalJSX.ColorSwatch & JSXBase.HTMLAttributes<HTMLColorSwatchElement>;
            "color-swatch-group": LocalJSX.ColorSwatchGroup & JSXBase.HTMLAttributes<HTMLColorSwatchGroupElement>;
            "text-with-details": LocalJSX.TextWithDetails & JSXBase.HTMLAttributes<HTMLTextWithDetailsElement>;
            "zen-button": LocalJSX.ZenButton & JSXBase.HTMLAttributes<HTMLZenButtonElement>;
            "zen-dropdown": LocalJSX.ZenDropdown & JSXBase.HTMLAttributes<HTMLZenDropdownElement>;
            "zen-spinner": LocalJSX.ZenSpinner & JSXBase.HTMLAttributes<HTMLZenSpinnerElement>;
            "zen-steps": LocalJSX.ZenSteps & JSXBase.HTMLAttributes<HTMLZenStepsElement>;
        }
    }
}
