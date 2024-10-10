import HeadlessFormComponent from "./components/headless-form.js";
interface Registry {
    /**
     * Headless form component.
     *
     * @example
     * Usage example:
     *
     * ```hbs
     * <HeadlessForm
     *   @data={{this.data}}
     *   @validateOn="focusout"
     *   @revalidateOn="input"
     *   @onSubmit={{this.doSomething}}
     *   as |form|
     * >
     *   <form.Field @name="firstName" as |field|>
     *     <div>
     *       <field.Label>First name</field.Label>
     *       <field.Input
     *         required
     *       />
     *       <field.errors />
     *     </div>
     *   </form.Field>
     *
     *   <button
     *     type="submit"
     *   >Submit</button>
     * </HeadlessForm>
     * ```
     */
    HeadlessForm: typeof HeadlessFormComponent;
}
export { Registry as default };
