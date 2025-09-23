'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface BotCredentials {
  token: string
  email: string
  name: string
  webhookUrl?: string
}

export interface DeveloperCredentials {
  username: string
  password: string
}

export interface CompletedPrompts {
  [key: string]: boolean // key is like "5.1", "5.2", etc.
}

interface WizardState {
  currentStep: number
  completedSteps: number[]
  botCredentials: BotCredentials
  developerCredentials: DeveloperCredentials
  completedPrompts: CompletedPrompts
  sessionStartTime: string
  lastAccessTime: string
  journeyStartTime?: string
  journeyEndTime?: string
}

interface WizardContextType {
  currentStep: number
  botCredentials: BotCredentials
  developerCredentials: DeveloperCredentials
  completedPrompts: CompletedPrompts
  setBotCredentials: (credentials: BotCredentials) => void
  setDeveloperCredentials: (credentials: DeveloperCredentials) => void
  setCompletedPrompts: (prompts: CompletedPrompts) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  completedSteps: Set<number>
  markStepCompleted: (step: number) => void
  markPromptCompleted: (promptId: string) => void
  isPromptCompleted: (promptId: string) => boolean
  resetLab: () => void
  resetProgress: () => void
  getSessionInfo: () => { sessionStartTime: string; lastAccessTime: string }
  hasDeveloperCredentials: () => boolean
  startJourney: () => void
  stopJourney: () => void
  getJourneyDuration: () => string | null
  getFinalJourneyDuration: () => string | null
}

const WizardContext = createContext<WizardContextType | undefined>(undefined)

const STORAGE_KEY = 'lab-1544-wizard-state-v2' // Updated key to force fresh start

const defaultState: WizardState = {
  currentStep: 1,
  completedSteps: [],
  botCredentials: {
    token: '',
    email: '',
    name: '',
    webhookUrl: ''
  },
  developerCredentials: {
    username: '',
    password: ''
  },
  completedPrompts: {},
  sessionStartTime: new Date().toISOString(),
  lastAccessTime: new Date().toISOString()
}

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [botCredentials, setBotCredentialsState] = useState<BotCredentials>({
    token: '',
    email: '',
    name: '',
    webhookUrl: ''
  })
  const [developerCredentials, setDeveloperCredentialsState] = useState<DeveloperCredentials>({
    username: '',
    password: ''
  })
  const [completedPrompts, setCompletedPrompts] = useState<CompletedPrompts>({})
  const [sessionInfo, setSessionInfo] = useState({
    sessionStartTime: new Date().toISOString(),
    lastAccessTime: new Date().toISOString()
  })
  const [journeyStartTime, setJourneyStartTime] = useState<string | null>(null)
  const [journeyEndTime, setJourneyEndTime] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY)
        if (savedState) {
          const parsed: WizardState = JSON.parse(savedState)
          
          setCurrentStep(parsed.currentStep)
          setCompletedSteps(new Set(parsed.completedSteps))
          setBotCredentialsState({
            ...parsed.botCredentials,
            webhookUrl: parsed.botCredentials.webhookUrl || ''
          })
          setDeveloperCredentialsState(parsed.developerCredentials || { username: '', password: '' })
          setCompletedPrompts(parsed.completedPrompts || {})
          setSessionInfo({
            sessionStartTime: parsed.sessionStartTime,
            lastAccessTime: new Date().toISOString() // Update last access time
          })
          setJourneyStartTime(parsed.journeyStartTime || null)
          setJourneyEndTime(parsed.journeyEndTime || null)
          
          console.log('🔄 Lab session restored from:', new Date(parsed.lastAccessTime).toLocaleString())
        } else {
          console.log('🚀 Starting new lab session')
        }
      } catch (error) {
        console.error('Error loading saved state:', error)
      } finally {
        setIsLoaded(true)
      }
    } else {
      setIsLoaded(true)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const stateToSave: WizardState = {
        currentStep,
        completedSteps: Array.from(completedSteps),
        botCredentials,
        developerCredentials,
        completedPrompts,
        sessionStartTime: sessionInfo.sessionStartTime,
        lastAccessTime: new Date().toISOString(),
        journeyStartTime: journeyStartTime || undefined,
        journeyEndTime: journeyEndTime || undefined
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    }
  }, [currentStep, completedSteps, botCredentials, developerCredentials, completedPrompts, isLoaded, sessionInfo.sessionStartTime, journeyStartTime, journeyEndTime])

  const setBotCredentials = (credentials: BotCredentials) => {
    setBotCredentialsState(credentials)
  }

  const setDeveloperCredentials = (credentials: DeveloperCredentials) => {
    setDeveloperCredentialsState(credentials)
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const nextStep = () => {
    markStepCompleted(currentStep)
    const newStep = Math.min(currentStep + 1, 7)
    
    // Stop timer when completing Step 6 (going to Step 7)
    if (currentStep === 6 && newStep === 7) {
      if (journeyStartTime && !journeyEndTime) {
        setJourneyEndTime(new Date().toISOString())
      }
    }
    
    setCurrentStep(newStep)
    scrollToTop()
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    scrollToTop()
  }

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 7)))
    scrollToTop()
  }

  const markStepCompleted = (step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step))
  }

  const markPromptCompleted = (promptId: string) => {
    setCompletedPrompts(prev => ({
      ...prev,
      [promptId]: true
    }))
  }

  const isPromptCompleted = (promptId: string): boolean => {
    return completedPrompts[promptId] || false
  }

  const resetLab = () => {
    setCurrentStep(1)
    setCompletedSteps(new Set())
    setBotCredentialsState({
      token: '',
      email: '',
      name: '',
      webhookUrl: ''
    })
    setDeveloperCredentialsState({
      username: '',
      password: ''
    })
    setCompletedPrompts({})
    setSessionInfo({
      sessionStartTime: new Date().toISOString(),
      lastAccessTime: new Date().toISOString()
    })
    setJourneyStartTime(null)
    setJourneyEndTime(null)
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
    
    console.log('🔄 Lab session reset')
  }

  const resetProgress = () => {
    setCurrentStep(1)
    setCompletedSteps(new Set())
    setCompletedPrompts({})
    setBotCredentialsState({
      token: '',
      email: '',
      name: '',
      webhookUrl: ''
    })
    setJourneyStartTime(null)
    setJourneyEndTime(null)
    
    console.log('🔄 Lab progress reset')
  }

  const hasDeveloperCredentials = (): boolean => {
    return developerCredentials.username.length > 0 && developerCredentials.password.length > 0
  }

  const startJourney = () => {
    if (!journeyStartTime) {
      setJourneyStartTime(new Date().toISOString())
    }
  }

  const stopJourney = () => {
    if (journeyStartTime && !journeyEndTime) {
      setJourneyEndTime(new Date().toISOString())
    }
  }

  const getJourneyDuration = (): string | null => {
    if (!journeyStartTime || journeyEndTime) return null // Don't show if journey ended
    
    const start = new Date(journeyStartTime)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor((diffMs % 60000) / 1000)
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  const getFinalJourneyDuration = (): string | null => {
    if (!journeyStartTime || !journeyEndTime) return null
    
    const start = new Date(journeyStartTime)
    const end = new Date(journeyEndTime)
    const diffMs = end.getTime() - start.getTime()
    
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor((diffMs % 60000) / 1000)
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

  const getSessionInfo = () => ({
    sessionStartTime: sessionInfo.sessionStartTime,
    lastAccessTime: sessionInfo.lastAccessTime
  })

  // Don't render until state is loaded to prevent hydration issues
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ultramine mx-auto mb-4"></div>
          <p className="text-velvet-grey">Loading lab session...</p>
        </div>
      </div>
    )
  }

  return (
    <WizardContext.Provider value={{
      currentStep,
      botCredentials,
      developerCredentials,
      completedPrompts,
      setBotCredentials,
      setDeveloperCredentials,
      setCompletedPrompts,
      nextStep,
      prevStep,
      goToStep,
      completedSteps,
      markStepCompleted,
      markPromptCompleted,
      isPromptCompleted,
      resetLab,
      resetProgress,
      getSessionInfo,
      hasDeveloperCredentials,
      startJourney,
      stopJourney,
      getJourneyDuration,
      getFinalJourneyDuration
    }}>
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider')
  }
  return context
}
