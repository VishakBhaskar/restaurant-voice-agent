// ========================================
// Retell Voice Agent Integration (Web Call)
// ========================================

let retellWebClient = null;
let currentCallStatus = 'idle';

// Detect if running in production or local
const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001' // Local development
    : window.location.origin; // Production - uses same origin as the website

// Initialize Retell Web Client
function initializeRetellClient() {
    console.log('Initializing Retell Client...');

    try {
        retellWebClient = new RetellWebClient();
        console.log('✅ Retell Client initialized successfully');

        // Call started
        retellWebClient.on('call_started', () => {
            console.log('Call started successfully');
            currentCallStatus = 'active';
            updateCallStatus('active', 'Call Active', 'Speaking with AI assistant...');
            showEndCallButton();
        });

        // Call ended
        retellWebClient.on('call_ended', () => {
            console.log('Call ended');
            currentCallStatus = 'ended';
            updateCallStatus('ended', 'Call Ended', 'Thank you for your order!');
            hideEndCallButton();

            // Reset after 3 seconds
            setTimeout(() => {
                hideCallStatus();
                resetUI();
            }, 3000);
        });

        // Agent start talking
        retellWebClient.on('agent_start_talking', () => {
            console.log('Agent started talking');
        });

        // Agent stop talking
        retellWebClient.on('agent_stop_talking', () => {
            console.log('Agent stopped talking');
        });

        // Error handling
        retellWebClient.on('error', (error) => {
            console.error('Call error:', error);
            currentCallStatus = 'error';
            showError(error.message || 'An error occurred during the call');
            hideEndCallButton();
            resetUI();
        });
    } catch (error) {
        console.error('Failed to initialize Retell Client:', error);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupPhoneInput();
    initializeRetellClient();
});

// ========================================
// Phone Input Formatting
// ========================================

function setupPhoneInput() {
    const phoneInput = document.getElementById('phoneInput');

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }

        e.target.value = value;
    });

    // Allow starting call with Enter key
    phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startVoiceCall();
        }
    });
}

function getCleanPhoneNumber() {
    const phoneInput = document.getElementById('phoneInput');
    return phoneInput.value.replace(/\D/g, '');
}

function validatePhoneNumber(phone) {
    return phone.length === 10;
}

// ========================================
// Call Management
// ========================================

async function startVoiceCall() {
    const phone = getCleanPhoneNumber();

    // Check if Retell client is initialized
    if (!retellWebClient) {
        showError('Voice system is still initializing. Please wait a moment and try again.');
        console.error('Retell client not initialized');
        return;
    }

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
        showError('Please enter a valid 10-digit phone number');
        return;
    }

    // Update UI
    currentCallStatus = 'connecting';
    updateCallStatus('connecting', 'Connecting...', 'Setting up your call');
    document.getElementById('callButton').disabled = true;
    document.getElementById('phoneInput').disabled = true;
    hideError();

    try {
        // Call backend to create web call
        const response = await fetch(`${BACKEND_URL}/api/create-web-call`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: `+1${phone}`
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create call');
        }

        const data = await response.json();
        const { access_token, call_id } = data;

        console.log('Call created:', call_id);

        // Start call with Retell SDK (WebRTC in browser)
        await retellWebClient.startCall({
            accessToken: access_token,
            sampleRate: 24000,
            emitRawAudioSamples: false
        });

    } catch (error) {
        console.error('Error starting call:', error);
        showError(error.message || 'Failed to start call. Please try again.');
        resetUI();
    }
}

function endCall() {
    if (retellWebClient && currentCallStatus === 'active') {
        retellWebClient.stopCall();
    }
    resetUI();
}

// ========================================
// UI Updates
// ========================================

function updateCallStatus(status, title, message) {
    const callStatusContainer = document.getElementById('callStatusContainer');
    const statusText = document.getElementById('statusText');
    const statusMessage = document.getElementById('statusMessage');
    const statusDot = document.getElementById('statusDot');

    callStatusContainer.style.display = 'block';
    statusText.textContent = title;
    statusMessage.textContent = message;

    // Update dot color based on status
    statusDot.className = 'status-dot';
    if (status === 'active') {
        statusDot.classList.add('active');
    } else if (status === 'error') {
        statusDot.classList.add('error');
    }

    hideError();
}

function hideCallStatus() {
    document.getElementById('callStatusContainer').style.display = 'none';
}

function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');
    errorContainer.style.display = 'flex';
    errorMessage.textContent = message;
    hideCallStatus();
}

function hideError() {
    document.getElementById('errorContainer').style.display = 'none';
}

function showEndCallButton() {
    document.getElementById('callButton').style.display = 'none';
    document.getElementById('endCallButton').style.display = 'flex';
    document.getElementById('floatingEndCallButton').style.display = 'flex';

    // Change navbar button to "End Call"
    const navButton = document.getElementById('navOrderButton');
    const navButtonText = document.getElementById('navOrderButtonText');

    console.log('navButton:', navButton);
    console.log('navButtonText:', navButtonText);

    if (navButton && navButtonText) {
        navButtonText.textContent = 'End Call';
        navButton.onclick = function(e) {
            e.preventDefault();
            endCall();
        };
        navButton.style.backgroundColor = '#dc3545';
        console.log('✅ Navbar button changed to End Call');
    } else {
        console.error('❌ Could not find navbar button elements');
    }
}

function hideEndCallButton() {
    document.getElementById('callButton').style.display = 'flex';
    document.getElementById('endCallButton').style.display = 'none';
    document.getElementById('floatingEndCallButton').style.display = 'none';

    // Re-enable buttons immediately
    document.getElementById('callButton').disabled = false;
    document.getElementById('phoneInput').disabled = false;

    // Change navbar button back to "Order Now"
    const navButton = document.getElementById('navOrderButton');
    const navButtonText = document.getElementById('navOrderButtonText');

    if (navButton && navButtonText) {
        navButtonText.textContent = 'Order Now';
        navButton.onclick = function(e) {
            e.preventDefault();
            scrollToVoiceOrder();
        };
        navButton.style.backgroundColor = '';
        console.log('✅ Navbar button changed back to Order Now');
    }
}

function resetUI() {
    currentCallStatus = 'idle';
    document.getElementById('callButton').disabled = false;
    document.getElementById('phoneInput').disabled = false;
    hideEndCallButton();
}

// ========================================
// Smooth Scroll Functions
// ========================================

function scrollToVoiceOrder() {
    const voiceOrderSection = document.querySelector('.voice-order-section');
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;
    const sectionPosition = voiceOrderSection.offsetTop - navbarHeight;

    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
    });

    // Focus on phone input after scroll
    setTimeout(() => {
        document.getElementById('phoneInput').focus();
    }, 500);
}

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;
    const menuPosition = menuSection.offsetTop - navbarHeight;

    window.scrollTo({
        top: menuPosition,
        behavior: 'smooth'
    });
}

// ========================================
// Mobile Navigation
// ========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Sticky Navigation
// ========================================

const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    lastScrollY = window.scrollY;
});

// ========================================
// Menu Item Interactions
// ========================================

function orderItem(itemName) {
    console.log(`Order placed for: ${itemName}`);
    showOrderNotification(itemName);
}

function showOrderNotification(itemName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1a1a1a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid #D4AF37;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;

    notification.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div>
            <strong>${itemName}</strong> ready to order
            <br>
            <small style="color: #B0B0B0;">Click "Order Now" to place your order</small>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// Intersection Observer for Menu Items
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items for scroll animations
window.addEventListener('load', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(item);
    });
});

// ========================================
// Parallax Effect
// ========================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ========================================
// Accessibility
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, .menu-item, input');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #D4AF37';
            element.style.outlineOffset = '2px';
        });
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});
