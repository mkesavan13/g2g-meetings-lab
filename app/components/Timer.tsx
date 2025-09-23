'use client'

import { Clock } from 'lucide-react'
import { useWizard } from '../contexts/WizardContext'
import { useEffect, useState } from 'react'

export function Timer() {
  const { getJourneyDuration } = useWizard()
  const [duration, setDuration] = useState<string | null>(null)

  useEffect(() => {
    const updateDuration = () => {
      setDuration(getJourneyDuration())
    }

    // Update immediately
    updateDuration()

    // Update every second
    const interval = setInterval(updateDuration, 1000)

    return () => clearInterval(interval)
  }, [getJourneyDuration])

  if (!duration) return null

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <Clock className="w-4 h-4" />
      <span className="font-mono">{duration}</span>
    </div>
  )
}
