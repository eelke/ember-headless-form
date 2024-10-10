import Component from '@glimmer/component';
interface HeadlessFormControlCheckboxComponentSignature {
    Element: HTMLInputElement;
    Args: {
        value: boolean;
        name: string;
        fieldId: string;
        setValue: (value: boolean) => void;
        invalid: boolean;
        errorId: string;
    };
}
declare class HeadlessFormControlCheckboxComponent extends Component<HeadlessFormControlCheckboxComponentSignature> {
    handleInput(e: Event | InputEvent): void;
}
export { HeadlessFormControlCheckboxComponentSignature, HeadlessFormControlCheckboxComponent as default };
