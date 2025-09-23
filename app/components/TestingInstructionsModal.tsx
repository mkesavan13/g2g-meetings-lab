'use client'

import { X, Play, RefreshCw, Code, Copy } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TestingInstructionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TestingInstructionsModal({ isOpen, onClose }: TestingInstructionsModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const instructions = [
    {
      icon: <Copy className="w-5 h-5 text-blue-500" />,
      title: "Copy Code from AI Assistant",
      description: "Copy the generated code from your AI assistant chat",
      details: [
        "Select all the code provided by the AI assistant",
        "Use Ctrl+C (Windows/Linux) or Cmd+C (Mac) to copy"
      ]
    },
    {
      icon: <Code className="w-5 h-5 text-green-500" />,
      title: "Paste in VS Code Editor",
      description: "Open VS Code and paste the code into your project",
      details: [
        "Create a new file (e.g., bot.js or app.js)",
        "Paste the copied code using Ctrl+V (Windows/Linux) or Cmd+V (Mac)",
        "Save the file"
      ]
    },
    {
      icon: <Play className="w-5 h-5 text-purple-500" />,
      title: "Start the Server (Steps 5.1 only)",
      description: "For step 5.1, start your bot server",
      details: [
        "Open terminal in VS Code",
        "Install dependencies: npm install",
        "Run the bot: node bot.js or npm start",
        "Test the bot in your Webex space"
      ]
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-orange-500" />,
      title: "After Step 5.1 - Update & Restart",
      description: "For steps 5.2-5.5, update code and restart",
      details: [
        "Copy new code from AI assistant",
        "Replace the existing code in your file",
        "Stop the server (Ctrl+C)",
        "Restart the server: node bot.js",
        "Test the new functionality"
      ]
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                How to Test the Code?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step-by-step instructions for testing your Webex bot
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-6">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {instruction.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {instruction.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {instruction.description}
                  </p>
                  <ul className="space-y-1">
                    {instruction.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-gray-500 dark:text-gray-500 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5">
                💡
              </div>
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Important Notes
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Make sure your bot token and credentials are correctly configured</li>
                  <li>• Test each step in your Webex space before proceeding to the next</li>
                  <li>• Keep your server running while testing the bot functionality</li>
                  <li>• Check the console for any error messages if the bot doesn&apos;t respond</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
