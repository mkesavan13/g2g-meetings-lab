'use client'

import { Rocket, Bot, Code, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useWizard, DeveloperCredentials } from '../../contexts/WizardContext'
import { CredentialsModal } from '../CredentialsModal'

export function Step1Welcome() {
  const { nextStep, getSessionInfo, completedSteps, hasDeveloperCredentials, setDeveloperCredentials, startJourney } = useWizard()
  const sessionInfo = getSessionInfo()
  const [showCredentialsModal, setShowCredentialsModal] = useState(!hasDeveloperCredentials())

  const isRestoredSession = () => {
    const start = new Date(sessionInfo.sessionStartTime)
    const now = new Date()
    return (now.getTime() - start.getTime()) > 60000 && completedSteps.size > 0
  }

  const handleCredentialsSave = (credentials: DeveloperCredentials) => {
    setDeveloperCredentials(credentials)
    setShowCredentialsModal(false)
    // Don't start journey automatically - wait for user to click "Start Your Journey"
  }

  const handleStartJourney = () => {
    startJourney() // Start the timer
    if (hasDeveloperCredentials()) {
      nextStep()
    } else {
      setShowCredentialsModal(true)
    }
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
            LAB-1544
          </h1>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
            Build on Webex with Cisco AI Assistant
          </h2>
          <p className="text-lg text-velvet-grey">
            A session for developers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-fountain-blue/10 to-ultramine/10 rounded-lg">
            <Bot className="w-12 h-12 text-ultramine mb-4" />
            <h3 className="text-lg font-semibold mb-2">Create Your Bot</h3>
            <p className="text-sm text-velvet-grey text-center">
              Build a powerful Webex bot with AI assistance
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-mantis/10 to-eucalyptus/10 rounded-lg">
            <Code className="w-12 h-12 text-eucalyptus mb-4" />
            <h3 className="text-lg font-semibold mb-2">Learn Step by Step</h3>
            <p className="text-sm text-velvet-grey text-center">
              Follow guided prompts to build incrementally
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-passion-fruit/10 to-mandarin/10 rounded-lg">
            <Rocket className="w-12 h-12 text-mandarin mb-4" />
            <h3 className="text-lg font-semibold mb-2">Deploy & Test</h3>
            <p className="text-sm text-velvet-grey text-center">
              Test your bot in real Webex environments
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">What You&apos;ll Build:</h3>
          <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-ultramine rounded-full mr-3"></span>
              A Webex bot that responds to echo commands
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-eucalyptus rounded-full mr-3"></span>
              Mathematical expression evaluator
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-fountain-blue rounded-full mr-3"></span>
              Webhook integration for real-time messaging
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-mantis rounded-full mr-3"></span>
              Smart message filtering and bot name recognition
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

        <CredentialsModal
          isOpen={showCredentialsModal}
          onClose={() => setShowCredentialsModal(false)}
          onSave={handleCredentialsSave}
        />
      </div>
    </div>
  )
}
