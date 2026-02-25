import { render, screen } from '@testing-library/react'
import { HeroUIProvider } from '@heroui/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { MultiColorButton, type MultiColorButtonColor } from './MultiColorButton'

function renderWithProvider(ui: ReactNode) {
  return render(<HeroUIProvider>{ui}</HeroUIProvider>)
}

describe('MultiColorButton', () => {
  it.each<MultiColorButtonColor>(['secondary', 'primary', 'info', 'light'])(
    'renders with %s color and custom label',
    (color) => {
      const label = `My ${color} action`
      renderWithProvider(<MultiColorButton color={color} label={label} />)

      const button = screen.getByRole('button', { name: label })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('data-color', color)
    }
  )

  it('uses default values when props are omitted', () => {
    renderWithProvider(<MultiColorButton />)

    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-color', 'primary')
  })
})
