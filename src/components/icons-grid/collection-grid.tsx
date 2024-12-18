import { useDeferredValue, useState } from 'react'

import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useIconCollectionWithNames } from '@/queries'
import { useStore } from '@/store'

import { IconCard } from '../icon-card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { VirtualGrid } from '../virtual-grid'

import type { PreviewIcon } from '@/store/interface'

export const CollectionGrid = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { t } = useTranslation()

  const [componentsState, setComponentsState] = useStore(
    (store) => store.componentsState,
  )

  const {
    name: collectionName,
    author: collectionAuthor,
    license: collectionLicense,
    prefix: collectionPrefix,
  } = componentsState.selectedCollection!

  const {
    data: batchData,
    isError,
    isLoading,
  } = useIconCollectionWithNames(collectionPrefix)

  const [data, list = []] = batchData ?? []

  const { info, prefix } = data ?? {}

  const renderList = useDeferredValue(
    searchQuery
      ? list.filter((iconName) =>
          iconName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : list,
  )

  return (
    <div className='flex h-full flex-col gap-4'>
      <div className='flex gap-8'>
        <div className='flex flex-1 flex-col items-start'>
          <Button
            variant='secondary'
            onClick={() =>
              setComponentsState((draft) => {
                draft.selectedCollection = null
              })
            }
          >
            <ChevronLeft />
            {t('search.back.collections')}
          </Button>
          <span className='flex-1' />
          <Input
            placeholder={t('search.filter')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-end text-lg font-bold'>{collectionName}</p>
          <p className='flex items-center gap-4'>
            <span className='flex-1'>{t('collections.author')}</span>
            <a className='underline' href={collectionAuthor.url}>
              {collectionAuthor.name}
            </a>
          </p>
          <p className='flex items-center gap-4'>
            <span className='flex-1'>{t('collections.license')}</span>
            <a className='underline' href={collectionLicense.url}>
              {collectionLicense.title}
            </a>
          </p>
        </div>
      </div>
      <Separator />
      <VirtualGrid
        className='flex-1 overflow-y-scroll'
        data={renderList}
        error={isError}
        loading={isLoading}
        renderItem={(iconName) => {
          const icon = {
            name: `${prefix}:${iconName}`,
            collection: {
              prefix,
              ...info,
            },
          } as PreviewIcon

          return <IconCard icon={icon} />
        }}
      />
    </div>
  )
}
