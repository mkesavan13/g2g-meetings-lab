'use client'

import { WifiOff, RefreshCw } from 'lucide-react'

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
            <WifiOff className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            You&apos;re offline
          </h1>
          <p className="text-velvet-grey mb-6">
            It looks like you&apos;ve lost your internet connection. The AI Assistant Lab requires an internet connection to function properly.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRefresh}
            className="wizard-button-primary w-full flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <div className="text-sm text-velvet-grey">
            <p>While offline, you can still:</p>
            <ul className="mt-2 space-y-1">
              <li>• Review your progress</li>
              <li>• Access saved credentials</li>
              <li>• Read step instructions</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-velvet-grey">
            LAB-1544 - AI Assistant Lab (Offline Mode)
          </p>
        </div>
      </div>
    </div>
  )
}
