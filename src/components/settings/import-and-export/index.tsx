import { useState } from 'react'

import { t } from 'i18next'
import { Import, Share } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SettingsContainer } from '@/components/ui/styled'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/store'

export const ImportAndExportSettings = () => {
  const cls = 'col-span-2 grid grid-cols-subgrid items-center'
  const [style, setStyle] = useStore((store) => store.styles)
  const [showData, setShowData] = useState('')
  return (
    <SettingsContainer>
      <div className={cls}>
        <Label>{t('export data')}</Label>
        <Button
          size='icon'
          onClick={() => {
            setShowData(JSON.stringify(style))
          }}
        >
          <Share />
        </Button>
      </div>
      <div className={cls}>
        <Label>{t('import data')}</Label>
        <Button
          size='icon'
          onClick={() => {
            setStyle(JSON.parse(showData))
          }}
        >
          <Import />
        </Button>
      </div>
      <div className={cls}>
        <Label>{t('data text')}</Label>
        <Textarea
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
        />
      </div>
    </SettingsContainer>
  )
}
