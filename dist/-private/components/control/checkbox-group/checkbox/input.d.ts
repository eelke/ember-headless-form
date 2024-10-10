import Component from '@glimmer/component';
interface HeadlessFormControlCheckboxInputComponentSignature {
    Element: HTMLInputElement;
    Args: {
        value: string;
        name: string;
        checked: boolean;
        fieldId: string;
        toggleValue: (value: boolean) => void;
    };
}
declare class HeadlessFormControlCheckboxComponent extends Component<HeadlessFormControlCheckboxInputComponentSignature> {
    handleInput(e: Event | InputEvent): void;
}
export { HeadlessFormControlCheckboxInputComponentSignature, HeadlessFormControlCheckboxComponent as default };
