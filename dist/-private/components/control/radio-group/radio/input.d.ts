/// <reference types="ember__component" />
import { TemplateOnlyComponent } from '@ember/component/template-only';
interface HeadlessFormControlRadioInputComponentSignature {
    Element: HTMLInputElement;
    Args: {
        value: string;
        name: string;
        checked: boolean;
        fieldId: string;
        setValue: (value: string) => void;
    };
}
declare const HeadlessFormControlRadioInputComponent: TemplateOnlyComponent<HeadlessFormControlRadioInputComponentSignature>;
export { HeadlessFormControlRadioInputComponent as default, HeadlessFormControlRadioInputComponentSignature };
