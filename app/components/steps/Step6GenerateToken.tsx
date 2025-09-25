'use client'

import { Zap, ExternalLink, Copy, Check, Key, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { useState, useEffect } from 'react'

export function Step6GenerateToken() {
  const { nextStep, prevStep } = useWizard()
  const [clientSecret, setClientSecret] = useState('')
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [showAccessToken, setShowAccessToken] = useState(false)
  const [showRefreshToken, setShowRefreshToken] = useState(false)
  const [showClientSecret, setShowClientSecret] = useState(false)

  // Load client secret and tokens from localStorage on component mount
  useEffect(() => {
    const storedSecret = localStorage.getItem('g2g-client-secret')
    const storedAccessToken = localStorage.getItem('g2g-access-token')
    const storedRefreshToken = localStorage.getItem('g2g-refresh-token')
    
    if (storedSecret) {
      setClientSecret(storedSecret)
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken)
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken)
    }
  }, [])

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
          <h2 className="text-3xl font-bold mb-4">Generate Access Tokens</h2>
          <p className="text-velvet-grey">
            Generate access and refresh tokens from your service app
          </p>
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

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="wizard-button bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={!accessToken.trim() || !refreshToken.trim()}
            className={`wizard-button flex items-center ${
              accessToken.trim() && refreshToken.trim()
                ? 'wizard-button-primary' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Continue to Building App
          </button>
        </div>
      </div>
    </div>
  )
}