import type { IconifyInfo, IconifyJSON } from '@iconify/types'

export type APIv2Collection = IconifyInfo

export const queryIconCollections = async (): Promise<
  Record<string, APIv2Collection>
> => {
  const res = await fetch('https://api.iconify.design/collections')
  const data = await res.json()
  return data
}

export interface APIv2CollectionResponse {
  aliases?: Record<string, string>
  categories?: Record<string, string[]>
  chars?: Record<string, string>
  hidden?: string[]
  info?: IconifyInfo
  prefix: string
  prefixes?: IconifyJSON['prefixes']
  suffixes?: IconifyJSON['suffixes']
  themes?: IconifyJSON['themes']
  title?: string
  total: number
  uncategorized?: string[]
}

export const queryIcons = async (
  prefix: string,
): Promise<APIv2CollectionResponse> => {
  const res = await fetch(
    `https://api.iconify.design/collection?prefix=${prefix}&info=true`,
  )
  const data = await res.json()
  return data
}

interface SearchIconsParams {
  category?: string
  limit: number
  palette?: boolean
  prefix?: string
  prefixes?: string
  query: string
  start?: number
  style?: 'fill' | 'stroke'
}

export interface APIv2SearchResponse {
  collections: Record<string, IconifyInfo>
  icons: string[]
  limit: number
  start: number
  total: number
}

export const searchIcons = async (
  params: SearchIconsParams,
): Promise<APIv2SearchResponse> => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString())
    }
  })

  const response = await fetch(
    `https://api.iconify.design/search?${searchParams.toString()}`,
  )

  const data = await response.json()

  return data
}
