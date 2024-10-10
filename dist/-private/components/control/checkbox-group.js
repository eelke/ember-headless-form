import templateOnly from '@ember/component/template-only';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import { hash } from '@ember/helper';
import { uniqueId } from '../../utils.js';
import HeadlessFormControlCheckboxComponent from './checkbox-group/checkbox.js';
import HeadlessFormControlCheckboxGroupLabelComponent from './checkbox-group/label.js';

const HeadlessFormControlCheckboxGroupComponent = setComponentTemplate(precompileTemplate(`
    {{#let (uniqueId) as |labelId|}}
      <div
        role="group"
        aria-labelledby={{labelId}}
        aria-invalid={{if @invalid "true"}}
        aria-describedby={{if @invalid @errorId}}
        ...attributes
      >
        {{yield
          (hash
            Checkbox=(component
              HeadlessFormControlCheckboxComponent
              name=@name
              selected=@selected
              setValue=@setValue
            )
            Label=(component
              HeadlessFormControlCheckboxGroupLabelComponent id=labelId
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
    HeadlessFormControlCheckboxComponent,
    HeadlessFormControlCheckboxGroupLabelComponent
  })
}), templateOnly("checkbox-group", "HeadlessFormControlCheckboxGroupComponent"));

export { HeadlessFormControlCheckboxGroupComponent as default };
//# sourceMappingURL=checkbox-group.js.map
