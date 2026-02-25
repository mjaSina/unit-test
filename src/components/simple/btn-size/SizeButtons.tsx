import { Button } from '@heroui/react'

export type ButtonSize = 'sm' | 'md' | 'lg'

type SizeButtonsProps = {
  onSizeSelect?: (size: ButtonSize) => void
}

export function SizeButtons({ onSizeSelect }: SizeButtonsProps) {
  return (
    <div className="flex gap-4 items-center" data-testid="size-buttons-container">
      <Button size="sm" onPress={() => onSizeSelect?.('sm')}>
        Small
      </Button>
      <Button size="md" onPress={() => onSizeSelect?.('md')}>
        Medium
      </Button>
      <Button size="lg" onPress={() => onSizeSelect?.('lg')}>
        Large
      </Button>
    </div>
  )
}
