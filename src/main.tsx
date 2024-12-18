import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createDarkToggle } from 'dark-toggle'

import { App } from './App'

import './globals.css'

// TODO
window.darkToggle = createDarkToggle({ key: 'theme' })
window.darkToggle.subscribe((isDark, theme) => {
  document.documentElement.classList.add(isDark ? 'dark' : 'light')
  document.documentElement.classList.remove(isDark ? 'light' : 'dark')
  document.documentElement.setAttribute('data-theme', theme || '')
})

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
