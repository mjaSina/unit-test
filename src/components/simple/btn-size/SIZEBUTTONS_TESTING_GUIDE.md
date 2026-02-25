# Testing `SizeButtons` with Vitest + Testing Library

This guide explains how to test these two files:

- `src/components/simple/btn-size/SizeButtons.tsx`
- `src/components/simple/btn-size/SizeButtons.test.tsx`

The goal is to help you understand **how to think about test writing**, not only what to type.

---

## 1) Understand the Component First

`SizeButtons` renders 3 buttons:

- `Small` -> calls `onSizeSelect('sm')`
- `Medium` -> calls `onSizeSelect('md')`
- `Large` -> calls `onSizeSelect('lg')`

Important detail:

- `onSizeSelect` is optional (`?`), so the component should not crash if it is not passed.

Before writing tests, always ask:

1. What should the user see?
2. What should happen when the user interacts?
3. What contract should stay stable over time?

---

## 2) Why the Test Uses `renderWithProvider`

In your test file, there is:

```tsx
function renderWithProvider(ui: ReactNode) {
  return render(<HeroUIProvider>{ui}</HeroUIProvider>)
}
```

This wraps the component with `HeroUIProvider`.

Why this matters:

- HeroUI components often expect context from the provider.
- Without provider, behavior or rendering can be incomplete in tests.
- A helper function avoids repeating wrapper code in every test.

---

## 3) Test Levels in Your File (Hard -> Medium -> Easy)

Your file is organized by difficulty, which is a very good learning style.

### Level 3 (Hard): Interaction Contract

This test checks behavior:

- It clicks `Large`, then `Small`, then `Medium`.
- It verifies callback arguments and exact order.
- It verifies total call count.

Why this is powerful:

- It protects business behavior, not just UI text.
- It catches regressions like:
  - wrong mapping (`Large` accidentally sending `'md'`)
  - wrong order
  - callback called too many/few times

Core assertions used:

- `toHaveBeenNthCalledWith(1, 'lg')`
- `toHaveBeenNthCalledWith(2, 'sm')`
- `toHaveBeenNthCalledWith(3, 'md')`
- `toHaveBeenCalledTimes(3)`

### Level 2 (Medium): Structure Assertions

This test checks component shape:

- Container exists (`data-testid="size-buttons-container"`).
- Exactly 3 buttons exist.
- Snapshot is stable.

Why this is useful:

- Fast signal when structure unexpectedly changes.
- Button count check prevents accidental add/remove.
- Snapshot helps catch broad markup changes quickly.

Note:

- Snapshot should support focused assertions, not replace them.

### Level 1 (Easy): Text/Presence Checks

This test verifies basics:

- `Small`, `Medium`, `Large` buttons are present.

Good practice used here:

- Query by accessible role/name:
  - `getByRole('button', { name: 'Small' })`

This matches real user and accessibility behavior better than class selectors.

---

## 4) Why `userEvent` Instead of `fireEvent`

You used:

```tsx
const user = userEvent.setup()
await user.click(...)
```

Benefits:

- Closer to real user interaction.
- Async-friendly and more realistic event sequence.
- Better for confidence in UI behavior.

Rule of thumb:

- Prefer `userEvent` for interactions.
- Use `fireEvent` only for lower-level cases.

---

## 5) Test Writing Pattern You Can Reuse

When writing a new component test, follow this flow:

1. **Arrange**  
   Render component, prepare mocks (`vi.fn()`), wrappers/providers.

2. **Act**  
   Simulate user behavior (`await user.click(...)`).

3. **Assert**  
   Check exactly what should happen:
   - visible result
   - callback contract
   - call counts/order when needed

This AAA pattern keeps tests clear and maintainable.

---

## 6) Suggested Extra Tests for Practice

To improve your skills, add these:

1. **No callback provided**
   - Render `<SizeButtons />`
   - Click all buttons
   - Expect no error (component is safe with optional callback)

2. **Data-driven test with `test.each`**
   - Reduce repetition for label -> value mapping
   - Example mapping:
     - `Small` -> `'sm'`
     - `Medium` -> `'md'`
     - `Large` -> `'lg'`

3. **Keyboard interaction**
   - Focus with `Tab`
   - Trigger with `Enter` / `Space`
   - Verify callback still works

4. **Negative regression check**
   - Ensure there are exactly 3 buttons (already present, keep it)

---

## 7) Common Mistakes to Avoid

- Asserting implementation details (internal state) instead of user-visible behavior.
- Overusing snapshots without specific assertions.
- Not using providers needed by the UI library.
- Forgetting `await` with `userEvent` actions.
- Using brittle selectors instead of role/name queries.

---

## 8) Quick Commands

Run tests once:

```bash
npm test
```

Run in watch mode:

```bash
npm run test:watch
```

---

If you want, I can also add a second version of `SizeButtons.test.tsx` that uses `test.each` so you can compare both styles side by side.
