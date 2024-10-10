import templateOnly from '@ember/component/template-only';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';

const HeadlessFormControlRadioGroupLabelComponent = setComponentTemplate(precompileTemplate(`<div id={{@id}} ...attributes>{{yield}}</div>`, {
  strictMode: true
}), templateOnly("label", "HeadlessFormControlRadioGroupLabelComponent"));

export { HeadlessFormControlRadioGroupLabelComponent as default };
//# sourceMappingURL=label.js.map
