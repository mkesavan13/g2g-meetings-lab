'use client'

import { Rocket, Users, Settings, RotateCcw, Code } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'

export function Step1Welcome() {
  const { nextStep, getSessionInfo, completedSteps, startJourney } = useWizard()
  const sessionInfo = getSessionInfo()

  const isRestoredSession = () => {
    const start = new Date(sessionInfo.sessionStartTime)
    const now = new Date()
    return (now.getTime() - start.getTime()) > 60000 && completedSteps.size > 0
  }

  const handleStartJourney = () => {
    startJourney() // Start the timer
    nextStep()
  }

  return (
    <div className="max-w-4xl mx-auto text-center animate-fade-in">
      {isRestoredSession() && (
        <div className="mb-6 bg-gradient-to-r from-fountain-blue/10 to-eucalyptus/10 border border-fountain-blue/20 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <RotateCcw className="w-5 h-5 text-fountain-blue" />
            <h3 className="text-lg font-semibold text-fountain-blue">Welcome Back!</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your lab session has been restored. You completed {completedSteps.size} steps and can continue where you left off.
          </p>
        </div>
      )}
      
      <div className="wizard-card">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-ultramine to-eucalyptus bg-clip-text text-transparent">
            LAB-2843
          </h1>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
            Transform user interactions
          </h2>
          <p className="text-lg text-velvet-grey">
            A real-world application of guest-to-guest capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-fountain-blue/10 to-ultramine/10 rounded-lg">
            <Users className="w-12 h-12 text-ultramine mb-4" />
            <h3 className="text-lg font-semibold mb-2">Create Sandbox</h3>
            <p className="text-sm text-velvet-grey text-center">
              Set up your Guest-to-Guest development environment
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-mantis/10 to-eucalyptus/10 rounded-lg">
            <Settings className="w-12 h-12 text-eucalyptus mb-4" />
            <h3 className="text-lg font-semibold mb-2">Configure Service App</h3>
            <p className="text-sm text-velvet-grey text-center">
              Build and authorize your Webex service application
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-passion-fruit/10 to-mandarin/10 rounded-lg">
            <Rocket className="w-12 h-12 text-mandarin mb-4" />
            <h3 className="text-lg font-semibold mb-2">Generate Tokens</h3>
            <p className="text-sm text-velvet-grey text-center">
              Create guest tokens for meeting integration
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-eucalyptus/10 to-mantis/10 rounded-lg">
            <Code className="w-12 h-12 text-eucalyptus mb-4" />
            <h3 className="text-lg font-semibold mb-2">Build with Web Meetings SDK</h3>
            <p className="text-sm text-velvet-grey text-center">
              Integrate meetings into your real-world applications
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">What You&apos;ll Learn:</h3>
          <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-ultramine rounded-full mr-3"></span>
              Create a Guest-to-Guest sandbox environment
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-eucalyptus rounded-full mr-3"></span>
              Build and configure a Webex service application
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-fountain-blue rounded-full mr-3"></span>
              Request and approve admin authorization
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-mantis rounded-full mr-3"></span>
              Generate guest tokens for meeting integration
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-eucalyptus rounded-full mr-3"></span>
              Build real-world applications with Web Meetings SDK
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartJourney}
            className="wizard-button-primary text-xl px-8 py-4"
          >
            Start Your Journey 🚀
          </button>
        </div>

      </div>
    </div>
  )
}
