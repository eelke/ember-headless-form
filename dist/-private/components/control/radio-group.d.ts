/// <reference types="ember__component" />
import HeadlessFormControlRadioGroupLabelComponent from "./radio-group/label.js";
import HeadlessFormControlRadioComponent from "./radio-group/radio.js";
import { TemplateOnlyComponent } from '@ember/component/template-only';
import { WithBoundArgs } from '@glint/template';
interface HeadlessFormControlRadioGroupComponentSignature {
    Element: HTMLDivElement;
    Args: {
        name: string;
        selected: string;
        setValue: (value: string) => void;
        invalid: boolean;
        errorId: string;
    };
    Blocks: {
        default: [
            {
                /**
                 * Yielded component that renders the `<input type="radio">` element.
                 */
                Radio: WithBoundArgs<typeof HeadlessFormControlRadioComponent, 'name' | 'selected' | 'setValue'>;
                Label: WithBoundArgs<typeof HeadlessFormControlRadioGroupLabelComponent, 'id'>;
            }
        ];
    };
}
declare const HeadlessFormControlRadioGroupComponent: TemplateOnlyComponent<HeadlessFormControlRadioGroupComponentSignature>;
export { HeadlessFormControlRadioGroupComponent as default, HeadlessFormControlRadioGroupComponentSignature };
