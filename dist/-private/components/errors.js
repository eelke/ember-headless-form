import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import Component from '@glimmer/component';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes -- unfortunately we cannot use templateOnlyComponent() here, as it is not possible to type that as a generic type, like templateOnlyComponent<HeadlessFormErrorsComponentSignature<VALUE>>
class HeadlessFormErrorsComponent extends Component {}
setComponentTemplate(precompileTemplate(`
    <div id={{@id}} aria-live="assertive" ...attributes>
      {{#if (has-block)}}
        {{yield @errors}}
      {{else}}
        {{#each @errors as |e|}}
          {{#if e.message}}
            {{e.message}}<br />
          {{/if}}
        {{/each}}
      {{/if}}
    </div>
  `, {
  strictMode: true
}), HeadlessFormErrorsComponent);

export { HeadlessFormErrorsComponent as default };
//# sourceMappingURL=errors.js.map
