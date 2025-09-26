'use client'

import { useWizard } from '../contexts/WizardContext'
import { StepIndicator } from './StepIndicator'
import { ThemeToggle } from './ThemeToggle'
import { InstallPrompt } from './InstallPrompt'
import { ResetDropdown } from './ResetDropdown'
import { SlidoSidebar } from './SlidoSidebar'
import { Timer } from './Timer'
// import { SessionIndicator } from './SessionIndicator'
import { Step1Welcome } from './steps/Step1Welcome'
import { Step2CreateSandbox } from './steps/Step2CreateSandbox'
import { Step3CreateServiceApp } from './steps/Step3CreateServiceApp'
import { Step4StoreCredentials } from './steps/Step4StoreCredentials'
import { Step5AdminSettings } from './steps/Step5AdminSettings'
import { Step6SdkPrerequisites } from './steps/Step6SdkPrerequisites'
import { Step7BuildingApp } from './steps/Step7BuildingApp'
import { Step8Complete } from './steps/Step8Complete'

export function WizardLayout() {
  const { currentStep } = useWizard()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome />
      case 2:
        return <Step2CreateSandbox />
      case 3:
        return <Step3CreateServiceApp />
      case 4:
        return <Step4StoreCredentials />
      case 5:
        return <Step5AdminSettings />
      case 6:
        return <Step6SdkPrerequisites />
      case 7:
        return <Step7BuildingApp />
      case 8:
        return <Step8Complete />
      default:
        return <Step1Welcome />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content Area */}
      <div className="lg:pr-96"> {/* Add right padding for sidebar on large screens only */}
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="text-xl font-bold bg-gradient-to-r from-ultramine to-eucalyptus bg-clip-text text-transparent">
                  Guest to Guest Meetings Lab
                </div>
                <div className="hidden sm:block text-sm text-velvet-grey">
                  Step {currentStep} of 7
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Timer />
                <ResetDropdown />
                {/* <SessionIndicator /> */}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StepIndicator />
            <div className="mt-8">
              {renderStep()}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-velvet-grey">
              Guest to Guest Meetings Lab: Transform user interactions with real-world guest-to-guest capabilities
            </p>
          </div>
        </footer>
      </div>

      {/* Slido Sidebar */}
      <SlidoSidebar />

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  )
}
