import { DownloadIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui/button'

interface DownloadButtonProps {
  onClick: () => void
}

export const DownloadButton = (props: DownloadButtonProps) => {
  const { onClick } = props
  const { t } = useTranslation()
  return (
    <Button
      className='shrink-0'
      size='lg'
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <DownloadIcon />
      {t('download')}
    </Button>
  )
}
