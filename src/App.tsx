import { lazy, Suspense } from 'react'

import { DarkToggleProvider } from 'dark-toggle/react'

import { Loading } from './components/loading'
import { Sidebar } from './components/sidebar'
import { ClientProvider } from './providers/client'
import { StoreProvider } from './store'

const MainContent = lazy(() =>
  import('./components/main-content').then((module) => ({
    default: module.MainContent,
  })),
)

export function App() {
  return (
    <ClientProvider>
      <StoreProvider>
        <DarkToggleProvider>
          <main className='grid h-screen w-screen grid-cols-[minmax(auto,400px)_1fr] grid-rows-1 gap-4 p-4'>
            <Sidebar />
            <Suspense fallback={<Loading />}>
              <MainContent />
            </Suspense>
          </main>
        </DarkToggleProvider>
      </StoreProvider>
    </ClientProvider>
  )
}
