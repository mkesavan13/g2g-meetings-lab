'use client'

import { Key, Mail, User, Save, Eye, EyeOff, Link, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWizard } from '../../contexts/WizardContext'

export function Step4Credentials() {
  const { nextStep, prevStep, botCredentials, setBotCredentials, developerCredentials } = useWizard()
  const [showToken, setShowToken] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [showWebhookInfo, setShowWebhookInfo] = useState(false)

  // Prepopulate fields from Step 3 on first load
  useEffect(() => {
    if (!botCredentials.name && !botCredentials.email) {
      const generateBotUsername = () => {
        if (!developerCredentials.username) return 'aiassistantlab@webex.bot'
        const usernameBeforeAt = developerCredentials.username.split('@')[0]
        return `aiassistantlab-${usernameBeforeAt}@webex.bot`
      }

      setBotCredentials({
        ...botCredentials,
        name: 'AI Assistant Lab Bot',
        email: generateBotUsername()
      })
    }
  }, [developerCredentials.username, botCredentials, setBotCredentials])

  const handleInputChange = (field: keyof typeof botCredentials, value: string) => {
    const newCredentials = { ...botCredentials, [field]: value }
    setBotCredentials(newCredentials)
    
    // Validate that all required fields are filled (including webhookUrl)
    setIsValid(
      newCredentials.token.length > 0 && 
      newCredentials.email.length > 0 && 
      newCredentials.name.length > 0 &&
      (newCredentials.webhookUrl || '').length > 0
    )
  }

  const handleSave = () => {
    if (isValid) {
      nextStep()
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Key className="w-16 h-16 text-passion-fruit mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Store Bot Credentials</h2>
          <p className="text-velvet-grey">
            Save your bot credentials for easy access during development
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Key className="w-4 h-4 mr-2 text-passion-fruit" />
              Bot Token
            </label>
            <div className="relative">
              <input
                type={showToken ? "text" : "password"}
                value={botCredentials.token}
                onChange={(e) => handleInputChange('token', e.target.value)}
                placeholder="Enter your bot access token..."
                className="wizard-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-velvet-grey mt-1">
              You can find this in your bot settings in the Webex Developer Portal
            </p>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Mail className="w-4 h-4 mr-2 text-fountain-blue" />
              Bot Email
            </label>
            <input
              type="email"
              value={botCredentials.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="bot@webex.bot"
              className="wizard-input"
            />
            <p className="text-xs text-velvet-grey mt-1">
              The email address associated with your bot
            </p>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <User className="w-4 h-4 mr-2 text-mantis" />
              Bot Display Name
            </label>
            <input
              type="text"
              value={botCredentials.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="AI Assistant Lab Bot"
              className="wizard-input"
            />
            <p className="text-xs text-velvet-grey mt-1">
              The display name that will appear in Webex
            </p>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Link className="w-4 h-4 mr-2 text-blue-500" />
              Webhook URL
              <button
                type="button"
                onClick={() => setShowWebhookInfo(!showWebhookInfo)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="How to get ngrok URL"
              >
                <Info className="w-4 h-4" />
              </button>
            </label>
            <input
              type="url"
              value={botCredentials.webhookUrl || ''}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
              placeholder="https://your-ngrok-url.ngrok-free.app"
              className="wizard-input"
            />
            <p className="text-xs text-velvet-grey mt-1">
              Your ngrok webhook URL for local development
            </p>
            
            {/* Webhook Info Popover */}
            {showWebhookInfo && (
              <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
                  <button
                    onClick={() => setShowWebhookInfo(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-500" />
                    How to get your ngrok URL
                  </h3>
                  
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                      <div>
                        <strong>Open VS Code</strong>
                        <p className="text-gray-600 dark:text-gray-400">Navigate to your project in VS Code</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                      <div>
                        <strong>Open Terminal</strong>
                        <p className="text-gray-600 dark:text-gray-400">Click on Terminal → New Terminal</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                      <div>
                        <strong>Run the command</strong>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">Execute this command:</p>
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono">yarn dev</code>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                      <div>
                        <strong>Copy the URL</strong>
                        <p className="text-gray-600 dark:text-gray-400">Look for the URL ending with <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">ngrok-free.app</code> and copy it</p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>Note:</strong> This ngrok URL is required for webhook functionality in your bot development.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-heart/10 to-scarlet/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center">
              <Save className="w-4 h-4 mr-2 text-purple-heart" />
              Secure Storage
            </h3>
            <p className="text-xs text-velvet-grey">
              These credentials are stored locally in your browser for this lab session only. 
              They will be used in the prompt snippets for the next steps.
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="wizard-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`wizard-button flex items-center ${
              isValid 
                ? 'wizard-button-primary' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  )
}
