'use client'

import { Code, ExternalLink, Github, Zap, Users, Calendar } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'

export function Step7BuildingApp() {
  const { nextStep, prevStep } = useWizard()

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Code className="w-16 h-16 text-eucalyptus mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Build your PlanMyTrip app with Webex Meetings SDK</h2>
          <p className="text-velvet-grey">
            Learn how to integrate Guest-to-Guest meetings into a real-world application
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ultramine/10 to-fountain-blue/10 rounded-lg p-6 border border-ultramine/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-ultramine" />
              PlanMyTrip Application
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                PlanMyTrip is a sample application that demonstrates how to integrate Guest-to-Guest meetings 
                into a trip planning platform. Users can schedule virtual meetings with travel companions 
                without requiring Webex accounts.
              </p>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ultramine rounded-full mr-2"></span>
                    Guest meeting creation and management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-eucalyptus rounded-full mr-2"></span>
                    Trip itinerary with integrated video calls
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-fountain-blue rounded-full mr-2"></span>
                    Real-time collaboration features
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-mantis rounded-full mr-2"></span>
                    No account required for guests
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-eucalyptus/10 to-mantis/10 rounded-lg p-6 border border-eucalyptus/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-eucalyptus" />
              Next Steps: Build with Webex SDK
            </h3>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  Sample Application
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Explore the complete PlanMyTrip application with Guest-to-Guest meetings integration.
                </p>
                <a
                  href="https://github.com/WebexSamples/planmytrip-g2g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wizard-button bg-eucalyptus text-white hover:bg-green-700 inline-flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  SDK Documentation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Learn more about the Webex Meetings SDK and Guest-to-Guest capabilities.
                </p>
                <a
                  href="https://developer.webex.com/docs/sdks/browser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wizard-button bg-ultramine text-white hover:bg-blue-700 inline-flex items-center"
                >
                  <Code className="w-4 h-4 mr-2" />
                  SDK Documentation
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Developer Community
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Join the Webex developer community for support and collaboration.
                </p>
                <a
                  href="https://developer.webex.com/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wizard-button bg-fountain-blue text-white hover:bg-cyan-600 inline-flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Developer Support
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-passion-fruit/10 to-mandarin/10 rounded-lg p-4 border border-passion-fruit/20">
            <h4 className="text-sm font-semibold text-passion-fruit mb-2">🚀 Ready to Build?</h4>
            <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <p>• Use the tokens you generated in the previous steps</p>
              <p>• Integrate the Webex Meetings SDK into your application</p>
              <p>• Test Guest-to-Guest meeting creation and management</p>
              <p>• Explore advanced features like screen sharing and recording</p>
            </div>
          </div>
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
            className="wizard-button-primary"
          >
            Complete Lab
          </button>
        </div>
      </div>
    </div>
  )
}
