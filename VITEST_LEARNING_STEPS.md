# Vitest Learning Path (Hard -> Easy)

This guide matches your requested order: **from hard to easy**.
All examples are based on:

- Component: `src/components/SizeButtons.tsx`
- Test file: `src/components/SizeButtons.test.tsx`

## Stage 1 (Hard): Interaction Contract

Goal: verify behavior, not just rendering.

What we test:

- Clicking buttons calls `onSizeSelect`.
- Arguments are correct (`lg`, `sm`, `md`).
- Call order is correct.
- Total calls are correct.

Key testing ideas:

- Use `userEvent` for real user-like clicks.
- Use `vi.fn()` to track callback calls.
- Use `toHaveBeenNthCalledWith` for strict call order contracts.

## Stage 2 (Medium): Structure and Stability

Goal: verify component shape and count constraints.

What we test:

- Container exists.
- Exactly 3 buttons exist.
- Snapshot exists for quick structural regression detection.

Key testing ideas:

- `getAllByRole('button')` for count checks.
- `toMatchSnapshot()` as a supporting guard (not your only assertion).

## Stage 3 (Easy): Presence by Accessible Name

Goal: verify visible output basics.

What we test:

- `Small`, `Medium`, and `Large` buttons are present.

Key testing ideas:

- Prefer `getByRole('button', { name: '...' })`.
- This aligns with accessible UI behavior and user perspective.

## Run Commands

Run all tests once:

```bash
npm test
```

Run in watch mode:

```bash
npm run test:watch
```

## Suggested Next Practice

1. Add a "Disabled" mode in `SizeButtons` and test non-clickable behavior.
2. Add keyboard interaction tests (`Tab`, `Enter`, `Space`).
3. Add negative tests (callback is optional and should not throw when missing).
4. Refactor with `test.each` for size labels and expected callback values.
