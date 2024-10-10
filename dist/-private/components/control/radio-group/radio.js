import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { uniqueId } from '../../../utils.js';
import HeadlessFormLabelComponent from '../../label.js';
import HeadlessFormControlRadioInputComponent from './radio/input.js';

class HeadlessFormControlRadioComponent extends Component {
  get isChecked() {
    return this.args.selected === this.args.value;
  }
}
setComponentTemplate(precompileTemplate(`
    {{#let (uniqueId) as |uuid|}}
      {{yield
        (hash
          Label=(component HeadlessFormLabelComponent fieldId=uuid)
          Input=(component
            HeadlessFormControlRadioInputComponent
            name=@name
            fieldId=uuid
            value=@value
            checked=this.isChecked
            setValue=@setValue
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
    HeadlessFormControlRadioInputComponent
  })
}), HeadlessFormControlRadioComponent);

export { HeadlessFormControlRadioComponent as default };
//# sourceMappingURL=radio.js.map
