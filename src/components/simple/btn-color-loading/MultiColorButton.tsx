import { Button } from '@heroui/react'

export type MultiColorButtonColor = 'secondary' | 'primary' | 'info' | 'light'

type MultiColorButtonProps = {
  color?: MultiColorButtonColor
  label?: string
}

const colorClassMap: Record<MultiColorButtonColor, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  info: 'bg-blue-500 text-white',
  light: 'bg-zinc-100 text-zinc-900',
}

export function MultiColorButton({
  color = 'primary',
  label = 'Button',
}: MultiColorButtonProps) {
  return (
    <Button className={colorClassMap[color]} data-color={color}>
      {label}
    </Button>
  )
}

export default MultiColorButton
