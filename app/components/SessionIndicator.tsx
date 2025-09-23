'use client'

import { Clock, RotateCcw, Save } from 'lucide-react'
import { useWizard } from '../contexts/WizardContext'
import { useState, useEffect } from 'react'

export function SessionIndicator() {
  const { getSessionInfo, completedSteps } = useWizard()
  const [showTooltip, setShowTooltip] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const sessionInfo = getSessionInfo()

  // Show save indicator when state changes
  useEffect(() => {
    setJustSaved(true)
    const timer = setTimeout(() => setJustSaved(false), 1000)
    return () => clearTimeout(timer)
  }, [completedSteps.size])

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getSessionDuration = () => {
    const start = new Date(sessionInfo.sessionStartTime)
    const now = new Date()
    const durationMs = now.getTime() - start.getTime()
    const minutes = Math.floor(durationMs / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const isRestoredSession = () => {
    const start = new Date(sessionInfo.sessionStartTime)
    const now = new Date()
    return (now.getTime() - start.getTime()) > 60000 // More than 1 minute ago
  }

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        {justSaved ? (
          <Save className="w-4 h-4 text-eucalyptus animate-pulse" />
        ) : isRestoredSession() ? (
          <RotateCcw className="w-4 h-4 text-fountain-blue" />
        ) : (
          <Clock className="w-4 h-4 text-velvet-grey" />
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          {getSessionDuration()}
        </span>
      </button>

      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Session Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-velvet-grey">Started:</span>
              <span className="font-medium">
                {formatTime(sessionInfo.sessionStartTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-velvet-grey">Duration:</span>
              <span className="font-medium">{getSessionDuration()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-velvet-grey">Progress:</span>
              <span className="font-medium">
                {completedSteps.size}/7 steps
              </span>
            </div>
            {isRestoredSession() && (
              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center text-fountain-blue">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  <span className="text-xs">Session restored</span>
                </div>
              </div>
            )}
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center text-eucalyptus">
                <Save className="w-3 h-3 mr-1" />
                <span className="text-xs">Auto-saved to browser</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
