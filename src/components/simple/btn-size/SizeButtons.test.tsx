import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroUIProvider } from '@heroui/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { SizeButtons } from './SizeButtons'

function renderWithProvider(ui: ReactNode) {
  return render(<HeroUIProvider>{ui}</HeroUIProvider>)
}

describe('Level 3 (Hard): interaction contract', () => {
  it('calls onSizeSelect with exact values in click order', async () => {
    const user = userEvent.setup()
    const onSizeSelect = vi.fn()

    renderWithProvider(<SizeButtons onSizeSelect={onSizeSelect} />)

    await user.click(screen.getByRole('button', { name: 'Large' }))
    await user.click(screen.getByRole('button', { name: 'Small' }))
    await user.click(screen.getByRole('button', { name: 'Medium' }))

    expect(onSizeSelect).toHaveBeenNthCalledWith(1, 'lg')
    expect(onSizeSelect).toHaveBeenNthCalledWith(2, 'sm')
    expect(onSizeSelect).toHaveBeenNthCalledWith(3, 'md')
    expect(onSizeSelect).toHaveBeenCalledTimes(3)
  })
})

describe('Level 2 (Medium): structure assertions', () => {
  it('renders exactly three buttons inside the container', () => {
    const { container } = renderWithProvider(<SizeButtons />)
    const buttons = screen.getAllByRole('button')

    expect(screen.getByTestId('size-buttons-container')).toBeInTheDocument()
    expect(buttons).toHaveLength(3)
    expect(container).toMatchSnapshot()
  })
})

describe('Level 1 (Easy): text-based checks', () => {
  it('shows Small, Medium, and Large buttons', () => {
    renderWithProvider(<SizeButtons />)

    expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument()
  })
})
