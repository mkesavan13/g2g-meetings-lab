'use client'

import { Zap, ExternalLink, Copy, Check, Key, RefreshCw, Eye, EyeOff, Calendar, Clock, Loader2, Link, Users, Plus } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { useState, useEffect } from 'react'

export function Step6SdkPrerequisites() {
  const { nextStep, prevStep } = useWizard()
  const [clientSecret, setClientSecret] = useState('')
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [showAccessToken, setShowAccessToken] = useState(false)
  const [showRefreshToken, setShowRefreshToken] = useState(false)
  const [showClientSecret, setShowClientSecret] = useState(false)
  const [isStep1Complete, setIsStep1Complete] = useState(false)
  
  // Step 6.2 - Meeting creation states
  const [meetingTitle, setMeetingTitle] = useState('Wx1 G2G Lab')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false)
  const [meetingNumber, setMeetingNumber] = useState('')
  const [meetingId, setMeetingId] = useState('')
  const [meetingWebLink, setMeetingWebLink] = useState('')
  const [meetingSipAddress, setMeetingSipAddress] = useState('')
  const [meetingPassword, setMeetingPassword] = useState('')
  const [storedMeetingTitle, setStoredMeetingTitle] = useState('')
  const [storedStartTime, setStoredStartTime] = useState('')
  const [storedEndTime, setStoredEndTime] = useState('')
  const [startLink, setStartLink] = useState('')
  const [joinLink, setJoinLink] = useState('')
  const [copiedStartLink, setCopiedStartLink] = useState(false)
  const [copiedJoinLink, setCopiedJoinLink] = useState(false)
  const [copiedAccessToken, setCopiedAccessToken] = useState(false)
  const [copiedRefreshToken, setCopiedRefreshToken] = useState(false)

  // Guest token states
  const [agentToken, setAgentToken] = useState('')
  const [customerToken, setCustomerToken] = useState('')
  const [agentName, setAgentName] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [isCreatingAgentToken, setIsCreatingAgentToken] = useState(false)
  const [isCreatingCustomerToken, setIsCreatingCustomerToken] = useState(false)

  // Load client secret, tokens, completion state, and meeting links from localStorage on component mount
  useEffect(() => {
    const storedSecret = localStorage.getItem('g2g-client-secret')
    const storedAccessToken = localStorage.getItem('g2g-access-token')
    const storedRefreshToken = localStorage.getItem('g2g-refresh-token')
    const step1Complete = localStorage.getItem('step6-substep1-complete')
    const storedStartLink = localStorage.getItem('g2g-meeting-start-link')
    const storedJoinLink = localStorage.getItem('g2g-meeting-join-link')
    const storedMeetingNumber = localStorage.getItem('g2g-meeting-number')
    const storedMeetingId = localStorage.getItem('g2g-meeting-id')
    const storedMeetingWebLink = localStorage.getItem('g2g-meeting-web-link')
    const storedMeetingSipAddress = localStorage.getItem('g2g-meeting-sip-address')
    const storedMeetingPassword = localStorage.getItem('g2g-meeting-password')
    const storedMeetingTitleLS = localStorage.getItem('g2g-meeting-title')
    const storedStartTimeLS = localStorage.getItem('g2g-meeting-start-time')
    const storedEndTimeLS = localStorage.getItem('g2g-meeting-end-time')
    const storedAgentToken = localStorage.getItem('g2g-agent-token')
    const storedCustomerToken = localStorage.getItem('g2g-customer-token')
    const storedAgentName = localStorage.getItem('g2g-agent-name')
    const storedCustomerName = localStorage.getItem('g2g-customer-name')
    
    if (storedSecret) {
      setClientSecret(storedSecret)
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken)
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken)
    }
    if (step1Complete === 'true') {
      setIsStep1Complete(true)
    }
    if (storedStartLink) {
      setStartLink(storedStartLink)
    }
    if (storedJoinLink) {
      setJoinLink(storedJoinLink)
    }
    if (storedMeetingNumber) {
      setMeetingNumber(storedMeetingNumber)
    }
    if (storedMeetingId) {
      setMeetingId(storedMeetingId)
    }
    if (storedMeetingWebLink) {
      setMeetingWebLink(storedMeetingWebLink)
    }
    if (storedMeetingSipAddress) {
      setMeetingSipAddress(storedMeetingSipAddress)
    }
    if (storedMeetingPassword) {
      setMeetingPassword(storedMeetingPassword)
    }
    if (storedMeetingTitleLS) {
      setStoredMeetingTitle(storedMeetingTitleLS)
    }
    if (storedStartTimeLS) {
      setStoredStartTime(storedStartTimeLS)
    }
    if (storedEndTimeLS) {
      setStoredEndTime(storedEndTimeLS)
    }
    if (storedAgentToken) {
      setAgentToken(storedAgentToken)
    }
    if (storedCustomerToken) {
      setCustomerToken(storedCustomerToken)
    }
    if (storedAgentName) {
      setAgentName(storedAgentName)
    }
    if (storedCustomerName) {
      setCustomerName(storedCustomerName)
    }
  }, [])

  // Auto-update times and check for expired meetings
  useEffect(() => {
    const updateTimes = () => {
      // Check if meeting has expired and remove links if so
      if (startLink && endTime) {
        const now = new Date()
        const pstNow = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}))
        const meetingEndTime = new Date(endTime + ':00') // Add seconds to match format
        
        if (pstNow > meetingEndTime) {
          // Meeting has expired, remove links and data
          setStartLink('')
          setJoinLink('')
          setMeetingNumber('')
          localStorage.removeItem('g2g-meeting-start-link')
          localStorage.removeItem('g2g-meeting-join-link')
          localStorage.removeItem('g2g-meeting-number')
          localStorage.removeItem('g2g-meeting-end-time')
          console.log('Meeting expired and removed')
        }
      }
      
      // Only update times if no meeting links exist and not currently creating
      if (isCreatingMeeting || (startLink && joinLink)) {
        return // Stop updating if creating meeting or meeting links already exist
      }
      
      const now = new Date()
      const startDateTime = new Date(now.getTime() + 1 * 60000) // +1 minute
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000) // +30 minutes from start
      
      const formatDateTime = (date: Date) => {
        // Convert to PST timezone (America/Los_Angeles)
        const pstDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}))
        const year = pstDate.getFullYear()
        const month = String(pstDate.getMonth() + 1).padStart(2, '0')
        const day = String(pstDate.getDate()).padStart(2, '0')
        const hours = String(pstDate.getHours()).padStart(2, '0')
        const minutes = String(pstDate.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day}T${hours}:${minutes}` // Format: YYYY-MM-DDTHH:MM in PST
      }
      
      setStartTime(formatDateTime(startDateTime))
      setEndTime(formatDateTime(endDateTime))
    }
    
    // Update immediately
    updateTimes()
    
    // Update every minute
    // Calculate time until next minute to sync with minute boundaries
    const now = new Date()
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
    
    let interval: NodeJS.Timeout | null = null
    
    // Set initial timeout to sync with minute boundary, then use regular interval
    const initialTimeout = setTimeout(() => {
      updateTimes()
      interval = setInterval(updateTimes, 60000)
    }, msUntilNextMinute)
    
    // Return cleanup function for both timeout and interval
    return () => {
      clearTimeout(initialTimeout)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isCreatingMeeting, startLink, joinLink, endTime])

  // Mark Step 6.1 as complete
  const markStep1Complete = () => {
    setIsStep1Complete(true)
    localStorage.setItem('step6-substep1-complete', 'true')
  }

  // Create meeting function
  const createMeeting = async () => {
    if (!meetingTitle.trim() || !startTime || !endTime || !accessToken.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsCreatingMeeting(true)
    
    // Ensure meeting times are in the future by adding a buffer
    const now = new Date()
    const currentPST = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}))
    const meetingStart = new Date(startTime + ':00')
    
    let startFormatted: string
    let endFormatted: string
    
    // If the meeting start time is in the past or too close to now, adjust it
    if (meetingStart <= currentPST) {
      console.log('Meeting start time is in the past, adjusting...')
      const newStart = new Date(currentPST.getTime() + 2 * 60000) // +2 minutes from now
      const newEnd = new Date(newStart.getTime() + 30 * 60000) // +30 minutes from new start
      
      const formatDateTime = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = '00'
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
      }
      
      startFormatted = formatDateTime(newStart)
      endFormatted = formatDateTime(newEnd)
      
      console.log('Adjusted meeting times:', { startFormatted, endFormatted })
    } else {
      // Use the provided times, just add seconds
      startFormatted = startTime + ':00'
      endFormatted = endTime + ':00'
      
      console.log('Using provided meeting times:', { startFormatted, endFormatted })
    }
    
    const requestBody = {
      title: meetingTitle,
      start: startFormatted,
      end: endFormatted,
      timezone: 'America/Los_Angeles',
      enabledJoinBeforeHost: true
    }
    
    console.log('Creating meeting with payload:', requestBody)
    
    try {
      const response = await fetch('https://webexapis.com/v1/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      console.log('API Response status:', response.status)
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const meetingData = await response.json()
        console.log('Meeting created successfully - Full response:', meetingData)
        
        const meetingNum = meetingData.meetingNumber || meetingData.id || 'N/A'
        
        // Extract meeting information directly from create meeting response
        const meetingWebLink = meetingData.webLink || ''
        const meetingId = meetingData.id || ''
        const meetingSipAddress = meetingData.sipAddress || ''
        const meetingPassword = meetingData.password || ''
        
        // Update state with meeting information
        setMeetingNumber(meetingNum)
        setMeetingId(meetingId)
        setMeetingWebLink(meetingWebLink)
        setMeetingSipAddress(meetingSipAddress)
        setMeetingPassword(meetingPassword)
        setStoredMeetingTitle(meetingTitle)
        setStoredStartTime(startFormatted)
        setStoredEndTime(endFormatted)
        setStartLink(meetingWebLink) // Use webLink as the main meeting link
        setJoinLink(meetingWebLink)  // Same link for both start and join
        
        // Store meeting information in localStorage
        localStorage.setItem('g2g-meeting-number', meetingNum)
        localStorage.setItem('g2g-meeting-id', meetingId)
        localStorage.setItem('g2g-meeting-web-link', meetingWebLink)
        localStorage.setItem('g2g-meeting-sip-address', meetingSipAddress)
        localStorage.setItem('g2g-meeting-password', meetingPassword)
        localStorage.setItem('g2g-meeting-title', meetingTitle)
        localStorage.setItem('g2g-meeting-start-time', startFormatted)
        localStorage.setItem('g2g-meeting-end-time', endFormatted)
        
        console.log('Meeting information stored successfully:', {
          meetingNumber: meetingNum,
          meetingId: meetingId,
          webLink: meetingWebLink,
          sipAddress: meetingSipAddress,
          title: meetingTitle,
          startTime: startFormatted,
          endTime: endFormatted
        })
      } else {
        const errorData = await response.text()
        console.error('Failed to create meeting:')
        console.error('Status:', response.status)
        console.error('Status Text:', response.statusText)
        console.error('Error Response:', errorData)
        alert(`Failed to create meeting: ${response.status} ${response.statusText}\n${errorData}`)
      }
    } catch (error) {
      console.error('Network error creating meeting:', error)
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreatingMeeting(false)
    }
  }

  // Note: Join information is now extracted directly from create meeting response
  // The separate join API endpoint was causing 404 errors and is not needed

  // Copy link functions
  const copyLink = async (link: string, type: 'start' | 'join') => {
    try {
      await navigator.clipboard.writeText(link)
      if (type === 'start') {
        setCopiedStartLink(true)
        setTimeout(() => setCopiedStartLink(false), 2000)
      } else {
        setCopiedJoinLink(true)
        setTimeout(() => setCopiedJoinLink(false), 2000)
      }
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  // Copy token functions
  const copyToken = async (token: string, type: 'access' | 'refresh') => {
    try {
      await navigator.clipboard.writeText(token)
      if (type === 'access') {
        setCopiedAccessToken(true)
        setTimeout(() => setCopiedAccessToken(false), 2000)
      } else {
        setCopiedRefreshToken(true)
        setTimeout(() => setCopiedRefreshToken(false), 2000)
      }
    } catch (error) {
      console.error('Failed to copy token:', error)
    }
  }

  // Create agent token function
  const createAgentToken = async () => {
    if (!agentName.trim() || !accessToken.trim()) {
      alert('Please enter an agent name and ensure access token is available')
      return
    }

    setIsCreatingAgentToken(true)
    
    const timestamp = Date.now()
    const subject = `Wx1G2G-Agent-${timestamp}`
    
    const requestBody = {
      subject: subject,
      displayName: agentName.trim()
    }
    
    console.log('Creating agent token with payload:', requestBody)
    
    try {
      const response = await fetch('https://webexapis.com/v1/guests/token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      console.log('Agent token API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      if (response.ok) {
        const tokenData = await response.json()
        console.log('Agent token created successfully:', tokenData)
        
        const token = tokenData.token || tokenData.accessToken || ''
        
        // Update state and localStorage
        setAgentToken(token)
        localStorage.setItem('g2g-agent-token', token)
        localStorage.setItem('g2g-agent-name', agentName.trim())
        
        console.log('Agent token stored successfully')
      } else {
        const errorData = await response.text()
        console.error('Failed to create agent token:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        alert(`Failed to create agent token: ${response.status} ${response.statusText}\n${errorData}`)
      }
    } catch (error) {
      console.error('Network error creating agent token:', error)
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreatingAgentToken(false)
    }
  }

  // Create customer token function
  const createCustomerToken = async () => {
    if (!customerName.trim() || !accessToken.trim()) {
      alert('Please enter a customer name and ensure access token is available')
      return
    }

    setIsCreatingCustomerToken(true)
    
    const timestamp = Date.now()
    const subject = `Wx1G2G-Customer-${timestamp}`
    
    const requestBody = {
      subject: subject,
      displayName: customerName.trim()
    }
    
    console.log('Creating customer token with payload:', requestBody)
    
    try {
      const response = await fetch('https://webexapis.com/v1/guests/token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      console.log('Customer token API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      if (response.ok) {
        const tokenData = await response.json()
        console.log('Customer token created successfully:', tokenData)
        
        const token = tokenData.token || tokenData.accessToken || ''
        
        // Update state and localStorage
        setCustomerToken(token)
        localStorage.setItem('g2g-customer-token', token)
        localStorage.setItem('g2g-customer-name', customerName.trim())
        
        console.log('Customer token stored successfully')
      } else {
        const errorData = await response.text()
        console.error('Failed to create customer token:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        alert(`Failed to create customer token: ${response.status} ${response.statusText}\n${errorData}`)
      }
    } catch (error) {
      console.error('Network error creating customer token:', error)
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreatingCustomerToken(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSecret(true)
      setTimeout(() => setCopiedSecret(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleAccessTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAccessToken(value)
    if (value.trim()) {
      localStorage.setItem('g2g-access-token', value)
    }
  }

  const handleRefreshTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRefreshToken(value)
    if (value.trim()) {
      localStorage.setItem('g2g-refresh-token', value)
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="text-center mb-8">
          <Zap className="w-16 h-16 text-eucalyptus mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">SDK Pre-requisites</h2>
          <p className="text-velvet-grey">
            To get started with the Webex Meetings SDK, you need to obtain necessary tokens and credentials through these steps
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 6.1: Generate Tokens */}
          <div className="bg-gradient-to-r from-eucalyptus/10 to-mantis/10 rounded-lg p-6 border border-eucalyptus/20">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold text-lg mr-4">
                6.1
              </div>
              <div>
                <h3 className="text-xl font-bold text-eucalyptus">Generate Access Tokens</h3>
                <p className="text-sm text-velvet-grey">Generate access and refresh tokens from your service app</p>
              </div>
            </div>

            <div className="space-y-6">
          {/* Step 1: Service App Access */}
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
                  <h4 className="text-lg font-semibold">Access Your Service App</h4>
                </div>
                <p className="text-velvet-grey mb-3">Open or refresh your service app page to access the token generation section.</p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-3">
                    <p className="mb-2">If already open, refresh the page. If not:</p>
                    <ul className="space-y-1">
                      <li>→ Visit developer.webex.com</li>
                      <li>→ My Webex Apps</li>
                      <li>→ Your G2G Lab App</li>
                    </ul>
                  </div>
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

          {/* Step 2: Select Organization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Key className="w-5 h-5 mr-2 text-eucalyptus" />
                  <h4 className="text-lg font-semibold">Select Sandbox Organization</h4>
                </div>
                <p className="text-velvet-grey mb-3">In the &quot;Org Authorizations&quot; section, select your sandbox organization.</p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-mono text-eucalyptus">
                    <strong>Action:</strong>
                    <ul className="space-y-1 mt-1">
                      <li>→ Click &quot;Authorized orgs&quot; dropdown</li>
                      <li>→ Select sandbox org (only one will be present)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Enter Client Secret */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Copy className="w-5 h-5 mr-2 text-eucalyptus" />
                  <h4 className="text-lg font-semibold">Use Client Secret</h4>
                </div>
                <p className="text-velvet-grey mb-3">Copy your client secret and paste it in the &quot;Enter Client Secret&quot; section, then click Generate Tokens.</p>
                
                {clientSecret && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Your Client Secret:</label>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowClientSecret(!showClientSecret)}
                          className="flex items-center px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                          title={showClientSecret ? "Hide Secret" : "Show Secret"}
                        >
                          {showClientSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(clientSecret)}
                          className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                        >
                          {copiedSecret ? (
                            <Check className="w-4 h-4 text-eucalyptus" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="text-xs">
                            {copiedSecret ? 'Copied!' : 'Copy'}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-3 font-mono text-xs break-all border">
                      {showClientSecret ? clientSecret : '•'.repeat(Math.min(clientSecret.length, 32))}
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-mono text-eucalyptus">
                    <strong>Action:</strong>
                    <ul className="space-y-1 mt-1">
                      <li>→ Paste client secret</li>
                      <li>→ Click &quot;Generate Tokens&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Enter Generated Tokens */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-eucalyptus to-mantis rounded-full text-white font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <RefreshCw className="w-5 h-5 mr-2 text-eucalyptus" />
                  <h4 className="text-lg font-semibold">Store Generated Tokens</h4>
                </div>
                <p className="text-velvet-grey mb-3">Copy the generated access token and refresh token from the developer portal and paste them below.</p>
                
                <div className="bg-gradient-to-r from-purple-heart/10 to-scarlet/10 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-semibold mb-2 flex items-center">
                    <Key className="w-4 h-4 mr-2 text-purple-heart" />
                    Secure Local Storage
                  </h3>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Your access and refresh tokens are stored locally in your browser for this lab session only. 
                    They are not transmitted to any external servers and will be cleared when you reset the lab progress.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Refresh Token Input */}
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <RefreshCw className="w-4 h-4 mr-2 text-eucalyptus" />
                      Refresh Token
                    </label>
                    <div className="relative">
                      <input
                        type={showRefreshToken ? "text" : "password"}
                        value={refreshToken}
                        onChange={handleRefreshTokenChange}
                        placeholder="Paste your refresh token here..."
                        className="wizard-input pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRefreshToken(!showRefreshToken)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {showRefreshToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {refreshToken && (
                      <button
                        onClick={() => copyToken(refreshToken, 'refresh')}
                        className="flex items-center mt-2 px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        {copiedRefreshToken ? (
                          <>
                            <Check className="w-3 h-3 mr-1 text-eucalyptus" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Token
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Access Token Input */}
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Key className="w-4 h-4 mr-2 text-eucalyptus" />
                      Access Token
                    </label>
                    <div className="relative">
                      <input
                        type={showAccessToken ? "text" : "password"}
                        value={accessToken}
                        onChange={handleAccessTokenChange}
                        placeholder="Paste your access token here..."
                        className="wizard-input pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAccessToken(!showAccessToken)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {showAccessToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {accessToken && (
                      <button
                        onClick={() => copyToken(accessToken, 'access')}
                        className="flex items-center mt-2 px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        {copiedAccessToken ? (
                          <>
                            <Check className="w-3 h-3 mr-1 text-eucalyptus" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Token
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {(accessToken || refreshToken) && (
                    <div className="p-3 bg-eucalyptus/10 border border-eucalyptus/20 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Check className="w-4 h-4 text-eucalyptus mr-2" />
                        <span className="text-sm font-semibold text-eucalyptus">Tokens stored locally for this session</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Mark Step 6.1 Complete Button */}
            {!isStep1Complete && accessToken.trim() && refreshToken.trim() && (
              <div className="text-center mt-6">
                <button
                  onClick={markStep1Complete}
                  className="wizard-button bg-eucalyptus text-white hover:bg-green-700 inline-flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark Step 6.1 Complete
                </button>
              </div>
            )}

            {/* Step 6.1 Complete Indicator */}
            {isStep1Complete && (
              <div className="text-center mt-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                  <Check className="w-5 h-5 mr-2" />
                  Step 6.1 Complete - Tokens Generated!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 6.2: Create and Join Meeting - Only show when Step 6.1 is complete */}
        {isStep1Complete && (
          <div className="mt-12">
        {/* Spacer div for visual separation */}
          <div className="bg-gradient-to-r from-ultramine/10 to-fountain-blue/10 rounded-lg p-6 border border-ultramine/20 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-ultramine to-fountain-blue rounded-full text-white font-bold text-lg mr-4">
                6.2
              </div>
              <div>
                <h3 className="text-xl font-bold text-ultramine">Create and Join Meeting</h3>
                <p className="text-sm text-velvet-grey">Use the Webex Developer APIs to create and join meetings</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Create Meeting Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-ultramine" />
                  Create Meeting
                </h4>
                
                <div className="space-y-4">
                  {/* Meeting Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Meeting Title</label>
                    <input
                      type="text"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                      placeholder="Enter meeting title"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {/* Start Time */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time (PST)</label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {/* End Time */}
                  <div>
                    <label className="block text-sm font-medium mb-2">End Time (PST)</label>
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {/* enabledJoinBeforeHost Parameter Display */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <h5 className="text-sm font-semibold mb-2">API Parameters</h5>
                    <div className="text-xs font-mono space-y-1">
                      <div><strong>timezone:</strong> &quot;America/Los_Angeles&quot; (PST)</div>
                      <div><strong>enabledJoinBeforeHost:</strong> true</div>
                    </div>
                  </div>
                  
                  {/* Create Meeting Button */}
                  <button
                    onClick={createMeeting}
                    disabled={!meetingTitle.trim() || !startTime || !endTime || !accessToken.trim() || isCreatingMeeting}
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                      meetingTitle.trim() && startTime && endTime && accessToken.trim() && !isCreatingMeeting
                        ? 'bg-ultramine text-white hover:bg-blue-700'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isCreatingMeeting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Meeting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Meeting
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* API Processing Status */}
              {isCreatingMeeting && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-600" />
                    <span className="text-sm">Creating meeting via Webex API...</span>
                  </div>
                </div>
              )}

              {/* Meeting Information Display */}
              {meetingNumber && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Link className="w-5 h-5 mr-2 text-eucalyptus" />
                    Meeting Information
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                        <strong>Meeting Number:</strong> {meetingNumber}
                      </p>
                    </div>
                    
                    {/* Meeting Web Link */}
                    {meetingWebLink && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Meeting Link</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={meetingWebLink}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                          />
                          <button
                            onClick={() => copyLink(meetingWebLink, 'start')}
                            className="px-3 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 flex items-center"
                          >
                            {copiedStartLink ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Guest Token Creation Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-eucalyptus" />
                  Create Guest Tokens
                </h4>
                
                <div className="space-y-6">
                  {/* Agent Token Section */}
                  <div>
                    <h5 className="text-md font-semibold mb-3">Agent Token</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Agent Name</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            placeholder="Enter agent name (e.g., John Agent)"
                            className="wizard-input flex-1"
                            disabled={isCreatingAgentToken || !!agentToken}
                          />
                          <button
                            onClick={createAgentToken}
                            disabled={isCreatingAgentToken || !agentName.trim() || !accessToken.trim() || !!agentToken}
                            className="px-4 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                          >
                            {isCreatingAgentToken ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : agentToken ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Created
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Agent Token
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Agent Token Display */}
                      {agentToken && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{agentName}</span>
                            <span className="text-xs text-gray-500">Agent Token</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="password"
                              value={agentToken}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
                            />
                            <button
                              onClick={() => copyLink(agentToken, 'start')}
                              className="px-3 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 flex items-center"
                              title="Copy Agent Token"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer Token Section */}
                  <div>
                    <h5 className="text-md font-semibold mb-3">Customer Token</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Customer Name</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Enter customer name (e.g., Jane Customer)"
                            className="wizard-input flex-1"
                            disabled={isCreatingCustomerToken || !!customerToken}
                          />
                          <button
                            onClick={createCustomerToken}
                            disabled={isCreatingCustomerToken || !customerName.trim() || !accessToken.trim() || !!customerToken}
                            className="px-4 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                          >
                            {isCreatingCustomerToken ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : customerToken ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Created
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Customer Token
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Customer Token Display */}
                      {customerToken && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{customerName}</span>
                            <span className="text-xs text-gray-500">Customer Token</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="password"
                              value={customerToken}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
                            />
                            <button
                              onClick={() => copyLink(customerToken, 'start')}
                              className="px-3 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 flex items-center"
                              title="Copy Customer Token"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Official Documentation Sources */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
            Official Webex Developer Documentation
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">Guest Token Creation API</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Official documentation for creating guest tokens using the Webex Admin API
                </p>
                <a 
                  href="https://developer.webex.com/admin/docs/api/v1/guest-management/create-a-guest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Guest Management API Docs
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">Meeting Creation API</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Official documentation for creating meetings using the Webex Meetings API
                </p>
                <a 
                  href="https://developer.webex.com/meeting/docs/api/v1/meetings/create-a-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Meetings API Docs
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-md">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> These are the official Webex Developer Portal sources used in this lab. 
              Refer to these docs for detailed API specifications, parameters, and examples.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-velvet-grey mb-4">
            {isStep1Complete 
              ? "You've completed the SDK pre-requisites! Continue to the next step to start building your app."
              : "Complete Step 6.1 first to unlock the create and join meeting section."
            }
          </p>
          <button
            onClick={nextStep}
            className={`wizard-button-primary ${!isStep1Complete ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isStep1Complete}
          >
            Continue to Building App
          </button>
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