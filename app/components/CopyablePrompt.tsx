'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CopyablePromptProps {
  title: string
  prompt: string
  className?: string
}

export function CopyablePrompt({ title, prompt, className = '' }: CopyablePromptProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className={`wizard-card ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-ultramine">{title}</h3>
        <button
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            copied 
              ? 'bg-eucalyptus text-white' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border">
        <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
          {prompt}
        </pre>
      </div>
    </div>
  )
}
