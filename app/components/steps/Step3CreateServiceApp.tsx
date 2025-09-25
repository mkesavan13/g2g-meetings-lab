'use client'

import { Settings, ExternalLink, CheckCircle, User, Globe, Copy, Check, Code } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { useState } from 'react'

export function Step3CreateServiceApp() {
  const { nextStep, prevStep } = useWizard()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [copiedScopes, setCopiedScopes] = useState<Set<string>>(new Set())
  

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      
      // Track if this is a scope that was copied
      if (field.startsWith('scope')) {
        setCopiedScopes(prev => new Set(prev).add(field))
      }
      
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const serviceAppSteps = [
    {
      step: 2,
      icon: User,
      title: "Access Your Profile",
      description: "Click on your profile picture in the top right corner of the page",
      action: ["→ Click Profile Picture", "→ My Webex Apps"]
    },
    {
      step: 3,
      icon: Settings,
      title: "Create Service App",
      description: "Start the service app creation process",
      action: ["→ Click 'Create a New App'", "→ Select 'Create a Service App'"]
    },
    {
      step: 4,
      icon: Code,
      title: "Fill App Details",
      description: "Complete the required information for your service app using the suggested values below",
      action: "Fill: App Name, Description, Contact Email, Scopes",
      showConfig: true
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Create App",
      description: "Finalize the service app creation process",
      action: "Click 'Add Service App' to complete creation"
    }
  ]

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Settings className="w-16 h-16 text-eucalyptus mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Create a Service App</h2>
          <p className="text-velvet-grey">
            Create your Webex service application for Guest-to-Guest meetings
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <ExternalLink className="w-5 h-5 mr-2 text-eucalyptus" />
                  <h4 className="text-lg font-semibold">Developer Portal Access</h4>
                </div>
                <p className="text-velvet-grey mb-3">Make sure you&apos;re logged into the Webex Developer Portal before starting these steps.</p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-3">Visit developer.webex.com</p>
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
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {serviceAppSteps.map((step, index) => {
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
                      
                      {step.showConfig && (
                        <div className="mt-4 bg-gradient-to-r from-passion-fruit/10 to-mandarin/10 rounded-lg p-4 border border-passion-fruit/20">
                          <h4 className="text-sm font-semibold mb-3 flex items-center text-passion-fruit">
                            <Settings className="w-4 h-4 mr-2" />
                            Suggested Configuration
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div>
                              <p className="text-velvet-grey mb-1"><strong>App Name:</strong></p>
                              <div className="flex items-center space-x-2">
                                <p className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1">G2G Lab</p>
                                <button
                                  onClick={() => copyToClipboard('G2G Lab', 'appName')}
                                  className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                                  title="Copy App Name"
                                >
                                  {copiedField === 'appName' ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-velvet-grey mb-1"><strong>Description:</strong></p>
                              <div className="flex items-start space-x-2">
                                <p className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1">
                                  This is a lab app created for LAB-2843 Guest-to-Guest meetings
                                </p>
                                <button
                                  onClick={() => copyToClipboard('This is a lab app created for LAB-2843 Guest-to-Guest meetings', 'description')}
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
                            <div>
                              <p className="text-velvet-grey mb-1"><strong>Contact Email:</strong></p>
                              <div className="flex items-center space-x-2">
                                <p className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1">Use the assigned email from the Sandbox creation email</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-velvet-grey mb-3"><strong>Scopes:</strong></p>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1 flex justify-between items-center">
                                    <span>meeting:schedules_read</span>
                                    {copiedScopes.has('scope1') && <span className="text-xs text-eucalyptus font-semibold">✓ copied</span>}
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard('meeting:schedules_read', 'scope1')}
                                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                                    title="Copy Scope"
                                  >
                                    {copiedField === 'scope1' ? (
                                      <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1 flex justify-between items-center">
                                    <span>meeting:schedules_write</span>
                                    {copiedScopes.has('scope2') && <span className="text-xs text-eucalyptus font-semibold">✓ copied</span>}
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard('meeting:schedules_write', 'scope2')}
                                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                                    title="Copy Scope"
                                  >
                                    {copiedField === 'scope2' ? (
                                      <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-xs flex-1 flex justify-between items-center">
                                    <span>guest-meeting:rw</span>
                                    {copiedScopes.has('scope3') && <span className="text-xs text-eucalyptus font-semibold">✓ copied</span>}
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard('guest-meeting:rw', 'scope3')}
                                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                                    title="Copy Scope"
                                  >
                                    {copiedField === 'scope3' ? (
                                      <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    )}
                                  </button>
                                </div>
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
              Once you&apos;ve completed all the steps above and created your service app, click continue below.
            </p>
            <button
              onClick={nextStep}
              className="wizard-button-primary"
            >
              I&apos;ve Created My Service App - Continue
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
