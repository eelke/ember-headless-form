import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

var _class;

// Possible values for the input type, see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
// for the sake of completeness, we list all here, with some commented out that are better handled elsewhere, or not at all...
let HeadlessFormControlInputComponent = setComponentTemplate(precompileTemplate(`
    <input
      name={{@name}}
      type={{@type}}
      value={{@value}}
      id={{@fieldId}}
      aria-invalid={{if @invalid "true"}}
      aria-describedby={{if @invalid @errorId}}
      ...attributes
      {{on "input" this.handleInput}}
    />
  `, {
  strictMode: true,
  scope: () => ({
    on
  })
}), (_class = class HeadlessFormControlInputComponent extends Component {
  constructor(owner, args) {
    assert(`input component does not support @type="${args.type}" as there is a dedicated component for this. Please use the \`field.${args.type}\` instead!`, args.type === undefined ||
    // TS would guard us against using an unsupported `InputType`, but for JS consumers we add a dev-only runtime check here
    !['checkbox', 'radio'].includes(args.type));
    super(owner, args);
  }
  get type() {
    return this.args.type ?? 'text';
  }
  handleInput(e) {
    assert('Expected HTMLInputElement', e.target instanceof HTMLInputElement);
    this.args.setValue(this.type === 'number' ? parseFloat(e.target.value) : e.target.value);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "handleInput", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleInput"), _class.prototype)), _class));

export { HeadlessFormControlInputComponent as default };
//# sourceMappingURL=input.js.map
