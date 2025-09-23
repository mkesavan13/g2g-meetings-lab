'use client'

import { MoreVertical, RotateCcw, KeyRound, X, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useWizard } from '../contexts/WizardContext'
import { CredentialsModal } from './CredentialsModal'

export function ResetDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [showCredentialsModal, setShowCredentialsModal] = useState(false)
  const { resetLab, resetProgress, setDeveloperCredentials } = useWizard()

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset lab progress? This will go back to step 1 but keep your credentials.')) {
      resetProgress()
      setIsOpen(false)
    }
  }

  const handleResetCredentials = () => {
    if (confirm('Are you sure you want to reset credentials? This will clear all stored credentials and restart the lab from the beginning.')) {
      resetLab() // Reset everything since credentials are needed from step 1
      setIsOpen(false)
    }
  }

  const handleUpdateCredentials = () => {
    setIsOpen(false)
    // Small delay to ensure dropdown animation completes before modal opens
    setTimeout(() => setShowCredentialsModal(true), 100)
  }

  const handleCredentialsSave = (credentials: any) => {
    setDeveloperCredentials(credentials)
    setShowCredentialsModal(false)
  }

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Lab options"
      >
        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[55]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[60]">
            <div className="p-2">
              <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Lab Options</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="py-2 space-y-1">
                <button
                  onClick={handleUpdateCredentials}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Settings className="w-4 h-4 mr-3 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium">Update Credentials</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Modify your developer portal credentials
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleResetProgress}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-3 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium">Reset Progress</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Go back to step 1, keep credentials
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleResetCredentials}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <KeyRound className="w-4 h-4 mr-3 text-red-500" />
                  <div className="text-left">
                    <div className="font-medium">Reset Credentials</div>
                    <div className="text-xs text-red-500 dark:text-red-400">
                      Clear credentials & restart lab
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {showCredentialsModal && typeof window !== 'undefined' && createPortal(
        <CredentialsModal
          isOpen={showCredentialsModal}
          onClose={() => setShowCredentialsModal(false)}
          onSave={handleCredentialsSave}
        />,
        document.body
      )}
    </div>
  )
}
