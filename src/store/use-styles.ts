import { useEffect, useRef } from 'react'

import { debounce } from 'lodash-es'
import { useImmer } from 'use-immer'

import { defaultStyles } from './default-value'

const storageKey = 'appicon-forge-config-v1'

export const useStyles = () => {
  const [styles, setStyles] = useImmer(defaultStyles)
  const isMountRef = useRef(false)

  const setStorageDebounce = useRef(
    debounce((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value))
    }, 1000),
  ).current

  useEffect(() => {
    if (!isMountRef.current) {
      isMountRef.current = true
      const storageString = localStorage.getItem(storageKey)
      if (storageString) {
        setStyles(JSON.parse(storageString))
      }
    } else {
      setStorageDebounce(styles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styles])

  return [styles, setStyles] as const
}
