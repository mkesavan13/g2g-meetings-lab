'use client'

import { Code, ExternalLink, Copy, Check, Info, Rocket, RefreshCw } from 'lucide-react'
import { useWizard } from '../../contexts/WizardContext'
import { useState, useEffect } from 'react'

export function Step7BuildingApp() {
  const { nextStep, prevStep } = useWizard()
  const [copiedCode, setCopiedCode] = useState<{[key: string]: boolean}>({})
  const [actualTokens, setActualTokens] = useState({
    customerToken: 'YOUR_CUSTOMER_TOKEN_HERE',
    agentToken: 'YOUR_AGENT_TOKEN_HERE',
    meetingLink: 'YOUR_MEETING_LINK_HERE'
  })

  // Load actual tokens and completed steps from localStorage on component mount
  useEffect(() => {
    const storedCustomerToken = localStorage.getItem('g2g-customer-token')
    const storedAgentToken = localStorage.getItem('g2g-agent-token')
    const storedMeetingLink = localStorage.getItem('g2g-meeting-web-link')
    
    setActualTokens({
      customerToken: storedCustomerToken || 'YOUR_CUSTOMER_TOKEN_HERE',
      agentToken: storedAgentToken || 'YOUR_AGENT_TOKEN_HERE',
      meetingLink: storedMeetingLink || 'YOUR_MEETING_LINK_HERE'
    })

    // Load completed steps from localStorage
    const storedCompletedSteps = localStorage.getItem('step7-completed-steps')
    if (storedCompletedSteps) {
      const parsedSteps = JSON.parse(storedCompletedSteps)
      setCompletedSteps(parsedSteps)
      
      // Auto-scroll to current step after a delay
      setTimeout(() => {
        scrollToCurrentStep(parsedSteps)
      }, 1000)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Function to scroll to the current step based on completion progress
  const scrollToCurrentStep = (completedStepsObj: {[key: string]: boolean}) => {
    const completedStepIds = Object.keys(completedStepsObj).filter(id => completedStepsObj[id])
    
    if (completedStepIds.length === 0) {
      // No steps completed, scroll to first step
      const firstStepElement = document.getElementById(`step-${codeSteps[0].id}`)
      if (firstStepElement) {
        scrollToElement(firstStepElement)
      }
    } else if (completedStepIds.length === codeSteps.length) {
      // All steps completed, scroll to testing section
      const testingSection = document.getElementById('testing-section')
      if (testingSection) {
        scrollToElement(testingSection)
      }
    } else {
      // Find next incomplete step
      const nextIncompleteIndex = codeSteps.findIndex(step => !completedStepsObj[step.id])
      if (nextIncompleteIndex !== -1) {
        const nextStepElement = document.getElementById(`step-${codeSteps[nextIncompleteIndex].id}`)
        if (nextStepElement) {
          scrollToElement(nextStepElement)
        }
      }
    }
  }

  // Helper function to scroll to an element with header offset
  const scrollToElement = (element: HTMLElement) => {
    const headerHeight = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  // Reset progress function
  const resetProgress = () => {
    setCompletedSteps({})
    localStorage.removeItem('step7-completed-steps')
    
    // Scroll to first step
    setTimeout(() => {
      const firstStepElement = document.getElementById(`step-${codeSteps[0].id}`)
      if (firstStepElement) {
        scrollToElement(firstStepElement)
      }
    }, 100)
  }

  // Function to mask tokens in displayed code
  const maskTokens = (code: string) => {
    return code
      .replace(actualTokens.customerToken, actualTokens.customerToken.length > 20 ? `${actualTokens.customerToken.substring(0, 8)}...${actualTokens.customerToken.substring(actualTokens.customerToken.length - 8)}` : '••••••••••••••••')
      .replace(actualTokens.agentToken, actualTokens.agentToken.length > 20 ? `${actualTokens.agentToken.substring(0, 8)}...${actualTokens.agentToken.substring(actualTokens.agentToken.length - 8)}` : '••••••••••••••••')
      .replace(actualTokens.meetingLink, actualTokens.meetingLink.length > 30 ? `${actualTokens.meetingLink.substring(0, 15)}...${actualTokens.meetingLink.substring(actualTokens.meetingLink.length - 15)}` : '••••••••••••••••••••••••••••••')
  }

  const copyCode = async (code: string, id: string) => {
    try {
      // Always copy the actual code with real tokens
      await navigator.clipboard.writeText(code)
      setCopiedCode(prev => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setCopiedCode(prev => ({ ...prev, [id]: false }))
      }, 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  // Function to copy all code blocks combined
  const copyAllCode = async () => {
    try {
      // Combine all code blocks (skip the first one which is just the CDN script)
      const allCode = codeSteps.slice(1).map(step => {
        return '// ' + step.title + '\n' + step.code
      }).join('\n\n')
      
      await navigator.clipboard.writeText(allCode)
      setCopiedCode(prev => ({ ...prev, 'all-code': true }))
      setTimeout(() => {
        setCopiedCode(prev => ({ ...prev, 'all-code': false }))
      }, 2000)
    } catch (error) {
      console.error('Failed to copy all code:', error)
    }
  }

  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({})

  const markStepComplete = (stepId: string, stepIndex: number) => {
    const newCompletedSteps = { ...completedSteps, [stepId]: true }
    setCompletedSteps(newCompletedSteps)
    
    // Save to localStorage
    localStorage.setItem('step7-completed-steps', JSON.stringify(newCompletedSteps))
    
    // Auto-scroll to next step after a short delay
    setTimeout(() => {
      const nextStepIndex = stepIndex + 1
      if (nextStepIndex < codeSteps.length) {
        const nextStepElement = document.getElementById(`step-${codeSteps[nextStepIndex].id}`)
        if (nextStepElement) {
          scrollToElement(nextStepElement)
        }
      } else {
        // If it's the last step, scroll to testing section
        const testingSection = document.getElementById('testing-section')
        if (testingSection) {
          scrollToElement(testingSection)
        }
      }
    }, 500)
  }

  const codeSteps = [
    {
      id: 'cdn-include',
      title: 'Step 1: Include Webex SDK CDN',
      description: 'Add this script tag to your HTML file to include the Webex SDK',
      code: `<script src="https://unpkg.com/webex/umd/webex.min.js"></script>`
    },
    {
      id: 'webex-init',
      title: 'Step 2: Initialize Webex SDK Variables',
      description: 'Add this code to sdk-impl.js - Your tokens from Step 6 are automatically populated. Note: UI utility functions are already included in the app via ui-utils.js',
      code: `// Global variables for Webex SDK
let webex;
let meeting;
let localStream;
let localMedia = {};

// Your actual tokens from Step 6 of the lab
const customerToken = '${actualTokens.customerToken}';
const agentToken = '${actualTokens.agentToken}';
const meetingLink = '${actualTokens.meetingLink}';

// Initialize Webex function
function initializeWebex(accessToken) {
    console.log('Initializing Webex SDK...');
    
    webex = Webex.init({
        credentials: {
            access_token: accessToken
        }
    });
    
    return new Promise((resolve, reject) => {
        // Set up 20 second timeout
        const timeout = setTimeout(() => {
            reject(new Error('Webex initialization timed out after 20 seconds'));
        }, 20000);
        
        webex.once('ready', () => {
            clearTimeout(timeout);
            console.log('Webex SDK is ready');
            resolve(webex);
        });
    });
}`
    },
    {
      id: 'media-setup',
      title: 'Step 3: Set Up Media Functions',
      description: 'Add functions to handle media streams for video chat',
      code: `// Get user media function
async function getUserMedia() {
    try {
        console.log('Getting user media...');
        localStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            },
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        
        // Display local video using utility function
        setLocalVideoStream(localStream);
        
        console.log('Local media ready');
        return localStream;
    } catch (error) {
        console.error('Failed to get user media:', error);
        throw error;
    }
}

// Handle remote media streams
function handleRemoteMedia(media) {
    console.log('Received remote media:', media.type, media);
    
    switch (media.type) {
        case 'remoteVideo':
            if (media.stream) {
                console.log('Setting remote video stream');
                setRemoteVideoStream(media.stream);
            }
            break;
        case 'remoteAudio':
            if (media.stream) {
                console.log('Setting remote audio stream');
                setRemoteAudioStream(media.stream);
            }
            break;
        case 'remoteShare':
            console.log('Remote screen share received');
            break;
        default:
            console.log('Unknown media type:', media.type);
    }
}`
    },
    {
      id: 'meeting-functions',
      title: 'Step 4: Meeting Join/Leave Functions',
      description: 'Add the main meeting functionality for video chat sessions',
      code: `// Join meeting function for video chat
async function joinVideoMeeting(userType) {
    try {
        console.log('Starting video meeting join process...');
        
        // Select appropriate token based on user type
        const accessToken = userType === 'customer' ? customerToken : agentToken;
        
        if (!accessToken || !meetingLink) {
            console.error('Missing token or meeting link');
            alert('Missing required tokens or meeting link. Please complete the lab setup first.');
            return;
        }
        
        // Show video loader using utility function
        showVideoLoader();
        
        // Initialize Webex
        await initializeWebex(accessToken);
        
        // Register with meetings service
        console.log('Registering with meetings service...');
        await webex.meetings.register();
        
        // Get user media
        await getUserMedia();
        
        // Create Webex media streams
        const cameraStream = await webex.meetings.mediaHelpers.createCameraStream();
        const microphoneStream = await webex.meetings.mediaHelpers.createMicrophoneStream();
        
        // Store local media streams for mute/unmute functionality
        localMedia.cameraStream = cameraStream;
        localMedia.microphoneStream = microphoneStream;
        
        // Create meeting object
        console.log('Creating meeting...');
        meeting = await webex.meetings.create(meetingLink);
        
        // Set up media event listeners
        meeting.on('media:ready', handleRemoteMedia);
        meeting.on('media:stopped', (media) => {
            console.log('Media stopped:', media.type);
        });
        
        // Listen for meeting state changes to hide loader when fully joined
        meeting.on('meeting:stateChange', (state) => {
            console.log('Meeting state changed:', state.payload.currentState);
            
            // Hide loader only when meeting is fully joined and active
            if (state.payload.currentState === 'JOINED' || state.payload.currentState === 'ACTIVE') {
                console.log('Meeting fully joined - hiding loader');
                hideVideoLoader();
            }
        });
        
        // Additional event listeners for debugging
        meeting.on('meeting:media:remote:start', handleRemoteMedia);
        meeting.on('meeting:receiveTranscription:started', () => {
            console.log('Remote participant joined');
        });
        
        // Join meeting with media
        console.log('Joining meeting with media...');
        await meeting.joinWithMedia({
            mediaOptions: {
                sendAudio: true,
                sendVideo: true,
                receiveAudio: true,
                receiveVideo: true,
                allowMediaInLobby: true,
                localStreams: {
                    microphone: microphoneStream,
                    camera: cameraStream
                }
            }
        });
        
        console.log('Meeting join initiated - waiting for full connection...');
        
        // Ensure audio context is resumed (required by some browsers)
        if (typeof AudioContext !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('Audio context resumed');
                }).catch(e => console.log('Audio context resume error:', e));
            }
        }
        
        // Note: Loader will be hidden by meeting:stateChanged event when fully joined
        
    } catch (error) {
        console.error('Error joining meeting:', error);
        alert('Failed to join video meeting: ' + error.message);
        
        // Hide modal on error using utility function
        hideVideoModal();
    }
}

// End meeting function - leave the meeting
async function endMeeting() {
    try {
        console.log('Leaving meeting...');
        
        if (meeting) {
            await meeting.leave();
        }
        
        // Stop all media streams using utility function
        stopAllMediaStreams(localStream, localMedia);
        
        // Clear local media references
        localMedia.cameraStream = null;
        localMedia.microphoneStream = null;
        
        // Clear video and audio elements using utility function
        clearVideoElements();
        
        // Hide video chat modal using utility function
        hideVideoModal();
        
        console.log('Left meeting successfully');
        
    } catch (error) {
        console.error('Error leaving meeting:', error);
    }
}`
    },
    {
      id: 'event-listeners',
      title: 'Step 5: Add Event Listeners',
      description: 'Wire up the UI interactions to trigger video meetings',
      code: `// Add event listeners for video chat functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Customer video chat button
    if (startVideoChatBtn) {
        startVideoChatBtn.addEventListener('click', () => {
            joinVideoMeeting('customer');
        });
    }
    
    // Agent accept call button
    if (acceptCallBtn) {
        acceptCallBtn.addEventListener('click', () => {
            joinVideoMeeting('agent');
        });
    }
    
    // End call button
    if (endCallBtn) {
        endCallBtn.addEventListener('click', endMeeting);
    }
    
    // Close video chat modal
    if (closeVideoChatBtn) {
        closeVideoChatBtn.addEventListener('click', endMeeting);
    }
    
    // Audio mute/unmute control using proper stream methods
    if (muteAudioBtn) {
        muteAudioBtn.addEventListener('click', () => {
            if (localMedia.microphoneStream) {
                const newMuteValue = !localMedia.microphoneStream.userMuted;
                localMedia.microphoneStream.setUserMuted(newMuteValue);
                console.log('Audio ' + (newMuteValue ? 'muted' : 'unmuted'));
                
                // Update button UI using utility function
                updateMuteButton(muteAudioBtn, newMuteValue, 'audio');
            }
        });
    }
    
    // Video mute/unmute control using proper stream methods
    if (muteVideoBtn) {
        muteVideoBtn.addEventListener('click', () => {
            if (localMedia.cameraStream) {
                const newMuteValue = !localMedia.cameraStream.userMuted;
                localMedia.cameraStream.setUserMuted(newMuteValue);
                console.log('Video ' + (newMuteValue ? 'muted' : 'unmuted'));
                
                // Hide/show local video based on mute state using utility function
                toggleLocalVideo(!newMuteValue);
                
                // Update button UI using utility function
                updateMuteButton(muteVideoBtn, newMuteValue, 'video');
            }
        });
    }
    
});

// Handle page unload - clean up meeting
window.addEventListener('beforeunload', () => {
    if (meeting) {
        meeting.leave();
    }
});

console.log('Webex SDK integration ready!');`
    }
  ]

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="wizard-card">
        <div className="relative mb-8">
          <div className="text-center">
            <Code className="w-16 h-16 text-eucalyptus mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Build your Webex Meetings SDK App</h2>
            <p className="text-velvet-grey">
              Follow these step-by-step instructions to build a complete Guest-to-Guest meeting application
            </p>
          </div>
          
          {/* Quick Start and Reset Progress Buttons */}
          <div className="absolute top-0 right-0 flex items-center space-x-2">
            <button
              onClick={copyAllCode}
              className="flex items-center px-3 py-2 text-sm bg-eucalyptus text-white rounded-md hover:bg-green-700 transition-colors"
              title="Copy all code blocks at once"
            >
              {copiedCode['all-code'] ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              Quick Start
            </button>
            <button
              onClick={resetProgress}
              className="flex items-center px-3 py-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800"
              title="Reset all progress and start over"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Reset Progress
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              How to Use This Guide
            </h3>
            <div className="text-sm space-y-2">
              <p>1. <strong>Copy each JavaScript code block</strong> in order using the copy buttons</p>
              <p>2. <strong>Paste code into sdk-impl.js</strong> - the existing HTML structure is already provided</p>
              <p>3. <strong>Your tokens are automatically populated</strong> from Step 6 - no manual replacement needed</p>
              <p>4. <strong>Mark each step as complete</strong> to auto-scroll to the next section</p>
            </div>
          </div>


          {/* Code Steps */}
          {codeSteps.map((step, index) => (
            <div key={step.id} id={`step-${step.id}`} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 ${
                        completedSteps[step.id] 
                          ? 'bg-green-600 text-white' 
                          : 'bg-eucalyptus text-white'
                      }`}>
                        {completedSteps[step.id] ? '✓' : index + 1}
                      </div>
                      {step.title}
                      {completedSteps[step.id] && (
                        <span className="ml-2 text-sm text-green-600 font-medium">Completed</span>
                      )}
                    </h3>
                    <p className="text-sm text-velvet-grey mt-1">{step.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyCode(step.code, step.id)}
                      className="flex items-center px-3 py-2 bg-eucalyptus text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      {copiedCode[step.id] ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Code
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => markStepComplete(step.id, index)}
                      disabled={completedSteps[step.id]}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        completedSteps[step.id]
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {completedSteps[step.id] ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        'Mark as Complete'
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{step.id === 'cdn-include' ? step.code : maskTokens(step.code)}</code>
                </pre>
              </div>
            </div>
          ))}

          {/* Testing Instructions */}
          <div id="testing-section" className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Rocket className="w-5 h-5 mr-2 text-green-600" />
              Testing Your Application
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <strong>Add Code to sdk-impl.js:</strong> Copy and paste each code block sequentially into the sdk-impl.js file
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <strong>Include Webex SDK:</strong> Add the Webex SDK script tag to index.html: <code>&lt;script src=&quot;https://sdk.webex.com/v1/webex-sdk.min.js&quot;&gt;&lt;/script&gt;</code>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <strong>Test Customer Flow:</strong> Login as a customer and click &quot;Start Video Chat&quot; to initiate a meeting
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <div>
                  <strong>Test Agent Flow:</strong> Login as an agent and click &quot;Accept Call&quot; when the notification appears
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  5
                </div>
                <div>
                  <strong>Test Video Controls:</strong> Use mute/unmute buttons and end call functionality during the meeting
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-eucalyptus" />
              Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://developer.webex.com/meeting/docs/sdks/webex-meetings-sdk-web-quickstart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-eucalyptus transition-colors"
              >
                <h4 className="font-semibold text-eucalyptus">SDK Quick Start</h4>
                <p className="text-sm text-velvet-grey mt-1">Complete API reference and guides</p>
              </a>
              <a 
                href="https://web-sdk.webex.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-eucalyptus transition-colors"
              >
                <h4 className="font-semibold text-eucalyptus">Sample Applications</h4>
                <p className="text-sm text-velvet-grey mt-1">Ready-to-use code examples</p>
              </a>
              <a 
                href="https://developer.webex.com/support" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-eucalyptus transition-colors"
              >
                <h4 className="font-semibold text-eucalyptus">Developer Support</h4>
                <p className="text-sm text-velvet-grey mt-1">Get help from the community</p>
              </a>
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