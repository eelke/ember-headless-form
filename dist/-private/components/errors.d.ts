import Component from '@glimmer/component';
import { ValidationError } from "../types.js";
interface HeadlessFormErrorsComponentSignature<VALUE> {
    Element: HTMLDivElement;
    Args: {
        errors: ValidationError<VALUE>[];
        id: string;
    };
    Blocks: {
        default?: [ValidationError<VALUE>[]];
    };
}
declare class HeadlessFormErrorsComponent<VALUE> extends Component<HeadlessFormErrorsComponentSignature<VALUE>> {
}
export { HeadlessFormErrorsComponentSignature, HeadlessFormErrorsComponent as default };
