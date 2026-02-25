import { render, screen } from '@testing-library/react'
import { HeroUIProvider } from '@heroui/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { ColorLoadingButton } from './ColorLoadingButton'

function renderWithProvider(ui: ReactNode) {
  return render(<HeroUIProvider>{ui}</HeroUIProvider>)
}

describe('ColorLoadingButton', () => {
  it('renders a loading button with accessible name', () => {
    renderWithProvider(<ColorLoadingButton />)

    const button = screen.getByRole('button', { name: /Loading/i })
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('keeps the button disabled while loading', () => {
    renderWithProvider(<ColorLoadingButton />)

    const button = screen.getByRole('button', { name: /Loading/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('data-loading', 'true')
  })
})
