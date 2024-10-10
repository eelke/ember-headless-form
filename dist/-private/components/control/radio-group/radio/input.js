import templateOnly from '@ember/component/template-only';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

const HeadlessFormControlRadioInputComponent = setComponentTemplate(precompileTemplate(`
    <input
      name={{@name}}
      type="radio"
      value={{@value}}
      checked={{@checked}}
      id={{@fieldId}}
      ...attributes
      {{on "change" (fn @setValue @value)}}
    />
  `, {
  strictMode: true,
  scope: () => ({
    on,
    fn
  })
}), templateOnly("input", "HeadlessFormControlRadioInputComponent"));

export { HeadlessFormControlRadioInputComponent as default };
//# sourceMappingURL=input.js.map
