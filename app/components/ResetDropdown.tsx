'use client'

import { MoreVertical, RotateCcw, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWizard } from '../contexts/WizardContext'

export function ResetDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { resetProgress } = useWizard()

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset lab progress? This will go back to step 1.')) {
      resetProgress()
      setIsOpen(false)
    }
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
              
              <div className="py-2">
                <button
                  onClick={handleResetProgress}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-3 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium">Reset Progress</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Go back to step 1
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
