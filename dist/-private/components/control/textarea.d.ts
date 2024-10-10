import Component from '@glimmer/component';
interface HeadlessFormControlTextareaComponentSignature {
    Element: HTMLTextAreaElement;
    Args: {
        value: string;
        name: string;
        fieldId: string;
        setValue: (value: string) => void;
        invalid: boolean;
        errorId: string;
    };
}
declare class HeadlessFormControlTextareaComponent extends Component<HeadlessFormControlTextareaComponentSignature> {
    handleInput(e: Event | InputEvent): void;
}
export { HeadlessFormControlTextareaComponentSignature, HeadlessFormControlTextareaComponent as default };
