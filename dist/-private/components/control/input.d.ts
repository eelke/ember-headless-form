import Component from '@glimmer/component';
type InputType = 'color' | 'date' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'range' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
interface HeadlessFormControlInputComponentSignature {
    Element: HTMLInputElement;
    Args: {
        /**
         * The `type` of the `<input>` element, by default `text`.
         *
         * Note that certain types should not be used, as they have dedicated control components:
         * - `checkbox`
         * - `radio`
         *
         * Also these types are not useful to use as input controls:
         * - `button`
         * - `file`
         * - `image`
         * - `reset`
         * - `submit`
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
         */
        type?: InputType;
        value: string | number;
        name: string;
        fieldId: string;
        setValue: (value: string | number) => void;
        invalid: boolean;
        errorId: string;
    };
}
declare class HeadlessFormControlInputComponent extends Component<HeadlessFormControlInputComponentSignature> {
    constructor(owner: unknown, args: HeadlessFormControlInputComponentSignature['Args']);
    get type(): InputType;
    handleInput(e: Event | InputEvent): void;
}
export { InputType, HeadlessFormControlInputComponentSignature, HeadlessFormControlInputComponent as default };
