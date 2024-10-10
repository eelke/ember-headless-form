import _initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import '@babel/runtime/helpers/esm/initializerWarningHelper';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { tracked, cached } from '@glimmer/tracking';
import { assert, warn } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, set } from '@ember/object';
import { TrackedAsyncData } from 'ember-async-data';
import { modifier } from 'ember-modifier';
import { TrackedObject } from 'tracked-built-ins';
import HeadlessFormFieldComponent from '../-private/components/field.js';
import { mergeErrorRecord } from '../-private/utils.js';

var _class, _descriptor, _class3, _descriptor2, _descriptor3, _descriptor4;
/**
 * This internal data structure maintains information about each field that is registered to the form by `registerField`.
 */
let FieldData = (_class = class FieldData {
  constructor(fieldRegistration) {
    /**
     * tracked state that enabled a dynamic validation of a field *before* the whole form is submitted, e.g. by `@validateOn="blur" and the blur event being triggered for that particular field.
     */
    _initializerDefineProperty(this, "validationEnabled", _descriptor, this);
    /**
     * The *field* level validation callback passed to the field as in `<form.field @name="foo" @validate={{this.validateCallback}}>`
     */
    _defineProperty(this, "validate", void 0);
    this.validate = fieldRegistration.validate;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "validationEnabled", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class);
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
let HeadlessFormComponent = setComponentTemplate(precompileTemplate(`
    <form
      novalidate
      ...attributes
      {{this.registerForm}}
      {{on "submit" this.onSubmit}}
      {{on "reset" this.onReset}}
      {{this.onValidation this.fieldValidationEvent this.handleFieldValidation}}
      {{this.onValidation
        this.fieldRevalidationEvent
        this.handleFieldRevalidation
      }}
    >
      {{yield
        (hash
          Field=(component
            this.FieldComponent
            data=this.effectiveData
            set=this.set
            errors=this.visibleErrors
            registerField=this.registerField
            unregisterField=this.unregisterField
            triggerValidationFor=this.handleFieldValidation
            fieldValidationEvent=this.fieldValidationEvent
            fieldRevalidationEvent=this.fieldRevalidationEvent
          )
          validationState=this.validationState
          submissionState=this.submissionState
          isInvalid=this.hasValidationErrors
          rawErrors=this.visibleErrors
          submit=this.onSubmit
          reset=this.onReset
        )
      }}
    </form>
  `, {
  strictMode: true,
  scope: () => ({
    on,
    hash
  })
}), (_class3 = class HeadlessFormComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "FieldComponent", HeadlessFormFieldComponent);
    _defineProperty(this, "formElement", void 0);
    _defineProperty(this, "registerForm", modifier((el, _p) => {
      this.formElement = el;
    }));
    /**
     * A copy of the passed `@data` stored internally, which is only passed back to the component consumer after a (successful) form submission.
     */
    _defineProperty(this, "internalData", new TrackedObject({}));
    _defineProperty(this, "fields", new Map());
    _initializerDefineProperty(this, "validationState", _descriptor2, this);
    _initializerDefineProperty(this, "submissionState", _descriptor3, this);
    /**
     * When this is set to true by submitting the form, eventual validation errors are show for *all* field, regardless of their individual dynamic validation status in `FieldData#validationEnabled`
     */
    _initializerDefineProperty(this, "showAllValidations", _descriptor4, this);
    _defineProperty(this, "onValidation", modifier((el, [eventName, handler]) => {
      if (eventName) {
        el.addEventListener(eventName, handler);
        return () => el.removeEventListener(eventName, handler);
      }
    }));
  }
  get effectiveData() {
    const obj = this.args.data ?? {};
    if (this.args.dataMode === 'mutable') {
      return obj;
    }
    const {
      internalData
    } = this;
    return new Proxy(obj, {
      get(target, prop) {
        return prop in internalData ? internalData[prop] : Reflect.get(target, prop);
      },
      set(target, property, value) {
        return Reflect.set(internalData, property, value);
      },
      has(target, prop) {
        return prop in internalData ? true : Reflect.has(target, prop);
      },
      getOwnPropertyDescriptor(target, prop) {
        return Reflect.getOwnPropertyDescriptor(prop in internalData ? internalData : target, prop);
      },
      ownKeys(target) {
        return [...Reflect.ownKeys(target), ...Reflect.ownKeys(internalData)]
        // return only unique values
        .filter((value, index, array) => array.indexOf(value) === index);
      },
      deleteProperty(target, prop) {
        if (prop in internalData) {
          delete internalData[prop];
        }
        return true;
      }
    });
  }
  get validateOn() {
    return this.args.validateOn ?? 'submit';
  }
  get revalidateOn() {
    return this.args.revalidateOn ?? 'change';
  }

  /**
   * Return the event type that will be listened on for dynamic validation (i.e. *before* submitting)
   */
  get fieldValidationEvent() {
    const {
      validateOn
    } = this;
    return validateOn === 'submit' ?
    // no need for dynamic validation, as validation always happens on submit
    undefined : validateOn;
  }

  /**
   * Return the event type that will be listened on for dynamic *re*validation, i.e. updating the validation status of a field that has been previously marked as invalid
   */
  get fieldRevalidationEvent() {
    const {
      validateOn,
      revalidateOn
    } = this;
    return revalidateOn === 'submit' ?
    // no need for dynamic validation, as validation always happens on submit
    undefined :
    // when validation happens more frequently than revalidation, then we can ignore revalidation, because the validation handler will already cover us
    validateOn === 'input' || validateOn === 'change' && revalidateOn === 'focusout' || validateOn === revalidateOn ? undefined : revalidateOn;
  }

  /**
   * Return true if validation has happened (by submitting or by an `@validateOn` event being triggered) and at least one field is invalid
   */
  get hasValidationErrors() {
    const {
      validationState
    } = this;

    // Only consider validation errors for which we actually have a field rendered
    return validationState?.isResolved ? Object.keys(validationState.value).some(name => this.fields.has(name)) : false;
  }

  /**
   * Call the passed validation callbacks, defined both on the whole form as well as on field level, and return the merged result for all fields.
   */
  async validate() {
    const nativeValidation = this.args.ignoreNativeValidation !== true ? this.validateNative() : {};
    const customFormValidation = await this.args.validate?.(this.effectiveData, Array.from(this.fields.keys()));
    const customFieldValidations = [];
    for (const [name, field] of this.fields) {
      const fieldValidationResult = await field.validate?.(this.effectiveData[name], name, this.effectiveData);
      if (fieldValidationResult) {
        customFieldValidations.push({
          [name]: fieldValidationResult
        });
      }
    }
    return mergeErrorRecord(nativeValidation, customFormValidation, ...customFieldValidations);
  }
  async _validate() {
    const promise = this.validate();
    this.validationState = new TrackedAsyncData(promise);
    return promise;
  }
  validateNative() {
    const form = this.formElement;
    assert('Form element expected to be present. If you see this, please report it as a bug to ember-headless-form!', form);
    if (form.checkValidity()) {
      return;
    }
    const errors = {};
    for (const el of form.elements) {
      // This is just to make TS happy, as we need to access properties on el that only form elements have, but elements in `form.elements` are just typed as plain `Element`. Should never occur in reality.
      assert('Unexpected form element. If you see this, please report it as a bug to ember-headless-form!', el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement || el instanceof HTMLButtonElement || el instanceof HTMLFieldSetElement || el instanceof HTMLObjectElement || el instanceof HTMLOutputElement);
      if (el.validity.valid) {
        continue;
      }
      const name = el.name;
      if (this.fields.has(name)) {
        errors[name] = [{
          type: 'native',
          value: this.effectiveData[name],
          message: el.validationMessage
        }];
      } else {
        warn(`An invalid form element with name "${name}" was detected, but this name is not used as a form field. It will be ignored for validation. Make sure to apply the correct name to custom form elements that participate in form validation!`, {
          id: 'headless-form.invalid-control-for-unknown-field'
        });
      }
    }
    return errors;
  }

  /**
   * Return a mapping of field to validation errors, for all fields that are invalid *and* for which validation errors should be visible.
   * Validation errors will be visible for a certain field, if validation errors for *all* fields are visible, which is the case when trying to submit the form,
   * or when that field has triggered the event given by `@validateOn` for showing validation errors before submitting, e.g. on blur.
   */
  get visibleErrors() {
    if (!this.validationState?.isResolved) {
      return undefined;
    }
    const visibleErrors = {};
    for (const [field, errors] of Object.entries(this.validationState.value)) {
      if (this.showErrorsFor(field)) {
        visibleErrors[field] = errors;
      }
    }
    return visibleErrors;
  }

  /**
   * Given a field name, return if eventual errors for the field should be visible. See `visibleErrors` for further details.
   */
  showErrorsFor(field) {
    return this.showAllValidations || (this.fields.get(field)?.validationEnabled ?? false);
  }
  async onSubmit(e) {
    e?.preventDefault();
    await this._validate();
    this.showAllValidations = true;
    if (!this.hasValidationErrors) {
      if (this.args.onSubmit) {
        this.submissionState = new TrackedAsyncData(this.args.onSubmit(this.effectiveData));
      }
    } else {
      assert('Validation errors expected to be present. If you see this, please report it as a bug to ember-headless-form!',
      // Do *not* use optional chaining due to https://github.com/ember-cli/babel-plugin-debug-macros/issues/89
      this.validationState && this.validationState.isResolved);
      this.args.onInvalid?.(this.effectiveData, this.validationState.value);
    }
  }
  async onReset(e) {
    e?.preventDefault();
    for (const key of Object.keys(this.internalData)) {
      delete this.internalData[key];
    }
    this.validationState = undefined;
    this.submissionState = undefined;
  }
  registerField(name, field) {
    // assert(`You passed @name="${String(name)}" to the form field, but this is already in use. Names of form fields must be unique!`, !this.fields.has(name));
    if (!this.fields.has(name)) {
      this.fields.set(name, new FieldData(field));
    } else {
      console.warn(`You passed @name="${String(name)}" to the form field, but this is already in use. Names of form fields must be unique!`);
    }
  }
  unregisterField(name) {
    this.fields.delete(name);
  }
  set(key, value) {
    // when @mutableData is set, our effectiveData is something we don't control, i.e. might require old-school set() to be on the safe side
    set(this.effectiveData, key, value);
  }

  /**
   * Handle the `@validateOn` event for a certain field, e.g. "blur".
   * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
   * Validation will be triggered, and the particular field will be marked to show eventual validation errors.
   */
  async handleFieldValidation(e) {
    let name;
    if (typeof e === 'string') {
      name = e;
    } else {
      const {
        target
      } = e;
      name = target.name;
    }
    if (name) {
      const field = this.fields.get(name);
      if (field) {
        await this._validate();
        field.validationEnabled = true;
      }
    } else if (e instanceof Event) {
      warn(`An event of type "${e.type}" was received by headless-form, which is supposed to trigger validations for a certain field. But the name of that field could not be determined. Make sure that your control element has a \`name\` attribute matching the field, or use the yielded \`{{field.captureEvents}}\` to capture the events.`, {
        id: 'headless-form.validation-event-for-unknown-field'
      });
    }
  }

  /**
   * Handle the `@revalidateOn` event for a certain field, e.g. "blur".
   * Associating the event with a field is done by looking at the event target's `name` attribute, which must match one of the `<form.field @name="...">` invocations by the user's template.
   * When a field has been already marked to show validation errors by `@validateOn`, then for revalidation another validation will be triggered.
   *
   * The use case here is to allow this to happen more frequently than the initial validation, e.g. `@validateOn="blur" @revalidateOn="change"`.
   */
  async handleFieldRevalidation(e) {
    const {
      target
    } = e;
    const {
      name
    } = target;
    if (name) {
      if (this.showErrorsFor(name)) {
        await this._validate();
      }
    } else {
      warn(`An event of type "${e.type}" was received by headless-form, which is supposed to trigger validations for a certain field. But the name of that field could not be determined. Make sure that your control element has a \`name\` attribute matching the field, or use the yielded \`{{field.captureEvents}}\` to capture the events.`, {
        id: 'headless-form.validation-event-for-unknown-field'
      });
    }
  }
}, (_applyDecoratedDescriptor(_class3.prototype, "effectiveData", [cached], Object.getOwnPropertyDescriptor(_class3.prototype, "effectiveData"), _class3.prototype), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "validationState", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, "submissionState", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, "showAllValidations", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class3.prototype, "onSubmit", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "onSubmit"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "onReset", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "onReset"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "registerField", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "registerField"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "unregisterField", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "unregisterField"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "set", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "set"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "handleFieldValidation", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "handleFieldValidation"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "handleFieldRevalidation", [action], Object.getOwnPropertyDescriptor(_class3.prototype, "handleFieldRevalidation"), _class3.prototype)), _class3));

export { HeadlessFormComponent as default };
//# sourceMappingURL=headless-form.js.map
