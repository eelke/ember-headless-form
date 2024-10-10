/**
 * What the user can pass as @data
 */
type UserData = object;
/**
 * The subset of properties of DATA, whose keys are strings (and not number or symbol)
 * Only this data is useable in the form
 */
type FormData<DATA extends UserData = UserData> = OnlyStringKeys<DATA>;
/**
 * Returns the type of all keys of DATA, that are also strings. Only strings can be used as field @name
 */
type FormKey<DATA extends UserData> = keyof DATA & string;
/**
 * Generic interface for all validation errors
 */
interface ValidationError<T = unknown> {
    type: string;
    value: T;
    message?: string;
}
type ErrorRecord<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> = Partial<Record<KEY, ValidationError<DATA[KEY]>[]>>;
/**
 * Callback used for form level validation
 */
type FormValidateCallback<DATA extends FormData> = (formData: DATA, fields: Array<FormKey<DATA>>) => undefined | ErrorRecord<DATA> | Promise<undefined | ErrorRecord<DATA>>;
/**
 * Callback used for field level validation
 */
type FieldValidateCallback<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> = (fieldValue: DATA[KEY], fieldName: KEY, formData: DATA) => undefined | ValidationError<DATA[KEY]>[] | Promise<undefined | ValidationError<DATA[KEY]>[]>;
/**
 * Internal structure to track used fields
 * @private
 */
interface FieldRegistrationData<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> {
    validate?: FieldValidateCallback<DATA, KEY>;
}
/**
 * For internal field registration
 * @private
 */
type RegisterFieldCallback<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> = (name: KEY, field: FieldRegistrationData<DATA, KEY>) => void;
type UnregisterFieldCallback<DATA extends FormData, KEY extends FormKey<DATA> = FormKey<DATA>> = (name: KEY) => void;
/**
 * Mapper type to construct subset of objects, whose keys are only strings (and not number or symbol)
 */
type OnlyStringKeys<T extends object> = Pick<T, keyof T & string>;
export { UserData, FormData, FormKey, ValidationError, ErrorRecord, FormValidateCallback, FieldValidateCallback, FieldRegistrationData, RegisterFieldCallback, UnregisterFieldCallback, OnlyStringKeys };
