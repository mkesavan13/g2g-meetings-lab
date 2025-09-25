'use client'

import { Key, Shield, ExternalLink, Save, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWizard } from '../../contexts/WizardContext'

export function Step4StoreCredentials() {
  const { nextStep, prevStep } = useWizard()
  const [clientSecret, setClientSecret] = useState('')
  const [showSecret, setShowSecret] = useState(false)

  // Load client secret from localStorage on component mount
  useEffect(() => {
    const storedSecret = localStorage.getItem('g2g-client-secret')
    if (storedSecret) {
      setClientSecret(storedSecret)
    }
  }, [])

  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setClientSecret(value)
    // Auto-save to localStorage when user types
    if (value.trim()) {
      localStorage.setItem('g2g-client-secret', value)
    }
  }

  const handleContinueToAuth = () => {
    if (clientSecret.trim()) {
      localStorage.setItem('g2g-client-secret', clientSecret)
      nextStep()
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Key className="w-16 h-16 text-passion-fruit mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Store Client Secret & Request Authorization</h2>
          <p className="text-velvet-grey">
            Copy your service app client secret and request admin authorization
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-passion-fruit/10 to-mandarin/10 rounded-lg p-4 border border-passion-fruit/20">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-passion-fruit mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-passion-fruit mb-2">Before you start:</h4>
                <p className="text-xs text-passion-fruit">
                  After creating your service app, you should see a &quot;Client Secret&quot; field. Copy this value and paste it below.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Key className="w-4 h-4 mr-2 text-passion-fruit" />
              Client Secret
            </label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                value={clientSecret}
                onChange={handleSecretChange}
                placeholder="Enter your service app client secret..."
                className="wizard-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-velvet-grey mt-1">
              Copy this from your service app settings in the Webex Developer Portal
            </p>
            
            {clientSecret && (
              <div className="mt-2 p-2 bg-eucalyptus/10 border border-eucalyptus/20 rounded flex items-center">
                <CheckCircle className="w-4 h-4 text-eucalyptus mr-2" />
                <span className="text-sm text-eucalyptus">Client secret will be stored locally for this session</span>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-heart/10 to-scarlet/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center">
              <Save className="w-4 h-4 mr-2 text-purple-heart" />
              Secure Storage
            </h3>
            <p className="text-xs text-velvet-grey">
              Your client secret is stored locally in your browser for this lab session only. 
              It will be used for generating guest tokens in the final steps.
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
            onClick={handleContinueToAuth}
            disabled={!clientSecret.trim()}
            className={`wizard-button flex items-center ${
              clientSecret.trim()
                ? 'wizard-button-primary' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            Continue to Authorization
          </button>
        </div>
      </div>
    </div>
  )
}
