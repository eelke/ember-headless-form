import Component from '@glimmer/component';
import { TrackedAsyncData } from 'ember-async-data';
import FieldComponent from "../-private/components/field.js";
import { ErrorRecord, FieldRegistrationData, FieldValidateCallback, FormData, FormKey, FormValidateCallback, UserData, ValidationError } from "../-private/types.js";
import { WithBoundArgs } from '@glint/template';
type ValidateOn = 'change' | 'focusout' | 'submit' | 'input';
interface HeadlessFormComponentSignature<DATA extends UserData, SUBMISSION_VALUE> {
    Element: HTMLFormElement;
    Args: {
        /**
         * The initial data the form will use to pre-populate the fields.
         *
         * Make sure the type of it matches what you expect the form to represent, i.e. the names of all form fields match the properties of the data and their respective types!
         */
        data?: DATA;
        /**
         * By default the data you pass as `@data` is never mutated by the form component, you will only receive the updated data (a copy) on successful submission via `@onSubmit`.
         * Setting this to `'mutable'` will mutate the data whenever the user updates a field. This is especially useful when the data already has some "buffering" behavior, like with `ember-changeset`.
         */
        dataMode?: 'mutable' | 'immutable';
        /**
         * Specify when to dynamically validate a field before even submitting the whole form. By default this is `submit`, which means no dynamic validation happens. Another common setting is to validate on `focusout`.
         */
        validateOn?: ValidateOn;
        /**
         * Specify when to revalidate a previously validated field that is invalid. By default this happens on `change`. Another common setting is to revalidate on `input`.
         * Mind that text-based inputs don't emit the `change` event on every key stroke, but only on focusing out. Changing this to `input` would make text-based inputs revalidate on every key stroke.
         */
        revalidateOn?: ValidateOn;
        /**
         * Provide a custom validation function, that operates on all fields of the form. Eventual validation errors are merged with native validation errors to determine the effective set of errors rendered in the form.
         *
         * Return undefined when no validation errors are present, otherwise an `ErrorRecord` mapping (one or multiple) `ValidationError`s to each invalid field.
         */
        validate?: FormValidateCallback<DATA>;
        /**
         * Allows you to opt-out of native validation.
         *
         * This can be useful if all of the validation logic is already handled by the `@validate` hooks, but you have form controls that have validation requirements (e.g. `email` type) that would cause the native validation to interfere.
         */
        ignoreNativeValidation?: boolean;
        /**
         * Called when the user has submitted the form and no validation errors have been determined. Receives the new form data, or in case of `@dataMode="mutable"` the original data object.
         */
        onSubmit?: (data: FormData<DATA>) => SUBMISSION_VALUE | Promise<SUBMISSION_VALUE>;
        /**
         * Called when the user tried to submit the form, but validation failed. Receives the new data (or in case of `@dataMode="mutable"` the original data object), and the record of validation errors by field.
         */
        onInvalid?: (data: FormData<DATA>, errors: ErrorRecord<FormData<DATA>>) => void;
    };
    Blocks: {
        default: [
            {
                /**
                 * Field component to define the fields of your form. It yields the further components for the form control, label and validation error.
                 */
                Field: WithBoundArgs<typeof FieldComponent<DATA>, 'data' | 'set' | 'errors' | 'registerField' | 'unregisterField' | 'triggerValidationFor' | 'fieldValidationEvent' | 'fieldRevalidationEvent'>;
                /**
                 * The (async) validation state as `TrackedAsyncData`.
                 *
                 * Use derived state like `.isPending` to render the UI conditionally.
                 */
                validationState?: TrackedAsyncData<ErrorRecord<DATA>>;
                /**
                 * The (async) submission state as `TrackedAsyncData`.
                 *
                 * Use derived state like `.isPending` to render the UI conditionally.
                 */
                submissionState?: TrackedAsyncData<SUBMISSION_VALUE>;
                /**
                 * Will be true if at least one form field is invalid.
                 */
                isInvalid: boolean;
                /**
                 * An ErrorRecord, for custom rendering of error output
                 */
                rawErrors?: ErrorRecord<DATA>;
                /**
                 * Yielded action that will trigger form validation and submission, same as when triggering the native `submit` event on the form.
                 */
                submit: () => void;
                /**
                 * Yielded action that will reset form state, same as when triggering the native `reset` event on the form.
                 */
                reset: () => void;
            }
        ];
    };
}
/**
 * This internal data structure maintains information about each field that is registered to the form by `registerField`.
 */
declare class FieldData<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> {
    constructor(fieldRegistration: FieldRegistrationData<DATA, KEY>);
    /**
     * tracked state that enabled a dynamic validation of a field *before* the whole form is submitted, e.g. by `@validateOn="blur" and the blur event being triggered for that particular field.
     */
    validationEnabled: boolean;
    /**
     * The *field* level validation callback passed to the field as in `<form.field @name="foo" @validate={{this.validateCallback}}>`
     */
    validate?: FieldValidateCallback<DATA, KEY>;
}
/**
 * Headless form component.
 *
 * @example
 * Usage example:
 *
 * ```hbs
 * <HeadlessForm
 *   @data={{this.data}}
 *   @validateOn="focusout"
 *   @revalidateOn="input"
 *   @onSubmit={{this.doSomething}}
 *   as |form|
 * >
 *   <form.Field @name="firstName" as |field|>
 *     <div>
 *       <field.Label>First name</field.Label>
 *       <field.Input
 *         required
 *       />
 *       <field.errors />
 *     </div>
 *   </form.Field>
 *
 *   <button
 *     type="submit"
 *   >Submit</button>
 * </HeadlessForm>
 * ```
 */
declare class HeadlessFormComponent<DATA extends UserData, SUBMISSION_VALUE> extends Component<HeadlessFormComponentSignature<DATA, SUBMISSION_VALUE>> {
    FieldComponent: {
        new (owner: unknown, args: {
            name: FormKey<FormData<DATA>>;
            validate?: FieldValidateCallback<FormData<DATA>, FormKey<FormData<DATA>>> | undefined;
            data: FormData<DATA>;
            set: (key: FormKey<FormData<DATA>>, value: DATA[FormKey<FormData<DATA>>]) => void;
            /**
             * Specify when to revalidate a previously validated field that is invalid. By default this happens on `change`. Another common setting is to revalidate on `input`.
             * Mind that text-based inputs don't emit the `change` event on every key stroke, but only on focusing out. Changing this to `input` would make text-based inputs revalidate on every key stroke.
             */
            errors?: Partial<Record<FormKey<FormData<DATA>>, ValidationError<DATA[FormKey<FormData<DATA>>]>[]>> | undefined;
            registerField: import("../-private/types.js").RegisterFieldCallback<FormData<DATA>, FormKey<FormData<DATA>>>;
            unregisterField: import("../-private/types.js").UnregisterFieldCallback<FormData<DATA>, FormKey<FormData<DATA>>>;
            triggerValidationFor(name: FormKey<FormData<DATA>>): Promise<void>;
            fieldValidationEvent: "focusout" | "change" | "input" | undefined;
            fieldRevalidationEvent: "focusout" | "change" | "input" | undefined;
        }): FieldComponent<DATA, FormKey<FormData<DATA>>>;
    };
    formElement?: HTMLFormElement;
    registerForm: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: [];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HTMLFormElement;
    }>;
    /**
     * A copy of the passed `@data` stored internally, which is only passed back to the component consumer after a (successful) form submission.
     */
    internalData: DATA;
    get effectiveData(): DATA;
    fields: Map<FormKey<FormData<DATA>>, FieldData<FormData<DATA>, FormKey<FormData<DATA>>>>;
    validationState?: TrackedAsyncData<ErrorRecord<DATA>>;
    submissionState?: TrackedAsyncData<SUBMISSION_VALUE>;
    /**
     * When this is set to true by submitting the form, eventual validation errors are show for *all* field, regardless of their individual dynamic validation status in `FieldData#validationEnabled`
     */
    showAllValidations: boolean;
    get validateOn(): ValidateOn;
    get revalidateOn(): ValidateOn;
    /**
     * Return the event type that will be listened on for dynamic validation (i.e. *before* submitting)
     */
    get fieldValidationEvent(): 'focusout' | 'change' | 'input' | undefined;
    /**
     * Return the event type that will be listened on for dynamic *re*validation, i.e. updating the validation status of a field that has been previously marked as invalid
     */
    get fieldRevalidationEvent(): 'focusout' | 'change' | 'input' | undefined;
    /**
     * Return true if validation has happened (by submitting or by an `@validateOn` event being triggered) and at least one field is invalid
     */
    get hasValidationErrors(): boolean;
    /**
     * Call the passed validation callbacks, defined both on the whole form as well as on field level, and return the merged result for all fields.
     */
    /**
     * Call the passed validation callbacks, defined both on the whole form as well as on field level, and return the merged result for all fields.
     */
    validate(): Promise<ErrorRecord<FormData<DATA>>>;
    _validate(): Promise<ErrorRecord<FormData<DATA>>>;
    validateNative(): ErrorRecord<FormData<DATA>> | undefined;
    /**
     * Return a mapping of field to validation errors, for all fields that are invalid *and* for which validation errors should be visible.
     * Validation errors will be visible for a certain field, if validation errors for *all* fields are visible, which is the case when trying to submit the form,
     * or when that field has triggered the event given by `@validateOn` for showing validation errors before submitting, e.g. on blur.
     */
    get visibleErrors(): ErrorRecord<FormData<DATA>> | undefined;
    /**
     * Given a field name, return if eventual errors for the field should be visible. See `visibleErrors` for further details.
     */
    /**
     * Given a field name, return if eventual errors for the field should be visible. See `visibleErrors` for further details.
     */
    showErrorsFor(field: FormKey<FormData<DATA>>): boolean;
    onSubmit(e?: Event): Promise<void>;
    onReset(e?: Event): Promise<void>;
    registerField(name: FormKey<FormData<DATA>>, field: FieldRegistrationData<FormData<DATA>>): void;
    unregisterField(name: FormKey<FormData<DATA>>): void;
    set<KEY extends FormKey<FormData<DATA>>>(key: KEY, value: DATA[KEY]): void;
    /**
     * Handle the `@validateOn` event for a certain field, e.g. "blur".
     * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
     * Validation will be triggered, and the particular field will be marked to show eventual validation errors.
     */
    /**
     * Handle the `@validateOn` event for a certain field, e.g. "blur".
     * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
     * Validation will be triggered, and the particular field will be marked to show eventual validation errors.
     */
    handleFieldValidation(e: Event | string): Promise<void>;
    /**
     * Handle the `@revalidateOn` event for a certain field, e.g. "blur".
     * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
     * When a field has been already marked to show validation errors by `@validateOn`, then for revalidation another validation will be triggered.
     *
     * The use case here is to allow this to happen more frequently than the initial validation, e.g. `@validateOn="blur" @revalidateOn="change"`.
     */
    /**
     * Handle the `@revalidateOn` event for a certain field, e.g. "blur".
     * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
     * When a field has been already marked to show validation errors by `@validateOn`, then for revalidation another validation will be triggered.
     *
     * The use case here is to allow this to happen more frequently than the initial validation, e.g. `@validateOn="blur" @revalidateOn="change"`.
     */
    handleFieldRevalidation(e: Event): Promise<void>;
    onValidation: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: [string | undefined, (e: Event) => void];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HTMLFormElement;
    }>;
}
export { HeadlessFormComponentSignature, HeadlessFormComponent as default };
