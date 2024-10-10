import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

var _class;
let HeadlessFormControlCheckboxComponent = setComponentTemplate(precompileTemplate(`
    <input
      name={{@name}}
      type="checkbox"
      value={{@value}}
      checked={{@checked}}
      id={{@fieldId}}
      ...attributes
      {{on "change" this.handleInput}}
    />
  `, {
  strictMode: true,
  scope: () => ({
    on
  })
}), (_class = class HeadlessFormControlCheckboxComponent extends Component {
  handleInput(e) {
    this.args.toggleValue(e.target.checked);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "handleInput", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleInput"), _class.prototype)), _class));

export { HeadlessFormControlCheckboxComponent as default };
//# sourceMappingURL=input.js.map
