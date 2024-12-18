import { createContextFactory } from '@reactils/create-context-factory'

import { useComponentsState } from './use-components-state'
import { useStyles } from './use-styles'

export const [StoreProvider, useStore] = createContextFactory(() => ({
  componentsState: useComponentsState(),
  styles: useStyles(),
}))
