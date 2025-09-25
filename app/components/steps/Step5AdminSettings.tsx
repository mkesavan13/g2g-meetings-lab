'use client'

import { Shield, ExternalLink, CheckCircle, AlertCircle, Settings, Users, Lock, ToggleLeft } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { useState, useEffect } from 'react'

export function Step5AdminSettings() {
  const { nextStep, prevStep } = useWizard()
  const [isStep1Complete, setIsStep1Complete] = useState(false)

  // Load completion state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('step5-substep1-complete')
    if (saved === 'true') {
      setIsStep1Complete(true)
    }
  }, [])

  // Save completion state to localStorage
  const markStep1Complete = () => {
    setIsStep1Complete(true)
    localStorage.setItem('step5-substep1-complete', 'true')
  }

  const authSteps = [
    {
      step: 2,
      icon: Settings,
      title: "Navigate to Service Apps",
      description: "Find your G2G Lab app in the admin console",
      action: ["→ Click 'Apps' on the left sidebar", "→ Click 'Service Apps' tab in the right panel"]
    },
    {
      step: 3,
      icon: Shield,
      title: "Find Your App",
      description: "Locate and click on the G2G Lab service app you created",
      action: "Find and click on 'G2G Lab' in the list of service apps"
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Authorize the App",
      description: "Enable authorization for your service app",
      action: ["→ Click on your app", "→ Toggle 'Authorize'", "→ Save"]
    }
  ]

  const g2gSteps = [
    {
      step: 2,
      icon: Users,
      title: "Navigate to Meetings Settings",
      description: "Access Guest site settings in the admin portal",
      action: ["→ Click 'Meetings' in the left sidebar under Services", "→ Choose your Guest site", "→ Click 'All' in the tabs list", "→ Choose 'Security'"]
    },
    {
      step: 3,
      icon: Lock,
      title: "Update Join Rules",
      description: "Configure meeting security for Guest-to-Guest access",
      action: ["→ Find 'Webex meeting security' section", "→ Locate 'Select how to manage people who aren't invited or aren't signed in'", "→ Change setting to 'They can join the meeting'"]
    },
    {
      step: 4,
      icon: ToggleLeft,
      title: "Configure Attendee Settings",
      description: "Enable attendee permissions for Guest-to-Guest meetings",
      action: ["→ Scroll down to 'Attendees' section", "→ Toggle ON: 'Allow attendees or panellists to join before the host'", "→ Toggle ON: 'Allow attendees to join the audio conference'", "→ Toggle ON: 'The first attendee to join will be the presenter'", "→ Click 'Save' at the bottom"]
    }
  ]


  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Settings className="w-16 h-16 text-eucalyptus mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Admin Settings</h2>
          <p className="text-velvet-grey">
            Configure your service app authorization and Guest-to-Guest meeting settings
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-scarlet/10 to-mandarin/10 rounded-lg p-4 border border-scarlet/20">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-scarlet mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-scarlet mb-2">Admin Credentials Required:</h4>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Use the admin account credentials you received in the sandbox creation email to access admin.webex.com
                </p>
              </div>
            </div>
          </div>

          {/* Step 5.1: Authorize App */}
          <div className="bg-gradient-to-r from-ultramine/10 to-fountain-blue/10 rounded-lg p-6 border border-ultramine/20">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-ultramine to-fountain-blue rounded-full text-white font-bold text-lg mr-4">
                5.1
              </div>
              <div>
                <h3 className="text-xl font-bold text-ultramine">Authorize App</h3>
                <p className="text-sm text-velvet-grey">Enable your service app in the admin console</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <ExternalLink className="w-5 h-5 mr-2 text-eucalyptus" />
                    <h4 className="text-lg font-semibold">Admin Portal Access</h4>
                  </div>
                  <p className="text-velvet-grey mb-3">Click the link below to access the Webex admin portal where you&apos;ll authorize your service app.</p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-3">Visit admin.webex.com</p>
                    <a
                      href="https://admin.webex.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wizard-button bg-eucalyptus text-white hover:bg-green-700 inline-flex items-center"
                    >
                      Open Admin Portal
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {authSteps.map((step, index) => {
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
                          <div className="text-sm font-mono text-eucalyptus">
                            <strong>Action:</strong>
                            {Array.isArray(step.action) ? (
                              <ul className="space-y-1 mt-1">
                                {step.action.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              <span> {step.action}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mark Step 5.1 Complete Button */}
            {!isStep1Complete && (
              <div className="text-center">
                <button
                  onClick={markStep1Complete}
                  className="wizard-button bg-ultramine text-white hover:bg-blue-700 inline-flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Step 5.1 Complete
                </button>
              </div>
            )}

            {/* Step 5.1 Complete Indicator */}
            {isStep1Complete && (
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Step 5.1 Complete - App Authorization Done!
                </div>
              </div>
            )}
          </div>

          {/* Step 5.2: Settings for Guest-to-Guest - Only show when Step 5.1 is complete */}
          {isStep1Complete && (
            <div className="bg-gradient-to-r from-eucalyptus/10 to-mantis/10 rounded-lg p-6 border border-eucalyptus/20 animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold text-lg mr-4">
                  5.2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-eucalyptus">Settings for Guest-to-Guest</h3>
                  <p className="text-sm text-velvet-grey">Configure meeting settings to enable Guest-to-Guest functionality</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <ExternalLink className="w-5 h-5 mr-2 text-eucalyptus" />
                      <h4 className="text-lg font-semibold">Admin Portal Access</h4>
                    </div>
                    <p className="text-velvet-grey mb-3">Use the same admin portal to configure Guest-to-Guest meeting settings.</p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-3">Visit admin.webex.com</p>
                      <a
                        href="https://admin.webex.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wizard-button bg-eucalyptus text-white hover:bg-green-700 inline-flex items-center"
                      >
                        Open Admin Portal
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {g2gSteps.map((step, index) => {
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
                            <div className="text-sm font-mono text-eucalyptus">
                              <strong>Action:</strong>
                              {Array.isArray(step.action) ? (
                                <ul className="space-y-1 mt-1">
                                  {step.action.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span> {step.action}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-velvet-grey mb-4">
              {isStep1Complete 
                ? "Once you've completed the Guest-to-Guest settings above, click continue below."
                : "Complete Step 5.1 first to unlock Guest-to-Guest settings configuration."
              }
            </p>
            <button
              onClick={nextStep}
              className={`wizard-button-primary ${!isStep1Complete ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isStep1Complete}
            >
              Continue to Generate Guest Tokens
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