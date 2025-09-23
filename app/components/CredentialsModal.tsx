'use client'

import { User, Lock, Eye, EyeOff, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWizard, DeveloperCredentials } from '../contexts/WizardContext'

interface CredentialsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (credentials: DeveloperCredentials) => void
}

export function CredentialsModal({ isOpen, onClose, onSave }: CredentialsModalProps) {
  const { developerCredentials } = useWizard()
  const [showPassword, setShowPassword] = useState(false)
  const [tempCredentials, setTempCredentials] = useState<DeveloperCredentials>({
    username: developerCredentials.username,
    password: developerCredentials.password
  })

  // Sync tempCredentials with context when developerCredentials changes (e.g., after reset)
  useEffect(() => {
    setTempCredentials({
      username: developerCredentials.username,
      password: developerCredentials.password
    })
  }, [developerCredentials.username, developerCredentials.password])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  const handleSave = () => {
    if (tempCredentials.username && tempCredentials.password) {
      onSave(tempCredentials)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Developer Portal Credentials</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-velvet-grey mb-6">
            Please enter your Webex Developer Portal credentials. These will be stored securely in your browser for this lab session.
          </p>

          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <User className="w-4 h-4 mr-2 text-ultramine" />
                Username/Email
              </label>
              <input
                type="text"
                value={tempCredentials.username}
                onChange={(e) => setTempCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="your.email@company.com"
                className="wizard-input"
                autoFocus
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Lock className="w-4 h-4 mr-2 text-ultramine" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={tempCredentials.password}
                  onChange={(e) => setTempCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Your developer portal password"
                  className="wizard-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-fountain-blue/10 to-eucalyptus/10 rounded-lg p-4 mt-6">
            <p className="text-xs text-velvet-grey">
              🔒 These credentials are stored locally in your browser only and are used to guide you through the developer portal login process.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="wizard-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!tempCredentials.username || !tempCredentials.password}
            className={`wizard-button ${
              tempCredentials.username && tempCredentials.password
                ? 'wizard-button-primary'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Save Credentials
          </button>
        </div>
      </div>
    </div>
  )
}
