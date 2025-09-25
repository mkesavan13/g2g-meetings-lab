'use client'

import { Building, ExternalLink, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useWizard } from '../../contexts/WizardContext'

export function Step2CreateSandbox() {
  const { nextStep, prevStep } = useWizard()
  const [isRequested, setIsRequested] = useState(false)

  const handleSandboxRequested = () => {
    setIsRequested(true)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Building className="w-16 h-16 text-ultramine mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Create a G2G Sandbox</h2>
          <p className="text-velvet-grey">
            Request your Guest-to-Guest sandbox environment to get started
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ultramine/10 to-fountain-blue/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-ultramine" />
              Request G2G Sandbox
            </h3>
            <p className="text-sm text-velvet-grey mb-4">
              Click the link below to open the Guest-to-Guest sandbox request page, then follow the instructions to create your sandbox.
            </p>
            <a
              href="https://developer.webex.com/create/docs/g2g-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="wizard-button-primary inline-flex items-center"
            >
              Request a Guest to Guest Sandbox
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-eucalyptus" />
              Step-by-Step Instructions
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border-l-4 border-eucalyptus">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-eucalyptus text-white rounded-full font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-eucalyptus mb-2">Click the Sandbox Link</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Click the &quot;Request a Guest to Guest Sandbox&quot; button above to open the sandbox request page.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border-l-4 border-ultramine">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-ultramine text-white rounded-full font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-ultramine mb-2">Fill Out the Form</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      On the sandbox page, you&apos;ll see a form. Fill it out with:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Your official or personal email address</li>
                      <li>• Accept the terms and conditions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border-l-4 border-fountain-blue">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-fountain-blue text-white rounded-full font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-fountain-blue mb-2">Submit Request</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Click the Submit button to request your Guest-to-Guest sandbox environment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border-l-4 border-passion-fruit">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-passion-fruit text-white rounded-full font-bold text-sm">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-passion-fruit mb-2">Check Your Email</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      You&apos;ll receive an email with your sandbox credentials and admin account details. Keep this email handy for the next steps.
                    </p>
                  </div>
                </div>
              </div>
              
              {!isRequested && (
                <div className="text-center pt-4">
                  <button
                    onClick={handleSandboxRequested}
                    className="wizard-button wizard-button-primary"
                  >
                    I&apos;ve Requested My Sandbox
                  </button>
                </div>
              )}
              
              {isRequested && (
                <div className="p-4 bg-gradient-to-r from-eucalyptus/10 to-mantis/10 rounded-lg border border-eucalyptus/20">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-eucalyptus mr-2" />
                    <p className="text-sm font-semibold text-eucalyptus">Great! Sandbox Requested</p>
                  </div>
                  <p className="text-sm text-eucalyptus">
                    Check your email for sandbox credentials and admin account details. You&apos;ll need these for the next steps.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-velvet-grey mb-4">
              Once you&apos;ve completed the sandbox request and received your email confirmation, click continue below.
            </p>
            <button
              onClick={nextStep}
              disabled={!isRequested}
              className={`wizard-button-secondary ${
                !isRequested 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              I&apos;ve Received My Sandbox Email - Continue
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
