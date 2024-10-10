import { ErrorRecord, FormData, FormKey } from "./types.js";
declare function mergeErrorRecord<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>>(...records: Array<ErrorRecord<DATA, KEY> | undefined>): ErrorRecord<DATA, KEY>;
declare function uniqueId(): any;
export { mergeErrorRecord, uniqueId };
