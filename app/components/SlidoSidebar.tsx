'use client'

import { MessageSquare } from 'lucide-react'

export function SlidoSidebar() {
  return (
    <div className="fixed right-0 top-0 h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg z-40 transition-all duration-300 hidden lg:block w-96">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-ultramine" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Slido Interactions</h3>
        </div>
      </div>

      {/* Content */}
      <div className="h-full pb-16">
        <iframe 
          src="https://app.sli.do/event/1A4cgLc9qeYxXA7LrQmpMj" 
          height="100%" 
          width="100%" 
          frameBorder="0" 
          style={{minHeight: '560px'}}
          allow="clipboard-write" 
          title="Slido"
          className="border-0"
        />
      </div>
    </div>
  )
}