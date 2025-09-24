'use client'

import { FileCode, Rocket, Download } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { CopyablePrompt } from '../CopyablePrompt'

export function Step6FinalPrompt() {
  const { nextStep, prevStep, botCredentials } = useWizard()

  const finalPrompt = `Create a Webex bot using Webex APIs running on port 3000 which can listen to messages in a space using the Webex webhooks. Add no filters or secret to the webhook. When the webhook is invoked with messages, it should send responses based on the following cases: 

1. When the message starts with the keyword Echo. Like "Echo {message}", respond "You said: {message}"

2. If not, consider it a mathematical expression and evaluate it using \`eval\`. Respond "Result: {evaluated_expression}"

3. If it is neither of these, send response as an error stating, the bot expects a echo or a mathematical expression

4. Ensure to not respond to messages from the Bot itself. Use email ID to filter. The bot email ID is "${botCredentials.email}"

5. My Bot name is "${botCredentials.name}". If it is present in the message, remove it and then any trailing spaces. Consider that to be the actual message and then start the evaluation

6. For webhook creation, If the error response is 409, instead of printing the error, just print webhook is already created

Here are the credentials:
1. access token: "${botCredentials.token}"
2. webhook server URL: "${botCredentials.webhookUrl}"`

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <FileCode className="w-16 h-16 text-scarlet mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Full Prompt</h2>
          <p className="text-velvet-grey">
            Here&apos;s the consolidated prompt with all features combined
          </p>
        </div>

        <CopyablePrompt
          title="Complete Bot Prompt"
          prompt={finalPrompt}
        />

        <div className="mt-8">
          <div className="bg-gradient-to-br from-eucalyptus/10 to-mantis/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Rocket className="w-5 h-5 mr-2 text-eucalyptus" />
              Features Included
            </h3>
            <ul className="space-y-2 text-sm text-velvet-grey">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-eucalyptus rounded-full mr-2"></span>
                Echo message functionality
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-fountain-blue rounded-full mr-2"></span>
                Mathematical expression evaluation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-mantis rounded-full mr-2"></span>
                Bot self-message filtering
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-passion-fruit rounded-full mr-2"></span>
                Bot name recognition and removal
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-mandarin rounded-full mr-2"></span>
                Webhook conflict handling
              </li>
            </ul>
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
