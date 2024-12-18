import { MinusIcon, PlusIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { ColorPicker } from '@/components/ui/color-picker'
import { cn, createColor } from '@/lib/utils'
import { defaultBackgroundColor } from '@/store/default-value'

import { Button } from '../ui/button'

import type { Color } from '@/store/interface'

const variants = {
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  initial: { opacity: 0, scale: 0 },
}

export interface ColorListProps {
  className?: string
  onChange?: (value: Color[]) => void
  value?: Color[]
}

export const ColorList = (props: ColorListProps) => {
  const { className, onChange, value = [] } = props

  const colorLens = value.length

  const onColorChange = (newValue: Color) => {
    onChange?.(
      value.map((color) => (color.id === newValue.id ? newValue : color)),
    )
  }

  const onRemoveColor = (id: string) => {
    onChange?.(value.filter((color) => color.id !== id))
  }

  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      <AnimatePresence initial={false} mode='popLayout'>
        {value.map((item, index) => {
          const isLast = index === colorLens - 1
          return (
            <ColorPicker
              key={item.id}
              // eslint-disable-next-line react/no-unstable-nested-components
              colorBlockRender={(node, ref) => (
                <motion.div
                  ref={ref}
                  layout
                  animate='animate'
                  className='relative size-7'
                  exit='exit'
                  initial='initial'
                  variants={variants}
                >
                  {node}
                  {!isLast && (
                    <Button
                      className='absolute right-0 top-0 size-3 -translate-y-1/3 translate-x-1/3 p-0'
                      variant='destructive'
                      onClick={() => onRemoveColor(item.id)}
                    >
                      <MinusIcon className='!size-2' />
                    </Button>
                  )}
                </motion.div>
              )}
              value={item.value}
              onChange={(value) => onColorChange({ id: item.id, value })}
            />
          )
        })}
        <Button
          asChild
          size='icon'
          onClick={() =>
            onChange?.([createColor(defaultBackgroundColor), ...value])
          }
        >
          <motion.button layout>
            <PlusIcon />
          </motion.button>
        </Button>
      </AnimatePresence>
    </div>
  )
}
