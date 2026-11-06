# Animation and Motion Quality Assurance

## Core principle
A visually smooth animation is not defined by the number of CSS keyframes. Browsers interpolate between keyframes. Quality is defined by whether the intended choreography, state transitions, timing, interaction and final layout are correct.

## Motion specification template
For each meaningful animation document:
- Name and purpose.
- Trigger and initial state.
- Origin/anchor and coordinate system.
- Semantic stages in order.
- Duration per stage and total duration.
- Easing/spring parameters and overlap.
- Visual properties changed (transform, opacity, clip-path, filter, layout).
- Final visual state and data/layout synchronization.
- Interruption, cancellation, repeated input and failure behavior.
- Reduced-motion alternative.
- Responsive/viewport constraints.

## Multi-stage choreography checklist
Example for a delete-to-trash animation:
1. User activates delete; confirmation UI appears from the correct origin.
2. Confirm action locks duplicate destructive submissions without freezing unrelated controls.
3. Item is snapshotted from its real bounding box.
4. Trash/bin enters from the correct screen edge.
5. Lid opens and reaches a stable open state.
6. Item moves/deforms toward the aperture with continuous interpolation.
7. Item is visually consumed; data mutation completes or failure is handled.
8. Lid closes; bin exits; remaining layout settles.
9. Toast and final data state agree with the actual server result.

Do not copy this choreography to unrelated actions. Each animation must represent its actual task.

## Implementation quality
- Prefer transform/opacity for high-frequency motion; measure expensive filter/blur/layout animation.
- Use stable layout IDs or measured geometry for shared-element transitions.
- Keep portals, stacking contexts, clipping and scroll containers in mind.
- Avoid animation state being the source of truth for persisted data.
- Ensure API success/failure, cancellation and rapid repeat clicks resolve to a consistent final state.
- Avoid perpetual animation for a completed or failed task.
- Respect prefers-reduced-motion and provide a clear non-motion state.

## Browser verification
When browser tooling exists:
- Test the exact user interaction on the real rendered page.
- Capture initial, intermediate and final states.
- Verify the complete sequence and timing, not just CSS declarations.
- Check z-index, clipping, scroll, viewport resize, touch and keyboard interaction.
- Test reduced-motion mode.
- Test slow API, API failure, double-click and navigation during animation.
- Inspect console/runtime errors and ensure data state matches the visual result.

If browser tooling is unavailable, report browser motion QA as NOT VERIFIED. Source review alone is not a visual pass.
