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
import { Step2Login } from './steps/Step2Login'
import { Step3CreateBot } from './steps/Step3CreateBot'
import { Step4Credentials } from './steps/Step4Credentials'
import { Step5Coding } from './steps/Step5Coding'
import { Step6FinalPrompt } from './steps/Step6FinalPrompt'
import { Step7ThankYou } from './steps/Step7ThankYou'

export function WizardLayout() {
  const { currentStep } = useWizard()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome />
      case 2:
        return <Step2Login />
      case 3:
        return <Step3CreateBot />
      case 4:
        return <Step4Credentials />
      case 5:
        return <Step5Coding />
      case 6:
        return <Step6FinalPrompt />
      case 7:
        return <Step7ThankYou />
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
                  Cisco AI Assistant Lab
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
              LAB-1544 - Build on Webex with Cisco AI Assistant: A session for developers
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
