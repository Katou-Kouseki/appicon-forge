import { createContext, useContext } from 'react'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { changeValueFromArray, cn } from '@/lib/utils'
import { defaultShadowColor } from '@/store/default-value'

import { Button } from '../ui/button'
import { ColorPicker } from '../ui/color-picker'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

import type { Shadow } from '@/store/interface'

interface ShadowListConfig {
  limit?: number
  showSize?: boolean
}

const shadowListConfigContext = createContext<ShadowListConfig>({
  showSize: true,
})

interface ShadowConfigProviderProps extends ShadowListConfig {
  children: React.ReactNode
}

export const ShadowConfigProvider = (props: ShadowConfigProviderProps) => {
  const { children, ...rest } = props
  return (
    <shadowListConfigContext.Provider value={rest}>
      {children}
    </shadowListConfigContext.Provider>
  )
}

interface ShadowListProps {
  hideSize?: boolean
  onChange?: (value: Shadow[]) => void
  value?: Shadow[]
}

export const ShadowList = (props: ShadowListProps) => {
  const { onChange, value = [] } = props

  const { limit } = useContext(shadowListConfigContext)

  const isLimited = limit ? value.length >= limit : false

  return (
    <div className='grid gap-4'>
      {value.map((itemValue, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className='relative'
        >
          <ShadowItem
            value={itemValue}
            onChange={(newValue) =>
              onChange?.(changeValueFromArray(value, newValue, index))
            }
          />
          {index !== 0 && (
            <Button
              className='absolute -top-2 right-0 size-auto rounded-full p-1'
              size='icon'
              variant='destructive'
              onClick={() => onChange?.(value.filter((_, i) => i !== index))}
            >
              <MinusIcon className='!size-3' />
            </Button>
          )}
        </div>
      ))}
      {!isLimited && (
        <Button
          className='place-self-center'
          size='icon'
          variant='outline'
          onClick={() =>
            onChange?.(value.concat([[0, 0, 0, 0, defaultShadowColor]]))
          }
        >
          <PlusIcon />
        </Button>
      )}
    </div>
  )
}

interface ShadowItemProps {
  className?: string
  onChange?: (value: Shadow) => void
  value: Shadow
}

function ShadowItem(props: ShadowItemProps) {
  const { className, onChange, value } = props

  const { showSize } = useContext(shadowListConfigContext)
  const { t } = useTranslation()

  const [x, y, blur, spread, color] = value

  const cls = `col-span-full grid grid-cols-subgrid items-center`

  return (
    <div
      className={cn(
        'grid col-span-full grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-secondary p-4 rounded-lg',
        className,
      )}
    >
      {(
        [
          [x, 'x'],
          [y, 'y'],
          [blur, 'blur'],
          [spread, 'spread'],
        ] as const
      ).map(([itemValue, key], index) => {
        if (!showSize && key === 'spread') {
          return null
        }

        return (
          <div key={key} className={cls}>
            <Label>{t(`settings.shadow.${key}`)}</Label>
            <Slider
              {...(key === 'x' || key === 'y' ? { max: 100, min: -100 } : {})}
              value={[itemValue]}
              onValueChange={([newValue]) =>
                onChange?.(
                  changeValueFromArray(
                    value,
                    newValue as Shadow[number],
                    index,
                  ) as Shadow,
                )
              }
            />
          </div>
        )
      })}
      <div className={cls}>
        <Label>{t(`settings.shadow.color`)}</Label>
        <ColorPicker
          value={color}
          onChange={(newValue) =>
            onChange?.(
              changeValueFromArray(
                value,
                newValue as Shadow[number],
                4,
              ) as Shadow,
            )
          }
        />
      </div>
    </div>
  )
}