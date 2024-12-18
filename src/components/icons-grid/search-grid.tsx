import { useDeferredValue } from 'react'

import { useIconSearch } from '@/queries'

import { IconCard } from '../icon-card'
import { VirtualGrid } from '../virtual-grid'

import type { PreviewIcon } from '@/store/interface'

interface SearchGridProps {
  searchQuery: string
}

export const SearchGrid = ({ searchQuery }: SearchGridProps) => {
  const deferredSearchQuery = useDeferredValue(searchQuery)
  const { data, isError, isLoading } = useIconSearch(deferredSearchQuery)

  const allRows = data ? data.icons : []
  const collections = data?.collections

  return (
    <VirtualGrid
      className='flex-1 overflow-y-scroll pt-8'
      data={allRows}
      error={isError}
      loading={isLoading}
      renderItem={(iconName) => {
        const [prefix] = iconName.split(':')
        const icon = {
          name: iconName,
          collection: {
            prefix,
            ...collections?.[prefix],
          },
        } as PreviewIcon

        return <IconCard icon={icon} />
      }}
    />
  )
}
