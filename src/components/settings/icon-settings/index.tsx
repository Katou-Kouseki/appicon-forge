import { useTranslation } from 'react-i18next'

import { ColorPicker } from '@/components/ui/color-picker'
import { SettingsContainer, StyleFieldSubgrid } from '@/components/ui/styled'

import { PointField } from '../common/point-field'
import { SliderField } from '../common/slider-field'

export const IconSettings = () => {
  const { t } = useTranslation()
  return (
    <SettingsContainer>
      <SliderField
        label={t('settings.icon.size')}
        max={256}
        min={64}
        path='iconSize'
      />
      <SliderField
        label={t('settings.icon.rotation')}
        max={360}
        path='iconRotation'
      />
      <PointField label={t('settings.icon.offset')} path='iconOffset' />
      <StyleFieldSubgrid
        label={t('settings.icon.color')}
        normalizeValueFromEvent={(event) => `${event}`}
        path='iconColor'
      >
        <ColorPicker />
      </StyleFieldSubgrid>
    </SettingsContainer>
  )
}
