import { modifier } from 'ember-modifier';

const CaptureEventsModifier = modifier((element, _pos, {
  event,
  triggerValidation
}) => {
  if (event) {
    element.addEventListener(event, triggerValidation, {
      passive: true
    });
    return () => {
      element.removeEventListener(event, triggerValidation);
    };
  }
});

export { CaptureEventsModifier as default };
//# sourceMappingURL=capture-events.js.map
