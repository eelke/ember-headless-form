interface CaptureEventsModifierSignature {
    Element: HTMLElement;
    Args: {
        Named: {
            event: 'focusout' | 'change' | 'input' | undefined;
            triggerValidation(): void;
        };
    };
}
declare const CaptureEventsModifier: import("ember-modifier").FunctionBasedModifier<{
    Element: HTMLElement;
    Args: {
        Named: {
            event: 'focusout' | 'change' | 'input' | undefined;
            triggerValidation(): void;
        };
        Positional: [];
    };
}>;
export { CaptureEventsModifier as default, CaptureEventsModifierSignature };
