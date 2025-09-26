'use client'

import { Zap, ExternalLink, Copy, Check, Key, RefreshCw, Eye, EyeOff, Calendar, Clock, Loader2, Link } from 'lucide-react'
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
  const [meetingTitle, setMeetingTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false)
  const [isGettingJoinInfo, setIsGettingJoinInfo] = useState(false)
  const [meetingNumber, setMeetingNumber] = useState('')
  const [startLink, setStartLink] = useState('')
  const [joinLink, setJoinLink] = useState('')
  const [copiedStartLink, setCopiedStartLink] = useState(false)
  const [copiedJoinLink, setCopiedJoinLink] = useState(false)

  // Load client secret, tokens, and completion state from localStorage on component mount
  useEffect(() => {
    const storedSecret = localStorage.getItem('g2g-client-secret')
    const storedAccessToken = localStorage.getItem('g2g-access-token')
    const storedRefreshToken = localStorage.getItem('g2g-refresh-token')
    const step1Complete = localStorage.getItem('step6-substep1-complete')
    
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
  }, [])

  // Mark Step 6.1 as complete
  const markStep1Complete = () => {
    setIsStep1Complete(true)
    localStorage.setItem('step6-substep1-complete', 'true')
  }

  // Create meeting function
  const createMeeting = async () => {
    if (!meetingTitle.trim() || !startTime || !endTime || !accessToken.trim()) {
      return
    }

    setIsCreatingMeeting(true)
    try {
      const response = await fetch('https://webexapis.com/v1/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: meetingTitle,
          start: startTime,
          end: endTime,
          timezone: 'America/Los_Angeles', // PST timezone
          enabledJoinBeforeHost: true
        })
      })

      if (response.ok) {
        const meetingData = await response.json()
        setMeetingNumber(meetingData.meetingNumber)
        // Automatically get join information
        await getJoinInformation(meetingData.meetingNumber)
      } else {
        console.error('Failed to create meeting:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating meeting:', error)
    } finally {
      setIsCreatingMeeting(false)
    }
  }

  // Get join information function
  const getJoinInformation = async (meetingNum: string) => {
    setIsGettingJoinInfo(true)
    try {
      const response = await fetch(`https://webexapis.com/v1/meetings/${meetingNum}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          joinDirectly: true
        })
      })

      if (response.ok) {
        const joinData = await response.json()
        setStartLink(joinData.startLink || '')
        setJoinLink(joinData.joinLink || '')
      } else {
        console.error('Failed to get join information:', response.statusText)
      }
    } catch (error) {
      console.error('Error getting join information:', error)
    } finally {
      setIsGettingJoinInfo(false)
    }
  }

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
                  </div>

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
                      <div><strong>timezone:</strong> "America/Los_Angeles" (PST)</div>
                      <div><strong>enabledJoinBeforeHost:</strong> true</div>
                    </div>
                  </div>
                  
                  {/* Create Meeting Button */}
                  <button
                    onClick={createMeeting}
                    disabled={!meetingTitle.trim() || !startTime || !endTime || isCreatingMeeting}
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                      meetingTitle.trim() && startTime && endTime && !isCreatingMeeting
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
              {(isCreatingMeeting || isGettingJoinInfo) && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      {isCreatingMeeting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-600" />
                      ) : (
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                      )}
                      <span className="text-sm">Creating meeting via API...</span>
                    </div>
                    <div className="flex items-center">
                      {isGettingJoinInfo ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-600" />
                      ) : meetingNumber ? (
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      )}
                      <span className="text-sm">Getting join information...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Meeting Links Display */}
              {meetingNumber && (startLink || joinLink) && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Link className="w-5 h-5 mr-2 text-eucalyptus" />
                    Meeting Links Generated
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                        <strong>Meeting Number:</strong> {meetingNumber}
                      </p>
                    </div>
                    
                    {startLink && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Link (Host)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={startLink}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                          />
                          <button
                            onClick={() => copyLink(startLink, 'start')}
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
                    
                    {joinLink && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Join Link (Guest)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={joinLink}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                          />
                          <button
                            onClick={() => copyLink(joinLink, 'join')}
                            className="px-3 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 flex items-center"
                          >
                            {copiedJoinLink ? (
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
            </div>
          </div>
          </div>
        )}

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