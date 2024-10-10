import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import HeadlessFormControlSelectOptionComponent from './select/option.js';

var _class;
let HeadlessFormControlSelectComponent = setComponentTemplate(precompileTemplate(`
    <select
      name={{@name}}
      value={{@value}}
      id={{@fieldId}}
      aria-invalid={{if @invalid "true"}}
      aria-describedby={{if @invalid @errorId}}
      ...attributes
      {{on "input" this.handleInput}}
    >
      {{yield
        (hash
          Option=(component
            HeadlessFormControlSelectOptionComponent selected=@value
          )
        )
      }}
    </select>
  `, {
  strictMode: true,
  scope: () => ({
    on,
    hash,
    HeadlessFormControlSelectOptionComponent
  })
}), (_class = class HeadlessFormControlSelectComponent extends Component {
  handleInput(e) {
    this.args.setValue(e.target.value);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "handleInput", [action], Object.getOwnPropertyDescriptor(_class.prototype, "handleInput"), _class.prototype)), _class));

export { HeadlessFormControlSelectComponent as default };
//# sourceMappingURL=select.js.map
