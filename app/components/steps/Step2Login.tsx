'use client'

import { LogIn, ExternalLink, User, Lock, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useWizard } from '../../contexts/WizardContext'

export function Step2Login() {
  const { nextStep, prevStep, developerCredentials } = useWizard()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <LogIn className="w-16 h-16 text-ultramine mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Login to Developer Portal</h2>
          <p className="text-velvet-grey">
            Please log in to the Webex Developer Portal using your credentials below
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ultramine/10 to-fountain-blue/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-ultramine" />
              Webex Developer Portal
            </h3>
            <p className="text-sm text-velvet-grey mb-4">
              Click the link below to open the Webex Developer Portal in a new tab, then use your stored credentials to log in.
            </p>
            <a
              href="https://developer.webex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="wizard-button-primary inline-flex items-center"
            >
              Open Developer Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-eucalyptus" />
              Your Login Credentials
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-velvet-grey" />
                  <div>
                    <p className="text-xs text-velvet-grey">Username/Email</p>
                    <p className="font-mono text-sm">{developerCredentials.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(developerCredentials.username, 'username')}
                  className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  {copiedField === 'username' ? (
                    <Check className="w-4 h-4 text-eucalyptus" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-xs">
                    {copiedField === 'username' ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-3 text-velvet-grey" />
                  <div>
                    <p className="text-xs text-velvet-grey">Password</p>
                    <p className="font-mono text-sm">{'•'.repeat(Math.min(developerCredentials.password.length, 20))}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(developerCredentials.password, 'password')}
                  className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  {copiedField === 'password' ? (
                    <Check className="w-4 h-4 text-eucalyptus" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-xs">
                    {copiedField === 'password' ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-eucalyptus/10 to-mantis/10 rounded-lg border border-eucalyptus/20">
              <p className="text-sm text-eucalyptus">
                💡 <strong>Tip:</strong> Click the copy buttons to easily paste your credentials into the developer portal login form.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-velvet-grey mb-4">
              Once you&apos;ve successfully logged in to the developer portal, click continue below.
            </p>
            <button
              onClick={nextStep}
              className="wizard-button-secondary"
            >
              I&apos;ve Logged In - Continue
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="wizard-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  )
}
