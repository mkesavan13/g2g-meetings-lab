'use client'

import { Bot, ExternalLink, CheckCircle, User, Settings, Globe, Copy, Check } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { useState } from 'react'

export function Step3CreateBot() {
  const { nextStep, prevStep, developerCredentials } = useWizard()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  
  // Generate bot username from developer portal username
  const generateBotUsername = () => {
    if (!developerCredentials.username) return 'aiassistantlab@webex.bot'
    
    const usernameBeforeAt = developerCredentials.username.split('@')[0]
    return `aiassistantlab-${usernameBeforeAt}@webex.bot`
  }

  // Generate bot username without @webex.bot suffix for copying
  const getBotUsernameForCopy = () => {
    if (!developerCredentials.username) return 'aiassistantlab'
    
    const usernameBeforeAt = developerCredentials.username.split('@')[0]
    return `aiassistantlab-${usernameBeforeAt}`
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const botCreationSteps = [
    {
      step: 1,
      icon: Globe,
      title: "Go to Developer Portal",
      description: "Navigate to the Webex Developer Portal where you're already logged in",
      action: "Visit developer.webex.com"
    },
    {
      step: 2,
      icon: User,
      title: "Access Your Profile",
      description: "Click on your profile picture in the top right corner of the page",
      action: "Click Profile Picture → My Webex Apps"
    },
    {
      step: 3,
      icon: Bot,
      title: "Create New App",
      description: "Start the bot creation process",
      action: "Click 'Create a New App' → Select 'Create a Bot'"
    },
    {
      step: 4,
      icon: Settings,
      title: "Fill Bot Details",
      description: "Complete the required information for your bot using the suggested values below",
      action: "Fill: Bot Name, Bot Username, App Hub Description",
      showConfig: true
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Create Bot",
      description: "Finalize the bot creation process",
      action: "Click 'Add Bot' to complete creation"
    }
  ]

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Bot className="w-16 h-16 text-eucalyptus mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Create a New Bot</h2>
          <p className="text-velvet-grey">
            Follow these steps to create your Webex bot in the Developer Portal
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-eucalyptus/10 to-mantis/10 rounded-lg p-6 border border-eucalyptus/20">
            <div className="flex items-center mb-4">
              <ExternalLink className="w-5 h-5 mr-2 text-eucalyptus" />
              <h3 className="text-lg font-semibold">Developer Portal Access</h3>
            </div>
            <p className="text-sm text-velvet-grey mb-4">
              Make sure you&apos;re logged into the Webex Developer Portal before starting these steps.
            </p>
            <a
              href="https://developer.webex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="wizard-button bg-eucalyptus text-white hover:bg-green-700 inline-flex items-center"
            >
              Open Developer Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="space-y-4">
            {botCreationSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.step} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-5 h-5 mr-2 text-eucalyptus" />
                        <h4 className="text-lg font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-velvet-grey mb-3">{step.description}</p>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm font-mono text-eucalyptus">
                          <strong>Action:</strong> {step.action}
                        </p>
                      </div>
                      
                      {step.showConfig && (
                        <div className="mt-4 bg-gradient-to-r from-passion-fruit/10 to-mandarin/10 rounded-lg p-4 border border-passion-fruit/20">
                          <h4 className="text-sm font-semibold mb-3 flex items-center text-passion-fruit">
                            <Settings className="w-4 h-4 mr-2" />
                            Suggested Configuration
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div>
                              <p className="text-velvet-grey mb-1"><strong>Bot Name:</strong></p>
                              <div className="flex items-center space-x-2">
                                <p className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1">AIAssistantLabBot</p>
                                <button
                                  onClick={() => copyToClipboard('AIAssistantLabBot', 'botName')}
                                  className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                                  title="Copy Bot Name"
                                >
                                  {copiedField === 'botName' ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-velvet-grey mb-1"><strong>Bot Username:</strong></p>
                              <div className="flex items-center space-x-2">
                                <p className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1">{generateBotUsername()}</p>
                                <button
                                  onClick={() => copyToClipboard(getBotUsernameForCopy(), 'botUsername')}
                                  className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                                  title="Copy Bot Username"
                                >
                                  {copiedField === 'botUsername' ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-velvet-grey mb-1"><strong>App Hub Description:</strong></p>
                              <div className="flex items-start space-x-2">
                                <p className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1">
                                  A learning bot created during LAB-1544 for exploring Webex bot development with AI assistance.
                                </p>
                                <button
                                  onClick={() => copyToClipboard('A learning bot created during LAB-1544 for exploring Webex bot development with AI assistance.', 'description')}
                                  className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors mt-1"
                                  title="Copy Description"
                                >
                                  {copiedField === 'description' ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>


          <div className="text-center">
            <p className="text-sm text-velvet-grey mb-4">
              Once you&apos;ve completed all the steps above and created your bot, click continue below.
            </p>
            <button
              onClick={nextStep}
              className="wizard-button-primary"
            >
              I&apos;ve Created My Bot - Continue
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
