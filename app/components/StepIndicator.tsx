'use client'

import { Check } from 'lucide-react'
import { useWizard } from '../contexts/WizardContext'

const stepTitles = [
  'Welcome',
  'Login',
  'Create Bot',
  'Credentials',
  'Build with AI Assistant',
  'Full Prompt',
  'Complete'
]

export function StepIndicator() {
  const { currentStep, completedSteps, goToStep } = useWizard()

  return (
    <div className="flex items-center justify-center space-x-4 mb-8 overflow-x-auto pb-4">
      {stepTitles.map((title, index) => {
        const stepNumber = index + 1
        const isActive = currentStep === stepNumber
        const isCompleted = completedSteps.has(stepNumber)
        const isClickable = stepNumber <= currentStep || isCompleted

        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => isClickable && goToStep(stepNumber)}
                disabled={!isClickable}
                className={`step-indicator ${
                  isActive ? 'active' : isCompleted ? 'completed' : 'pending'
                } ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'} transition-all duration-200`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </button>
              <span className="text-xs mt-1 text-center text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {title}
              </span>
            </div>
            {index < stepTitles.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                isCompleted ? 'bg-eucalyptus' : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
