import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

class HeadlessFormControlSelectOptionComponent extends Component {
  get isSelected() {
    return this.args.selected === this.args.value;
  }
}
setComponentTemplate(precompileTemplate(`
    {{!
Ember seems to insist to set \`selected\` as a property instead of an attribute.
But an attribute is needed if you want to use this with SSR/FastBoot, so the selected option is preselected before JS has loaded.
Using this wonky workaround for now.
See https://github.com/emberjs/ember.js/issues/19115
}}
    {{#if this.isSelected}}
      <option value={{@value}} selected ...attributes>{{yield}}</option>
    {{else}}
      <option value={{@value}} ...attributes>{{yield}}</option>
    {{/if}}
  `, {
  strictMode: true
}), HeadlessFormControlSelectOptionComponent);

export { HeadlessFormControlSelectOptionComponent as default };
//# sourceMappingURL=option.js.map
