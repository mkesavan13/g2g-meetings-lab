'use client'

import { ThemeProvider } from './contexts/ThemeContext'
import { WizardProvider } from './contexts/WizardContext'
import { WizardLayout } from './components/WizardLayout'

export default function Home() {
  return (
    <ThemeProvider>
      <WizardProvider>
        <WizardLayout />
      </WizardProvider>
    </ThemeProvider>
  )
}
