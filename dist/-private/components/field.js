import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { fn, hash } from '@ember/helper';
import { action, get } from '@ember/object';
import CaptureEventsModifier from '../modifiers/capture-events.js';
import { uniqueId } from '../utils.js';
import HeadlessFormControlCheckboxComponent from './control/checkbox.js';
import HeadlessFormControlCheckboxGroupComponent from './control/checkbox-group.js';
import HeadlessFormControlInputComponent from './control/input.js';
import HeadlessFormControlRadioGroupComponent from './control/radio-group.js';
import HeadlessFormControlSelectComponent from './control/select.js';
import HeadlessFormControlTextareaComponent from './control/textarea.js';
import HeadlessFormErrorsComponent from './errors.js';
import HeadlessFormLabelComponent from './label.js';

var _class;
let HeadlessFormFieldComponent = setComponentTemplate(precompileTemplate(`
    {{#let
      (uniqueId)
      (uniqueId)
      (fn @set @name)
      (fn @triggerValidationFor @name)
      as |fieldId errorId setValue triggerValidation|
    }}
      {{yield
        (hash
          Label=(component this.LabelComponent fieldId=fieldId)
          Input=(component
            this.InputComponent
            name=@name
            fieldId=fieldId
            errorId=errorId
            value=this.valueAsStringOrNumber
            setValue=this.setValue
            invalid=this.hasErrors
          )
          Checkbox=(component
            this.CheckboxComponent
            name=@name
            fieldId=fieldId
            errorId=errorId
            value=this.valueAsBoolean
            setValue=this.setValue
            invalid=this.hasErrors
          )
          Select=(component
            this.SelectComponent
            name=@name
            fieldId=fieldId
            errorId=errorId
            value=this.valueAsString
            setValue=this.setValue
            invalid=this.hasErrors
          )
          Textarea=(component
            this.TextareaComponent
            name=@name
            fieldId=fieldId
            errorId=errorId
            value=this.valueAsString
            setValue=this.setValue
            invalid=this.hasErrors
          )
          RadioGroup=(component
            this.RadioGroupComponent
            name=@name
            errorId=errorId
            selected=this.valueAsString
            setValue=this.setValue
            invalid=this.hasErrors
          )
          CheckboxGroup=(component
            this.CheckboxGroupComponent
            name=@name
            errorId=errorId
            selected=this.valueAllAsString
            setValue=this.setValue
            invalid=this.hasErrors
          )
          value=this.value
          setValue=setValue
          id=fieldId
          errorId=errorId
          Errors=(if
            this.errors
            (component this.ErrorsComponent errors=this.errors id=errorId)
          )
          isInvalid=this.hasErrors
          rawErrors=this.errors
          triggerValidation=triggerValidation
          captureEvents=(modifier
            this.CaptureEventsModifier
            event=(if
              this.hasErrors @fieldRevalidationEvent @fieldValidationEvent
            )
            triggerValidation=triggerValidation
          )
        )
      }}
    {{/let}}
  `, {
  strictMode: true,
  scope: () => ({
    uniqueId,
    fn,
    hash
  })
}), (_class = class HeadlessFormFieldComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "LabelComponent", HeadlessFormLabelComponent);
    _defineProperty(this, "InputComponent", HeadlessFormControlInputComponent);
    _defineProperty(this, "CheckboxComponent", HeadlessFormControlCheckboxComponent);
    _defineProperty(this, "ErrorsComponent", HeadlessFormErrorsComponent);
    _defineProperty(this, "SelectComponent", HeadlessFormControlSelectComponent);
    _defineProperty(this, "TextareaComponent", HeadlessFormControlTextareaComponent);
    _defineProperty(this, "RadioGroupComponent", HeadlessFormControlRadioGroupComponent);
    _defineProperty(this, "CheckboxGroupComponent", HeadlessFormControlCheckboxGroupComponent);
    _defineProperty(this, "CaptureEventsModifier", CaptureEventsModifier);
    assert('Nested property paths in @name are not supported.', typeof this.args.name !== 'string' || !this.args.name.includes('.'));
    this.args.registerField(this.args.name, {
      validate: this.args.validate
    });
  }
  willDestroy() {
    this.args.unregisterField(this.args.name);
    super.willDestroy();
  }
  get value() {
    // when @mutableData is set, data is something we don't control, i.e. might require old-school get() to be on the safe side
    // we do not want to support nested property paths for now though, see the constructor assertion!
    return get(this.args.data, this.args.name);
  }
  get errors() {
    return this.args.errors?.[this.args.name];
  }
  get hasErrors() {
    return this.errors !== undefined;
  }
  get valueAsString() {
    assert(`Only string values are expected for ${String(this.args.name)}, but you passed ${typeof this.value}`, typeof this.value === 'undefined' || typeof this.value === 'string');
    return this.value;
  }
  get valueAllAsString() {
    assert(`Only string values are expected for ${String(this.args.name)}`, typeof this.value === 'undefined' || Array.isArray(this.value) && this.value.every(v => typeof v === 'string'));
    return this.value ?? [];
  }
  get valueAsStringOrNumber() {
    assert(`Only string or number values are expected for ${String(this.args.name)}, but you passed ${typeof this.value}`, typeof this.value === 'undefined' || typeof this.value === 'string' || typeof this.value === 'number');
    return this.value;
  }
  get valueAsBoolean() {
    assert(`Only boolean values are expected for ${String(this.args.name)}, but you passed ${typeof this.value}`, typeof this.value === 'undefined' || typeof this.value === 'boolean');
    return this.value;
  }
  setValue(value) {
    this.args.set(this.args.name, value);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "setValue", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setValue"), _class.prototype)), _class));

export { HeadlessFormFieldComponent as default };
//# sourceMappingURL=field.js.map
