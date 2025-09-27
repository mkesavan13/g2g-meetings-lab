// Global variables for Webex SDK
let webex;
let meeting;
let localStream;
let isCustomerLoggedIn = false;
let isAgentLoggedIn = false;

// Your actual tokens from Step 6 of the lab
const customerToken = 'eyJhbGciOiJSUzI1NiJ9.eyJtYWNoaW5lX3R5cGUiOiJhcHB1c2VyIiwiY2x1c3RlciI6IlAwQTEiLCJwcml2YXRlIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1USTRRMEpETFVoVE1qVTJJaXdpWVd4bklqb2laR2x5SW4wLi5EMTN5d3RqUmIwX3lldWprZFNkZ09nLmJ5dlpDYS1oRmZwVGx2elQ0UzVzQU1MdlRzb1JrYzNmUXpGNnUxQ0pJc2VSX3NUQXpidHZFYzJWZlZvcV9PYkFqN1RMYnNaRjd0MktoWEZqZzR3REN4S1ZXNk9IeXdPYmJyQ3l0bjNFWkZpRklPTkl2OEY5UnlOUkVlLVd5RnBBOXh4UEEzbF9TX2RUdkpiVkNQa0dwMkl4YjJoOTl4aWVTaGE2bGI0UFlNQzhvNkU5QTFBYWhHSlhIWDcxTGFIakdOaVluOXhRcjRleXJqRFFOd3RQU2dOYWgwUFpfRDRIVVQwMktsc1NsUHgwSzNQd1RiVVBjcWF6OEZ3Q0xUYjhwYy1ENTROdUcyYlpaNmN1NUdQcjVRcVN2aDRpNGdHZHJWb1d3VjV4TVI5MVRVR2FWemFqTUppdExjV1JRRlNsZjBqR3R5eERoY1U1cUhlWXR2WkhqODhSQTdUV1pzTlFRRi1xRmVoa1VRbUtGRS1NQnN1OHRKWGlwejRyY2pIWUt3SmJ6aUlUYkVrNDRzT3dlakk5ZXNXOG1LRWZMWHlVLUFKQWQ0c1VHU3AwcWRrVVhkMFQyRm5HT1B6NkxncDhMOE9EMTZfZ0lsbFJGcC14ZjRJNWYxSWVTVUQzMGpObWFJeVAweFB3S1l0MnJ4ZTgtaHpmZWtXRVVNdDQyVGFwTkZSUnN6MGQ3RmNwblRLNVNlQ1o3X216WGlyR1NDQ3BCZ25fUkRtdlhDTVRWNWJfQ0hLMTd0OGM2TkVRUEwweTdMcXdlZ1JfSEhmdjNaRDhjV0xKVk45ZWVoeGpMT1BJc1NaUjFoSi1pMUVPNWZmNVVacktjVlBhRGtlNVl4bnFzM0RUVDZMNHh0WGxmQmNLNVoyVDhkX3ZzTEZ2ak5jV2dlaEY2cElBZlRjLlhfbnNGVmdNV0FrWEJ4RDlPX3Y3QmciLCJyZWZlcmVuY2VfaWQiOiI2N2IwZTBiNy1kNjNlLTRiMmUtYjg3YS1iMDJhYjU3ZTRiYTIiLCJpc3MiOiJodHRwczovL2lkYnJva2VyLWItdXMud2ViZXguY29tL2lkYiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJjbGllbnRfaWQiOiJDMzExNzcyM2EwYTRjOTg1YThiZDZkZGE3NmY3NzY2YzUxMzI0YjZmNDFiZjRmZWYxYzJjODI3ODRhMWYyOTc1YyIsInVzZXJfdHlwZSI6Im1hY2hpbmUiLCJ0b2tlbl9pZCI6IkFhWjNyME9HTmpaVFkwTkdZdFlXTXdPQzAwTXpaaUxXRTFZak10WWpBek5tVTBNR1kxWkRka09UTTRORGM1TldRdE5qWTUiLCJvcmdfaWQiOiIxOWU1NDY3Yy00ZDk4LTQ0ODgtOTFjMi0xYTJhNWY1N2MyZTUiLCJ1c2VyX21vZGlmeV90aW1lc3RhbXAiOiIyMDI1MDkyNzAzNTcxMC44NzZaIiwicmVhbG0iOiIxOWU1NDY3Yy00ZDk4LTQ0ODgtOTFjMi0xYTJhNWY1N2MyZTUiLCJjaXNfdXVpZCI6ImE1ZTY5ZGYyLTU3Y2UtNGQ4Ni1iMTEwLWMxMDI4YzY5MzZmNCIsImV4cGlyeV90aW1lIjoxNzU5MDEwMjMwMjUxfQ.fftRk2-C6M0PS7bJssXFOmT9HOC9FRZXdnXEG91jRS0YCNWQuosmbDRqXLWyTh-Avhidb1q4RodTJG2IwS_i4M3URnW7AYMQGC3Ic1NGMhSCK76jJHgc5l_vGHnnlX6_pMBL_C50trhm6mooCLBjkiYNPrB5_nwjw4Y-v4pI0FrCjt_nSuxrR96a8evSruJXe2jsMzSqzJbBfo3yA6PQNY6w9PIAjD1vxr9ren9AukXISItNR6isxHAQLWJAfQg4V-ceocLgp_90SsyJ-Gl7lG4_pX0nJB0eKLokvpxDNGO9tc-sflVR1MLddAgZCMcN_9YseFWqKUn5_gSRFVI3LQ';
const agentToken = 'eyJhbGciOiJSUzI1NiJ9.eyJtYWNoaW5lX3R5cGUiOiJhcHB1c2VyIiwiY2x1c3RlciI6IlAwQTEiLCJwcml2YXRlIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1USTRRMEpETFVoVE1qVTJJaXdpWVd4bklqb2laR2x5SW4wLi5OUXdlNE8zMlRyR3h4WW5RdFVwb0J3LnBOc1p6MEpKVGVPdzlBMnV2U2pwZ2t3N0RMU0w1cmJPZENyRHZrODVBdnpUMXVQWko3Z3AtMXVpLWlORHNNdF91TWJ0d2lsalJfNnV0dTdETl8yV2lnS2Nncm1MS3RTc3QtZS1VVE12VFBUUGxjN1JCRG5rNEJ5emhsb09EU3praExXQ1YtWEc0OGxxYXhBOE1Ca2wxX0paN1NqODRpOXAxTmhOdHhOd1hwZFlHdS1KcW1uOUVqLTF6eG5ZYzVBV0preV91eHhRNkVKTjVIQUZEeVFTd2NTazE1eGlwU3FYWHBqRERNUFpNMk5FZUxTUWRoS1REN3N2bTVCRkpUOW5NeDk4SWUyTUJOWmRnMjFFNnNfdTNDRXgzVnRqeF9ZaTZNUk5IYkgyU0JnQ0NWeVB4WXVUbm84X3hmb0FXdEJ6dTVfTzNKZ0h3MUJRRmtKbGdVbWNkWEtSOTVxV1lNZ1NUMEZMbi1KQVRpOWE2T25EYlVtaVJGLTBiblZhN1JwNmIyWXY1TEZuUkJ6TkZWWkZMVEI0RnNmVGJpa0pRQnQ2a0hkbUdBb2dQM3FPbmNzcko3Z0swMlh6ZVVwUDV4a2JBWW83YjRUYldQQ0lCZXdNVXF4ZGNrXzE1RkxlLXZ0QlppY2dEZjVkNXVUT0k1S1MtWWptVVlEMFhpMUFMbEtNOVE3SWpWNGttclUwYkZyQWl5ektXeHRxaTdwTmk5Tmtld2hKaDVVdmFrNkFoX2llYVJFb1ZQa2NnNUk3XzNYZU55LVE5Y3NNSnpDbTFWQU5ESkttWHJfTlkxSUItdU9WQnRWY00wTW1hWEQ1RGE2NFhqLTVIejY4TGw0dEtUcGtrazNiVGFRZ3lELWkzWVJjVzJjUDd4dEY1RXg3ZjlpbXlLTUZ4eGRneTQ0LmlqZ0ZtRUtMbEtHRFNIY0habW1VZkEiLCJyZWZlcmVuY2VfaWQiOiI2NDQzZjI1Yi1lYWQ5LTQ3NGMtOTkyYS01NmM1ZWQyODU2YTQiLCJpc3MiOiJodHRwczovL2lkYnJva2VyLWItdXMud2ViZXguY29tL2lkYiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJjbGllbnRfaWQiOiJDMzExNzcyM2EwYTRjOTg1YThiZDZkZGE3NmY3NzY2YzUxMzI0YjZmNDFiZjRmZWYxYzJjODI3ODRhMWYyOTc1YyIsInVzZXJfdHlwZSI6Im1hY2hpbmUiLCJ0b2tlbl9pZCI6IkFhWjNyME1EWTJZakE1T0RZdE5tSXdPQzAwWkRsbExUazBNRFV0TXpOaE5EZzRaamM0TjJaaE9URmxOMlV6WlRVdFltUmsiLCJvcmdfaWQiOiIxOWU1NDY3Yy00ZDk4LTQ0ODgtOTFjMi0xYTJhNWY1N2MyZTUiLCJ1c2VyX21vZGlmeV90aW1lc3RhbXAiOiIyMDI1MDkyNzAzNTY1Ny41MzZaIiwicmVhbG0iOiIxOWU1NDY3Yy00ZDk4LTQ0ODgtOTFjMi0xYTJhNWY1N2MyZTUiLCJjaXNfdXVpZCI6ImY5OTA5ZjYwLTZkZTUtNDBhMS1iMzk0LThhODdjODdlOThkMSIsImV4cGlyeV90aW1lIjoxNzU5MDEwMjE2ODM1fQ.DPm08JNTMF_jaN7LRqK2Two6QRxgu6v0XIKTp8gGKPJ9nnn4qy4BJ05w04wu7NIAXb685z0YM6qrLiAhiYWcpnNhcR2zCfleVWmDi_bPWwduC4Btl_N2_5XPHGRQ79HyiZ9N6AGxBxjSCDUxLLxD3YTJGuGy-Q91CAGDzRy71H19BnjKtaHIEFQQU4bdX8liFh6jdaA38Q9TzGX5L4VCI3LPCZqQrxtWL_mIH4HZhDp7WbS7h8nOEPCVgdbWf9a7s2o4QEWCCWvzOI05t6Lb849HcUvsgY153oKsInkwEleZFtK7pxkLfJjS_5Z3K0OkjIvSFWLqooxHY8uuN1dXhA';
const meetingLink = 'https://mkesavan13-4xoz.webex.com/mkesavan13-4xoz/j.php?MTID=m71a850cb116f44b9991b3b5e28abe25b';

// HTML element references - get all elements at the top
const videoModal = document.getElementById('video-chat-modal');
const videoLoader = document.getElementById('video-loader');
const videoChatWindow = document.getElementById('video-chat-window');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const startVideoChatBtn = document.getElementById('start-video-chat');
const acceptCallBtn = document.getElementById('accept-call');
const endCallBtn = document.getElementById('end-call');
const closeVideoChatBtn = document.getElementById('close-video-chat');
const muteAudioBtn = document.getElementById('mute-audio');
const muteVideoBtn = document.getElementById('mute-video');
const incomingCall = document.getElementById('incoming-call');

// Initialize Webex function
function initializeWebex(accessToken) {
    console.log('Initializing Webex SDK...');
    
    webex = Webex.init({
        credentials: {
            access_token: accessToken
        }
    });
    
    return new Promise((resolve, reject) => {
        webex.once('ready', () => {
            console.log('Webex SDK is ready');
            resolve(webex);
        });
        
        webex.once('error', (error) => {
            console.error('Webex initialization failed:', error);
            reject(error);
        });
    });
}

// Update login status
function updateLoginStatus(userType) {
    if (userType === 'customer') {
        isCustomerLoggedIn = true;
    } else if (userType === 'agent') {
        isAgentLoggedIn = true;
    }
}

// Get user media function
async function getUserMedia() {
    try {
        console.log('Getting user media...');
        localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        
        // Display local video using predefined element
        if (localVideo) {
            localVideo.srcObject = localStream;
        }
        
        console.log('Local media ready');
        return localStream;
    } catch (error) {
        console.error('Failed to get user media:', error);
        throw error;
    }
}

// Handle remote media streams
function handleRemoteMedia(media) {
    console.log('Received remote media:', media.type);
    
    switch (media.type) {
        case 'remoteVideo':
            if (remoteVideo) {
                remoteVideo.srcObject = media.stream;
            }
            break;
        case 'remoteAudio':
            if (remoteVideo) {
                remoteVideo.srcObject = media.stream;
            }
            break;
        case 'remoteShare':
            console.log('Remote screen share received');
            break;
    }
}

// Create Webex media streams
async function createWebexStreams() {
    try {
        console.log('Creating Webex media streams...');
        
        const cameraStream = await webex.meetings.mediaHelpers.createCameraStream({
            video: true
        });
        
        const microphoneStream = await webex.meetings.mediaHelpers.createMicrophoneStream({
            audio: true
        });
        
        return { cameraStream, microphoneStream };
    } catch (error) {
        console.error('Failed to create Webex streams:', error);
        throw error;
    }
}

// Join meeting function for video chat
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
        
        // Show video chat modal and loader using predefined elements
        videoModal.style.display = 'flex';
        videoLoader.style.display = 'flex';
        videoChatWindow.style.display = 'none';
        
        // Initialize Webex
        await initializeWebex(accessToken);

        // Register as a webex device
        await webex.meetings.register();
        console.log('Successfully registered with meetings service');
        
        // Get user media
        await getUserMedia();
        
        // Create meeting object
        console.log('Creating meeting...');
        meeting = await webex.meetings.create(meetingLink);
        
        // Set up media event listeners
        meeting.on('media:ready', handleRemoteMedia);
        
        meeting.on('meeting:stateChanged', (state) => {
            console.log('Meeting state:', state.payload.currentState);
        });
        
        meeting.on('error', (error) => {
            console.error('Meeting error:', error);
        });
        
        // Create Webex media streams
        const { cameraStream, microphoneStream } = await createWebexStreams();
        
        // Join meeting with media
        console.log('Joining meeting with media...');
        await meeting.joinWithMedia({
            joinOptions: {
                isMultistream: false
            },
            mediaOptions: {
                sendAudio: true,
                sendVideo: true,
                receiveAudio: true,
                receiveVideo: true,
                localStreams: {
                    microphone: microphoneStream,
                    camera: cameraStream
                },
                allowMediaInLobby: true
            }
        });
        
        console.log('Successfully joined meeting!');
        
        // Hide loader and show video chat window
        videoLoader.style.display = 'none';
        videoChatWindow.style.display = 'block';
        
    } catch (error) {
        console.error('Error joining meeting:', error);
        alert('Failed to join video meeting: ' + error.message);
        
        // Hide modal on error using predefined element
        videoModal.style.display = 'none';
    }
}

// Leave meeting function
async function leaveMeeting() {
    try {
        console.log('Leaving meeting...');
        
        if (meeting) {
            await meeting.leave();
        }
        
        // Stop local media
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        
        // Clear video elements using predefined variables
        if (localVideo) localVideo.srcObject = null;
        if (remoteVideo) remoteVideo.srcObject = null;
        
        // Hide video chat modal using predefined element
        videoModal.style.display = 'none';
        
        console.log('Left meeting successfully');
        
    } catch (error) {
        console.error('Error leaving meeting:', error);
    }
}

// Add event listeners for video chat functionality
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
        endCallBtn.addEventListener('click', leaveMeeting);
    }
    
    // Close video chat modal
    if (closeVideoChatBtn) {
        closeVideoChatBtn.addEventListener('click', leaveMeeting);
    }
    
    // Audio mute/unmute control
    if (muteAudioBtn) {
        muteAudioBtn.addEventListener('click', () => {
            if (meeting && meeting.audio) {
                const isMuted = meeting.audio.isMuted();
                if (isMuted) {
                    meeting.audio.unmute();
                    muteAudioBtn.innerHTML = '<span class="icon">🔊</span><span class="label">Mute Audio</span>';
                } else {
                    meeting.audio.mute();
                    muteAudioBtn.innerHTML = '<span class="icon">🔇</span><span class="label">Unmute Audio</span>';
                }
            }
        });
    }
    
    // Video mute/unmute control
    if (muteVideoBtn) {
        muteVideoBtn.addEventListener('click', () => {
            if (meeting && meeting.video) {
                const isMuted = meeting.video.isMuted();
                if (isMuted) {
                    meeting.video.unmute();
                    muteVideoBtn.innerHTML = '<span class="icon">📹</span><span class="label">Mute Video</span>';
                } else {
                    meeting.video.mute();
                    muteVideoBtn.innerHTML = '<span class="icon">📷</span><span class="label">Unmute Video</span>';
                }
            }
        });
    }
    
    // Show incoming call notification for agents (simulation)
    function showIncomingCall() {
        if (incomingCall && isAgentLoggedIn) {
            incomingCall.style.display = 'block';
        }
    }
    
    // Simulate incoming call after agent login (for demo purposes)
    setTimeout(() => {
        if (isAgentLoggedIn) {
            showIncomingCall();
        }
    }, 3000);
    
});

// Handle page unload - clean up meeting
window.addEventListener('beforeunload', () => {
    if (meeting) {
        meeting.leave();
    }
});

console.log('Webex SDK integration ready!');