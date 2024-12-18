import { useTranslation } from 'react-i18next'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SettingsContainer, StyleFieldSubgrid } from '@/components/ui/styled'
import { useStore } from '@/store'
import { Gradient } from '@/store/constants'

import { FontSelect } from '../../font-select'
import { ColorsField } from '../common/colors-field'
import { GradientSelectField } from '../common/gradient-select-field'
import { PointField } from '../common/point-field'
import { SliderField } from '../common/slider-field'

export const TextSettings = () => {
  const { t } = useTranslation()
  const [{ textColors, textGradient }] = useStore((store) => store.styles)

  const isGradient = textColors.length !== 1

  return (
    <SettingsContainer>
      <StyleFieldSubgrid
        label={t('settings.text.value.text')}
        normalizeValueFromEvent={(e) => e.target.value}
        path='textValue'
      >
        <Input placeholder={t('settings.text.value.placeholder')} />
      </StyleFieldSubgrid>
      <SliderField label={t('settings.text.size')} max={256} path='textSize' />
      <SliderField
        label={t('settings.text.rotation')}
        max={360}
        path='textRotation'
      />
      <PointField label={t('settings.text.offset')} path='textOffset' />
      <ColorsField label={t('settings.text.colors.text')} path='textColors' />
      {isGradient && (
        <>
          {textGradient !== Gradient.Radial && (
            <SliderField
              label={t('settings.text.colors.rotation')}
              max={360}
              path='textColorRotation'
            />
          )}
          <GradientSelectField path='textGradient' />
        </>
      )}
      <StyleFieldSubgrid label={t('settings.text.font.text')} path='textFont'>
        <FontSelect />
      </StyleFieldSubgrid>
      <StyleFieldSubgrid
        eventName='onValueChange'
        label={t('settings.text.weight')}
        path='textWeight'
      >
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='100'>100</SelectItem>
            <SelectItem value='200'>200</SelectItem>
            <SelectItem value='300'>300</SelectItem>
            <SelectItem value='400'>400</SelectItem>
            <SelectItem value='500'>500</SelectItem>
            <SelectItem value='600'>600</SelectItem>
            <SelectItem value='700'>700</SelectItem>
            <SelectItem value='800'>800</SelectItem>
            <SelectItem value='900'>900</SelectItem>
          </SelectContent>
        </Select>
      </StyleFieldSubgrid>
      <StyleFieldSubgrid
        eventName='onCheckedChange'
        label={t('settings.text.italic')}
        path='textItalic'
        valueName='checked'
      >
        <Checkbox />
      </StyleFieldSubgrid>
    </SettingsContainer>
  )
}
