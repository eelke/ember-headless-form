import Component from '@glimmer/component';
import HeadlessFormLabelComponent from "../../label.js";
import HeadlessFormControlCheckboxInputComponent from "./checkbox/input.js";
import { WithBoundArgs } from '@glint/template';
interface HeadlessFormControlCheckboxComponentSignature {
    Args: {
        /**
         * The value of this individual checkbox control. All the checkboxs that belong to the same field (have the same name) should have distinct values.
         */
        value: string;
        name: string;
        selected: string[];
        setValue: (value: string[]) => void;
    };
    Blocks: {
        default: [
            {
                /**
                 * Yielded component that renders the `<label>` of this single checkbox element.
                 */
                Label: WithBoundArgs<typeof HeadlessFormLabelComponent, 'fieldId'>;
                /**
                 * Yielded component that renders the `<input type="checkbox">` element.
                 */
                Input: WithBoundArgs<typeof HeadlessFormControlCheckboxInputComponent, 'fieldId' | 'value' | 'toggleValue' | 'checked' | 'name'>;
            }
        ];
    };
}
declare class HeadlessFormControlCheckboxComponent extends Component<HeadlessFormControlCheckboxComponentSignature> {
    get isChecked(): boolean;
    toggleValue(checked: boolean): void;
}
export { HeadlessFormControlCheckboxComponentSignature, HeadlessFormControlCheckboxComponent as default };
