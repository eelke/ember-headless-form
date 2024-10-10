import templateOnly from '@ember/component/template-only';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';

const HeadlessFormLabelComponent = setComponentTemplate(precompileTemplate(`
    <label for={{@fieldId}} ...attributes>
      {{yield}}
    </label>
  `, {
  strictMode: true
}), templateOnly("label", "HeadlessFormLabelComponent"));

export { HeadlessFormLabelComponent as default };
//# sourceMappingURL=label.js.map
