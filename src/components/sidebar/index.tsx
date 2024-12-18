import { ListRestart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BackgroundSettings } from '@/components/settings/background-settings'
import { BorderSettings } from '@/components/settings/border-settings'
import { DownloadSettings } from '@/components/settings/download-settings'
import { IconSettings } from '@/components/settings/icon-settings'
import { ShadowSettings } from '@/components/settings/shadow-settings'
import { TextSettings } from '@/components/settings/text-settings'
import { ImportAndExportSettings } from '@/components/settings/import-and-export'
import { ShadowConfigProvider } from '@/components/shadow-list'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import { Settings, Tab } from '@/store/constants'
import { defaultStyles } from '@/store/default-value'

export function Sidebar() {
  const { t } = useTranslation()
  const [componentsState, setComponentsState] = useStore(
    (store) => store.componentsState,
  )
  const setStyles = useStore((store) => store.styles[1])

  const { selectedSettings, selectedTab } = componentsState

  const showIconSettings =
    selectedTab === Tab.Icon || selectedTab === Tab.Upload
  const showTextSettings = selectedTab === Tab.Text

  return (
    <aside className='relative h-full overflow-hidden rounded-2xl border shadow-sm'>
      <Accordion
        collapsible
        className='h-full overflow-y-scroll p-4'
        type='single'
        value={selectedSettings}
        onValueChange={(value) =>
          setComponentsState((draft) => {
            draft.selectedSettings = value as Settings
          })
        }
      >
        {showIconSettings && (
          <AccordionItem value={Settings.Icon}>
            <AccordionTrigger>{t('icon settings')}</AccordionTrigger>
            <AccordionContent>
              <IconSettings />
            </AccordionContent>
          </AccordionItem>
        )}
        {showTextSettings && (
          <AccordionItem value={Settings.Text}>
            <AccordionTrigger>{t('text settings')}</AccordionTrigger>
            <AccordionContent>
              <TextSettings />
            </AccordionContent>
          </AccordionItem>
        )}
        {showTextSettings && (
          <AccordionItem value={Settings.TextShadow}>
            <AccordionTrigger>{t('text shadow settings')}</AccordionTrigger>
            <AccordionContent>
              <ShadowConfigProvider showSize={false}>
                <ShadowSettings path='textShadow' />
              </ShadowConfigProvider>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value={Settings.Background}>
          <AccordionTrigger>{t('background settings')}</AccordionTrigger>
          <AccordionContent>
            <BackgroundSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.Border}>
          <AccordionTrigger>{t('border settings')}</AccordionTrigger>
          <AccordionContent>
            <BorderSettings />
          </AccordionContent>
        </AccordionItem>
        {showIconSettings && (
          <AccordionItem value={Settings.IconShadow}>
            <AccordionTrigger>{t('icon shadow settings')}</AccordionTrigger>
            <AccordionContent>
              <ShadowConfigProvider showSize={false}>
                <ShadowSettings path='iconShadow' />
              </ShadowConfigProvider>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value={Settings.Shadow}>
          <AccordionTrigger>{t('shadow settings')}</AccordionTrigger>
          <AccordionContent>
            <ShadowSettings path='shadows' />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.InsetShadow}>
          <AccordionTrigger>{t('inset shadow settings')}</AccordionTrigger>
          <AccordionContent>
            <ShadowSettings path='insetShadows' />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.Download}>
          <AccordionTrigger>{t('download settings')}</AccordionTrigger>
          <AccordionContent>
            <DownloadSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.ImportAndExport}>
          <AccordionTrigger>{t('import and export')}</AccordionTrigger>
          <AccordionContent>
            <ImportAndExportSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        className='absolute bottom-4 right-4 rounded-full p-6 shadow-lg'
        size='icon'
        variant='outline'
        onClick={() => {
          setStyles(defaultStyles)
        }}
      >
        <ListRestart className='!size-6' />
      </Button>
    </aside>
  )
}
