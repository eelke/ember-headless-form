import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

var _class;
let HeadlessFormControlTextareaComponent = setComponentTemplate(precompileTemplate(`
    <textarea
      name={{@name}}
      id={{@fieldId}}
      aria-invalid={{if @invalid "true"}}
      aria-describedby={{if @invalid @errorId}}
      ...attributes
      {{on "input" this.handleInput}}
    >{{@value}}</textarea>
  `, {
  strictMode: true,
  scope: () => ({
    on
  })
}), (_class = class HeadlessFormControlTextareaComponent extends Component {
  handleInput(e) {
    this.args.setValue(e.target.value);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "handleInput", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleInput"), _class.prototype)), _class));

export { HeadlessFormControlTextareaComponent as default };
//# sourceMappingURL=textarea.js.map
