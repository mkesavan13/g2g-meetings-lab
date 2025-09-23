'use client'

import { CheckCircle, Star, RefreshCw, ExternalLink, Github, Clock } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'

export function Step7ThankYou() {
  const { resetProgress, getFinalJourneyDuration } = useWizard()

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart the lab? This will reset your progress but keep your credentials.')) {
      resetProgress()
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="wizard-card text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-eucalyptus to-mantis rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-eucalyptus to-ultramine bg-clip-text text-transparent">
            Congratulations! 🎉
          </h2>
          <h3 className="text-2xl font-semibold mb-4">
            You&apos;ve completed LAB-1544
          </h3>
          <p className="text-lg text-velvet-grey">
            Build on Webex with Cisco AI Assistant: A session for developers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-eucalyptus/10 to-mantis/10 rounded-lg p-6">
            <Star className="w-8 h-8 text-eucalyptus mx-auto mb-3" />
            <h4 className="font-semibold mb-2">What You Built</h4>
            <p className="text-sm text-velvet-grey">
              A fully functional Webex bot with echo, math evaluation, and smart filtering capabilities
            </p>
          </div>

          <div className="bg-gradient-to-br from-ultramine/10 to-fountain-blue/10 rounded-lg p-6">
            <Star className="w-8 h-8 text-ultramine mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Skills Gained</h4>
            <p className="text-sm text-velvet-grey">
              Webex API integration, webhook handling, and AI-assisted development workflows
            </p>
          </div>

          <div className="bg-gradient-to-br from-passion-fruit/10 to-mandarin/10 rounded-lg p-6">
            <Star className="w-8 h-8 text-passion-fruit mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Ready for More</h4>
            <p className="text-sm text-velvet-grey">
              You&apos;re now equipped to build more advanced Webex bots, integrations, and importantly AI Assistant!
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-heart/10 to-scarlet/10 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-heart" />
              Session Summary
            </h3>
            <div className="space-y-3 text-sm">
              {getFinalJourneyDuration() && (
                <div className="flex justify-between">
                  <span className="text-velvet-grey">Lab Completion Time:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{getFinalJourneyDuration()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-velvet-grey">Status:</span>
                <span className="font-medium text-eucalyptus">✅ Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleRestart}
            className="wizard-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Lab
          </button>
          
          <a
            href="https://developer.webex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="wizard-button-primary flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Webex Developer Portal
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-velvet-grey">
            Thank you for completing this AI-assisted development lab session!
          </p>
          <p className="text-xs text-velvet-grey mt-2">
            LAB-1544 - Build on Webex with Cisco AI Assistant
          </p>
        </div>
      </div>
    </div>
  )
}
