/// <reference types="ember__component" />
import HeadlessFormControlCheckboxComponent from "./checkbox-group/checkbox.js";
import HeadlessFormControlCheckboxGroupLabelComponent from "./checkbox-group/label.js";
import { TemplateOnlyComponent } from '@ember/component/template-only';
import { WithBoundArgs } from '@glint/template';
interface HeadlessFormControlCheckboxGroupComponentSignature {
    Element: HTMLDivElement;
    Args: {
        name: string;
        selected: string[];
        setValue: (value: string[]) => void;
        invalid: boolean;
        errorId: string;
    };
    Blocks: {
        default: [
            {
                /**
                 * Yielded component that renders the `<input type="checkbox">` element.
                 */
                Checkbox: WithBoundArgs<typeof HeadlessFormControlCheckboxComponent, 'name' | 'selected' | 'setValue'>;
                Label: WithBoundArgs<typeof HeadlessFormControlCheckboxGroupLabelComponent, 'id'>;
            }
        ];
    };
}
declare const HeadlessFormControlCheckboxGroupComponent: TemplateOnlyComponent<HeadlessFormControlCheckboxGroupComponentSignature>;
export { HeadlessFormControlCheckboxGroupComponent as default, HeadlessFormControlCheckboxGroupComponentSignature };
//# sourceMappingURL=-private/components/control/checkbox-group.d.ts.map