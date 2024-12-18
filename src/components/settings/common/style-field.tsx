import { cloneElement } from 'react'

import { get, set } from 'lodash-es'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'

export interface StyleFieldProps {
  children: React.ReactElement
  className?: string
  eventName?: string
  label?: string
  labelClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  normalizeValue?: (value: any) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  normalizeValueFromEvent?: (event: any) => any
  path: string
  valueName?: string
}

export const StyleField = (props: StyleFieldProps) => {
  const {
    children,
    className,
    eventName = 'onChange',
    label,
    labelClassName,
    normalizeValue,
    normalizeValueFromEvent,
    path,
    valueName = 'value',
  } = props
  const [state, setState] = useStore((store) => store.styles)

  const fieldValue = get(state, path)

  return (
    <div className={cn('grid items-center gap-4', className)}>
      {label && <Label className={labelClassName}>{label}</Label>}
      {cloneElement(children, {
        [valueName]: normalizeValue?.(fieldValue) ?? fieldValue,
        [eventName](event: unknown) {
          setState((draft) => {
            const newValue = normalizeValueFromEvent?.(event) ?? event
            set(draft, path, newValue)
          })
        },
      })}
    </div>
  )
}
