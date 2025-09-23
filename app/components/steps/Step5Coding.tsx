'use client'

import { MessageSquare, CheckCircle, RotateCcw, HelpCircle } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { CopyablePrompt } from '../CopyablePrompt'
import { TestingInstructionsModal } from '../TestingInstructionsModal'
import { useRef, useEffect, useState } from 'react'

export function Step5Coding() {
  const { nextStep, prevStep, botCredentials, markPromptCompleted, isPromptCompleted, completedPrompts, setCompletedPrompts } = useWizard()
  const promptRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to detect when header becomes sticky
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderSticky(!entry.isIntersecting)
      },
      { threshold: 1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const resetStep5Prompts = () => {
    // Filter out only Step 5 prompts (5.1, 5.2, 5.3, 5.4, 5.5)
    const updatedPrompts = { ...completedPrompts }
    Object.keys(updatedPrompts).forEach(key => {
      if (key.startsWith('5.')) {
        delete updatedPrompts[key]
      }
    })
    setCompletedPrompts(updatedPrompts)
    
    // Scroll to top like a fresh page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const prompts = [
    {
      title: "Step 5.1: Basic Echo Bot",
      prompt: `Create a Webex bot using Webex APIs (access token: "${botCredentials.token}", webhook server URL: "${botCredentials.webhookUrl}") running on port 3000 which can listen to messages in a space using the Webex webhooks. Add no filters or secret to the webhook. It should send responses when the message starts with the keyword Echo. Like "Echo {message}", respond "You said: {message}"`
    },
    {
      title: "Step 5.2: Add Math Evaluation",
      prompt: `Let us extend the use case. If the message doesn't start with "Echo", consider it a mathematical expression, evaluate using \`eval\` and send response as "Result: {evaluated_expression}". If it is neither of these, send response as an error stating, the bot expects a echo or a mathematical expression`
    },
    {
      title: "Step 5.3: Filter Bot Messages",
      prompt: `Ensure to not respond to messages from the Bot itself. Use email ID from message response to do the same. The bot email ID is "${botCredentials.email}"`
    },
    {
      title: "Step 5.4: Bot Name Recognition",
      prompt: `My Bot name is "${botCredentials.name}". If it is present in the message, remove it and then any trailing spaces. Consider that to be the actual message and then start the evaluation`
    },
    {
      title: "Step 5.5: Handle Webhook Creation",
      prompt: `For webhook creation, If the error response is 409, instead of printing the error, just print webhook is already created`
    }
  ]

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Sentinel element for intersection observer */}
      <div ref={headerRef} className="h-1"></div>
      
      {/* Step 5 Header - Seamlessly integrated, expands when sticky */}
      <div className={`sticky top-16 z-30 transition-all duration-200 ${
        isHeaderSticky 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-lg' 
          : 'bg-white dark:bg-gray-800 rounded-t-lg border-t border-l border-r border-gray-200 dark:border-gray-700'
      } mb-0`}>
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-heart/10 to-ultramine/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-heart" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Build with AI Assistant</h2>
                  <p className="text-sm text-velvet-grey">
                    Step-by-step bot development
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">How to test the code?</span>
                <span className="sm:hidden">Help</span>
              </button>
              <button
                onClick={resetStep5Prompts}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                title="Reset Step 5 Progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-200 ${
        isHeaderSticky 
          ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg' 
          : 'bg-white dark:bg-gray-800 border-l border-r border-b border-gray-200 dark:border-gray-700 rounded-b-lg'
      } p-6`}>

        <div className="mb-8 bg-gradient-to-r from-mantis/10 to-eucalyptus/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-eucalyptus" />
            Prompting Instructions
          </h3>
          <div className="text-sm space-y-2 text-velvet-grey">
            <p>• Copy each prompt and paste it into your AI assistant</p>
            <p>• Use the generated code to build your bot incrementally</p>
            <p>• Test each feature in Webex before proceeding to the next step</p>
            <p>• Mark each step as complete once you&apos;ve implemented and verified the functionality</p>
          </div>
        </div>

        <div className="space-y-6">
          {prompts.map((prompt, index) => {
            const promptId = `5.${index + 1}`
            const isCompleted = isPromptCompleted(promptId)
            
            // Check if all previous steps are completed
            const canMarkComplete = index === 0 || prompts.slice(0, index).every((_, prevIndex) => 
              isPromptCompleted(`5.${prevIndex + 1}`)
            )
            
            return (
              <div 
                key={promptId} 
                className="relative"
                ref={(el) => { promptRefs.current[index] = el }}
              >
                <CopyablePrompt
                  title={prompt.title}
                  prompt={prompt.prompt}
                  className={isCompleted ? 'ring-2 ring-eucalyptus' : (!canMarkComplete ? 'opacity-60' : '')}
                />
                
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => {
                      if (canMarkComplete) {
                        markPromptCompleted(promptId)
                        // Auto-scroll to next prompt after a short delay
                        setTimeout(() => {
                          if (index < prompts.length - 1) {
                            const nextPromptRef = promptRefs.current[index + 1]
                            if (nextPromptRef) {
                              // Calculate offset to account for main header (64px) + Step 5 header (80px) + padding (20px)
                              const headerOffset = 164
                              const elementPosition = nextPromptRef.getBoundingClientRect().top
                              const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                              
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              })
                            }
                          }
                        }, 200)
                      }
                    }}
                    disabled={!canMarkComplete && !isCompleted}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isCompleted
                        ? 'bg-eucalyptus text-white'
                        : canMarkComplete
                        ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    title={!canMarkComplete && !isCompleted ? 'Complete previous steps first' : ''}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {isCompleted ? 'Completed' : 'Mark as Complete'}
                    </span>
                  </button>
                </div>
                
                {index < prompts.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="wizard-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={!prompts.every((_, index) => isPromptCompleted(`5.${index + 1}`))}
            className={`wizard-button ${
              prompts.every((_, index) => isPromptCompleted(`5.${index + 1}`))
                ? 'wizard-button-primary'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            title={!prompts.every((_, index) => isPromptCompleted(`5.${index + 1}`)) ? 'Complete all steps first' : ''}
          >
            Continue to Full Prompt
          </button>
        </div>
      </div>

      {/* Testing Instructions Modal */}
      <TestingInstructionsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
