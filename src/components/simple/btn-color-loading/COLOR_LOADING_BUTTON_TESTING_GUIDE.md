# How to Test `ColorLoadingButton`

This guide explains the testing approach for:

- `src/components/simple/btn-color-loading/ColorLoadingButton.tsx`
- `src/components/simple/btn-color-loading/ColorLoadingButton.test.tsx`

---

## Component Behavior (What We Need to Validate)

`ColorLoadingButton` renders a HeroUI `Button` with:

- `isLoading`
- `color="primary"`
- visible text: `Loading`

So our tests should confirm:

1. The button is rendered and discoverable.
2. The button is disabled while loading.
3. Loading state is active in the rendered output.

---

## Why We Use `renderWithProvider`

In the test file, we use:

```tsx
function renderWithProvider(ui: ReactNode) {
  return render(<HeroUIProvider>{ui}</HeroUIProvider>)
}
```

Reason:

- HeroUI components rely on provider context.
- Wrapping once in a helper keeps tests clean and reusable.

---

## Test 1: Render + Accessible Query

```tsx
const button = screen.getByRole('button', { name: /Loading/i })
expect(button).toBeInTheDocument()
expect(screen.getByText('Loading')).toBeInTheDocument()
```

What this verifies:

- There is a real `button` in the DOM.
- It can be found by accessible name (good accessibility-oriented testing).
- The visible label `Loading` exists.

Why `name: /Loading/i` (regex) is used:

- HeroUI loading button can produce an accessible name that includes loading text more than once.
- Regex keeps the test stable while still checking the correct label.

---

## Test 2: Loading State Contract

```tsx
const button = screen.getByRole('button', { name: /Loading/i })
expect(button).toBeDisabled()
expect(button).toHaveAttribute('data-loading', 'true')
```

What this verifies:

- `isLoading` makes the button disabled (important UX contract).
- HeroUI loading marker (`data-loading="true"`) is present.

This catches regressions such as:

- Button accidentally becoming clickable during loading.
- Loading state not being applied correctly.

---

## Testing Pattern Used (AAA)

Each test follows the Arrange / Act / Assert pattern:

1. **Arrange**: render component with `HeroUIProvider`
2. **Act**: (none needed here because state is initial)
3. **Assert**: check role, text, disabled state, and loading attribute

This pattern keeps tests simple and maintainable.

---

## Best Practices Used Here

- Query by role/name (`getByRole`) instead of class names.
- Keep assertions focused on user-visible behavior and contract.
- Use provider wrapper for UI libraries that need context.
- Add one clear purpose per test case.

---

## How to Run This Test

Run only this file:

```bash
npm test -- src/components/simple/btn-color-loading/ColorLoadingButton.test.tsx
```

Run all tests:

```bash
npm test
```

---

## Suggested Next Practice

If you want to level up, create a second component that toggles loading on click, then test:

- initial state (not loading)
- after click (loading true)
- button becomes disabled during async operation
