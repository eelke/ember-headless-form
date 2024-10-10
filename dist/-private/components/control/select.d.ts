import Component from '@glimmer/component';
import HeadlessFormControlSelectOptionComponent from "./select/option.js";
import { WithBoundArgs } from '@glint/template';
interface HeadlessFormControlSelectComponentSignature {
    Element: HTMLSelectElement;
    Args: {
        value: string;
        name: string;
        fieldId: string;
        setValue: (value: string) => void;
        invalid: boolean;
        errorId: string;
    };
    Blocks: {
        default: [
            {
                Option: WithBoundArgs<typeof HeadlessFormControlSelectOptionComponent, 'selected'>;
            }
        ];
    };
}
declare class HeadlessFormControlSelectComponent extends Component<HeadlessFormControlSelectComponentSignature> {
    handleInput(e: Event | InputEvent): void;
}
export { HeadlessFormControlSelectComponentSignature, HeadlessFormControlSelectComponent as default };
