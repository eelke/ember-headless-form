/// <reference types="ember__component" />
import Component from '@glimmer/component';
import CheckboxComponent from "./control/checkbox.js";
import CheckboxGroupComponent from "./control/checkbox-group.js";
import InputComponent from "./control/input.js";
import RadioGroupComponent from "./control/radio-group.js";
import SelectComponent from "./control/select.js";
import TextareaComponent from "./control/textarea.js";
import ErrorsComponent from "./errors.js";
import LabelComponent from "./label.js";
import { CaptureEventsModifierSignature } from "../modifiers/capture-events.js";
import { ErrorRecord, FieldValidateCallback, FormData, FormKey, RegisterFieldCallback, UnregisterFieldCallback, UserData, ValidationError } from "../types.js";
import { ModifierLike, WithBoundArgs } from '@glint/template';
interface HeadlessFormFieldComponentSignature<DATA extends UserData, KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>> {
    Args: {
        /**
         * The name of your field, which must match a property of the `@data` passed to the form
         */
        name: KEY;
        /**
         * Provide a custom validation function, that operates only on this specific field. Eventual validation errors are merged with native validation errors to determine the effective set of errors rendered for the field.
         *
         * Return undefined when no validation errors are present, otherwise an array of (one or multiple) `ValidationError`s.
         */
        validate?: FieldValidateCallback<FormData<DATA>, KEY>;
        data: FormData<DATA>;
        set: (key: KEY, value: DATA[KEY]) => void;
        errors?: ErrorRecord<DATA, KEY>;
        registerField: RegisterFieldCallback<FormData<DATA>, KEY>;
        unregisterField: UnregisterFieldCallback<FormData<DATA>, KEY>;
        triggerValidationFor(name: KEY): Promise<void>;
        fieldValidationEvent: 'focusout' | 'change' | 'input' | undefined;
        fieldRevalidationEvent: 'focusout' | 'change' | 'input' | undefined;
    };
    Blocks: {
        default: [
            {
                /**
                 * Yielded component that renders the `<label>` element.
                 */
                Label: WithBoundArgs<typeof LabelComponent, 'fieldId'>;
                /**
                 * Yielded control component that renders an `<input>` element.
                 */
                Input: WithBoundArgs<typeof InputComponent, 'name' | 'fieldId' | 'value' | 'setValue' | 'invalid' | 'errorId'>;
                /**
                 * Yielded control component that renders an `<input type="checkbox">` element.
                 */
                Checkbox: WithBoundArgs<typeof CheckboxComponent, 'name' | 'fieldId' | 'value' | 'setValue' | 'invalid' | 'errorId'>;
                /**
                 * Yielded control component that renders a single radio control.
                 *
                 * Use multiple to define a radio group. It further yields components to render `Input` and `Label`.
                 */
                RadioGroup: WithBoundArgs<typeof RadioGroupComponent, 'name' | 'selected' | 'setValue' | 'invalid' | 'errorId'>;
                /**
                 * Yielded control component that renders a single checkbox control.
                 *
                 * Use multiple to define a checkbox group. It further yields components to render `Input` and `Label`.
                 */
                CheckboxGroup: WithBoundArgs<typeof CheckboxGroupComponent, 'name' | 'selected' | 'setValue' | 'invalid' | 'errorId'>;
                /**
                 * Yielded control component that renders a `<select>` element.
                 */
                Select: WithBoundArgs<typeof SelectComponent, 'name' | 'fieldId' | 'value' | 'setValue' | 'invalid' | 'errorId'>;
                /**
                 * Yielded control component that renders a `<textarea>` element.
                 */
                Textarea: WithBoundArgs<typeof TextareaComponent, 'name' | 'fieldId' | 'value' | 'setValue' | 'invalid' | 'errorId'>;
                /**
                 * The current value of the field's form data.
                 *
                 * If you don't use one of the supplied control components, then use this to pass the value to your custom component.
                 */
                value: DATA[KEY];
                /**
                 * Action to update the (internal) form data for this field.
                 *
                 * If you don't use one of the supplied control components, then use this to update the value whenever your custom component's value has changed.
                 */
                setValue: (value: DATA[KEY]) => void;
                /**
                 * Unique ID of this field, used to associate the control with its label.
                 *
                 * If you don't use the supplied components, then you can use this as the `id` of the control and the `for` attribute of the `<label>`.
                 */
                id: string;
                /**
                 * Unique error ID of this field, used to associate the control with its validation error message.
                 *
                 * If you don't use the supplied components, then you can use this as the `id` of the validation error element and the `aria-errormessage` or `aria-describedby` attribute of the control.
                 */
                errorId: string;
                /**
                 * Yielded component that renders all validation error messages if there are any.
                 *
                 * In non-block mode it will render all messages by default. In block-mode, it yields all `ValidationError` objects for you to customize the rendering.
                 */
                Errors?: WithBoundArgs<typeof ErrorsComponent<DATA[KEY]>, 'errors' | 'id'>;
                /**
                 * Will be `true` when validation was triggered and this field is invalid.
                 *
                 * You can use this to customize your markup, e.g. apply HTML classes for error styling.
                 */
                isInvalid: boolean;
                /**
                 * An array of raw ValidationError objects, for custom rendering of error output
                 */
                rawErrors?: ValidationError<DATA[KEY]>[];
                /**
                 * When calling this action, validation will be triggered.
                 *
                 * Can be used for custom controls that don't emit the `@validateOn` events that would normally trigger a dynamic validation.
                 */
                triggerValidation: () => void;
                /**
                 * Yielded modifier that when applied to the control element or any other element wrapping it will be able to recognize the `@validateOn` events and associate them to this field.
                 *
                 * This is only needed for very special cases, where the control is not a native form control or does not have the `@name` of the field assigned to the `name` attribute of the control.
                 */
                captureEvents: WithBoundArgs<ModifierLike<CaptureEventsModifierSignature>, 'event' | 'triggerValidation'>;
            }
        ];
    };
}
declare class HeadlessFormFieldComponent<DATA extends FormData, KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>> extends Component<HeadlessFormFieldComponentSignature<DATA, KEY>> {
    LabelComponent: import("@ember/component/template-only").TemplateOnlyComponent<import("./label.js").HeadlessFormLabelComponentSignature>;
    InputComponent: typeof InputComponent;
    CheckboxComponent: typeof CheckboxComponent;
    ErrorsComponent: {
        new (owner: unknown, args: {
            errors: ValidationError<DATA[KEY]>[];
            id: string;
        }): ErrorsComponent<DATA[KEY]>;
    };
    SelectComponent: typeof SelectComponent;
    TextareaComponent: typeof TextareaComponent;
    RadioGroupComponent: import("@ember/component/template-only").TemplateOnlyComponent<import("./control/radio-group.js").HeadlessFormControlRadioGroupComponentSignature>;
    CheckboxGroupComponent: import("@ember/component/template-only").TemplateOnlyComponent<import("./control/checkbox-group.js").HeadlessFormControlCheckboxGroupComponentSignature>;
    CaptureEventsModifier: import("ember-modifier").FunctionBasedModifier<{
        Element: HTMLElement;
        Args: {
            Named: {
                event: "focusout" | "change" | "input" | undefined;
                triggerValidation(): void;
            };
            Positional: [];
        };
    }>;
    constructor(owner: unknown, args: HeadlessFormFieldComponentSignature<DATA, KEY>['Args']);
    willDestroy(): void;
    get value(): DATA[KEY];
    get errors(): ValidationError<DATA[KEY]>[] | undefined;
    get hasErrors(): boolean;
    get valueAsString(): string | undefined;
    get valueAllAsString(): string[];
    get valueAsStringOrNumber(): string | number | undefined;
    get valueAsBoolean(): boolean | undefined;
    setValue(value: unknown): void;
}
export { HeadlessFormFieldComponentSignature, HeadlessFormFieldComponent as default };
