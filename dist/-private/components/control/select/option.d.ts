import Component from '@glimmer/component';
interface HeadlessFormControlSelectOptionComponentSignature {
    Element: HTMLOptionElement;
    Args: {
        /**
         * The select's value when this option is selected
         */
        value: string;
        selected: string;
    };
    Blocks: {
        default: [];
    };
}
declare class HeadlessFormControlSelectOptionComponent extends Component<HeadlessFormControlSelectOptionComponentSignature> {
    get isSelected(): boolean;
}
export { HeadlessFormControlSelectOptionComponentSignature, HeadlessFormControlSelectOptionComponent as default };
