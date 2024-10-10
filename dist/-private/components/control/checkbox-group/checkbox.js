import _applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { action } from '@ember/object';
import { uniqueId } from '../../../utils.js';
import HeadlessFormLabelComponent from '../../label.js';
import HeadlessFormControlCheckboxComponent$1 from './checkbox/input.js';

var _class;
let HeadlessFormControlCheckboxComponent = setComponentTemplate(precompileTemplate(`
    {{#let (uniqueId) as |uuid|}}
      {{yield
        (hash
          Label=(component HeadlessFormLabelComponent fieldId=uuid)
          Input=(component
            HeadlessFormControlCheckboxInputComponent
            name=@name
            fieldId=uuid
            value=@value
            checked=this.isChecked
            toggleValue=this.toggleValue
          )
        )
      }}
    {{/let}}
  `, {
  strictMode: true,
  scope: () => ({
    uniqueId,
    hash,
    HeadlessFormLabelComponent,
    HeadlessFormControlCheckboxInputComponent: HeadlessFormControlCheckboxComponent$1
  })
}), (_class = class HeadlessFormControlCheckboxComponent extends Component {
  get isChecked() {
    return this.args.selected.includes(this.args.value);
  }
  toggleValue(checked) {
    if (checked) {
      this.args.setValue([...this.args.selected, this.args.value]);
    } else {
      this.args.setValue([...this.args.selected.filter(v => v !== this.args.value)]);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "toggleValue", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleValue"), _class.prototype)), _class));

export { HeadlessFormControlCheckboxComponent as default };
//# sourceMappingURL=checkbox.js.map
