import templateOnly from '@ember/component/template-only';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import { hash } from '@ember/helper';
import { uniqueId } from '../../utils.js';
import HeadlessFormControlRadioGroupLabelComponent from './radio-group/label.js';
import HeadlessFormControlRadioComponent from './radio-group/radio.js';

const HeadlessFormControlRadioGroupComponent = setComponentTemplate(precompileTemplate(`
    {{#let (uniqueId) as |labelId|}}
      <div
        role="radiogroup"
        aria-labelledby={{labelId}}
        aria-invalid={{if @invalid "true"}}
        aria-describedby={{if @invalid @errorId}}
        ...attributes
      >
        {{yield
          (hash
            Radio=(component
              HeadlessFormControlRadioComponent
              name=@name
              selected=@selected
              setValue=@setValue
            )
            Label=(component
              HeadlessFormControlRadioGroupLabelComponent id=labelId
            )
          )
        }}
      </div>
    {{/let}}
  `, {
  strictMode: true,
  scope: () => ({
    uniqueId,
    hash,
    HeadlessFormControlRadioComponent,
    HeadlessFormControlRadioGroupLabelComponent
  })
}), templateOnly("radio-group", "HeadlessFormControlRadioGroupComponent"));

export { HeadlessFormControlRadioGroupComponent as default };
//# sourceMappingURL=radio-group.js.map
