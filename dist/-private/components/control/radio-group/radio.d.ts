import Component from '@glimmer/component';
import HeadlessFormLabelComponent from "../../label.js";
import HeadlessFormControlRadioInputComponent from "./radio/input.js";
import { WithBoundArgs } from '@glint/template';
interface HeadlessFormControlRadioComponentSignature {
    Args: {
        /**
         * The value of this individual radio control. All the radios that belong to the same field (have the same name) should have distinct values.
         */
        value: string;
        name: string;
        selected: string;
        setValue: (value: string) => void;
    };
    Blocks: {
        default: [
            {
                /**
                 * Yielded component that renders the `<label>` of this single radio element.
                 */
                Label: WithBoundArgs<typeof HeadlessFormLabelComponent, 'fieldId'>;
                /**
                 * Yielded component that renders the `<input type="radio">` element.
                 */
                Input: WithBoundArgs<typeof HeadlessFormControlRadioInputComponent, 'fieldId' | 'value' | 'setValue' | 'checked' | 'name'>;
            }
        ];
    };
}
declare class HeadlessFormControlRadioComponent extends Component<HeadlessFormControlRadioComponentSignature> {
    get isChecked(): boolean;
}
export { HeadlessFormControlRadioComponentSignature, HeadlessFormControlRadioComponent as default };
