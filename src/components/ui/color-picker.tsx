import { forwardRef } from 'react'

import { Sketch } from '@uiw/react-color'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface ColorPickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorBlockRender?: (node: React.ReactNode, ref?: any) => React.ReactNode
  onChange?: (value: string) => void
  value?: string
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (props, ref) => {
    const { colorBlockRender: renderColorBlock, onChange, value } = props

    const colorBlock = value && (
      <PopoverTrigger className='w-min'>
        <div
          {...(!renderColorBlock ? { ref } : {})}
          className='size-7 rounded-md border border-zinc-500'
          style={{ backgroundColor: value }}
        />
      </PopoverTrigger>
    )

    const renderNode = renderColorBlock?.(colorBlock, ref) ?? colorBlock

    return (
      <Popover>
        {renderNode}
        <PopoverContent className='w-auto p-0 shadow-none'>
          <Sketch
            color={value}
            presetColors={false}
            onChange={(v) => {
              onChange?.(v.hexa)
            }}
          />
        </PopoverContent>
      </Popover>
    )
  },
)
