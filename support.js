// JavaScript for support page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Donation amount selection
    const donationButtons = document.querySelectorAll('.donation-btn');
    
    if (donationButtons.length) {
        donationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in the same container
                const container = this.closest('.donation-buttons');
                container.querySelectorAll('.donation-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // If custom button is clicked, show input field
                if (this.textContent === 'Custom') {
                    // Check if custom input already exists
                    let customInput = container.querySelector('.custom-amount');
                    
                    if (!customInput) {
                        customInput = document.createElement('div');
                        customInput.className = 'custom-amount';
                        customInput.style.marginTop = '10px';
                        
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.min = '1';
                        input.placeholder = 'Enter amount';
                        input.className = 'form-control';
                        input.style.width = '100%';
                        
                        customInput.appendChild(input);
                        container.appendChild(customInput);
                        
                        // Focus the input
                        input.focus();
                    } else {
                        customInput.style.display = 'block';
                        customInput.querySelector('input').focus();
                    }
                } else {
                    // Hide custom input if it exists
                    const customInput = container.querySelector('.custom-amount');
                    if (customInput) {
                        customInput.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // Donation buttons click handlers
    const donateButtons = document.querySelectorAll('.support-card .btn-primary');
    
    if (donateButtons.length) {
        donateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const card = this.closest('.support-card');
                const cardTitle = card.querySelector('h3').textContent;
                const selectedAmount = card.querySelector('.donation-btn.active');
                
                let amount = 'not specified';
                
                if (selectedAmount) {
                    if (selectedAmount.textContent === 'Custom') {
                        const customInput = card.querySelector('.custom-amount input');
                        if (customInput && customInput.value) {
                            amount = '$' + customInput.value;
                        } else {
                            alert('Please enter a custom amount.');
                            return;
                        }
                    } else {
                        amount = selectedAmount.textContent;
                    }
                }
                
                // In a real application, this would redirect to a payment processor
                // For demo purposes, show a success message
                alert(`Thank you for your ${cardTitle.toLowerCase()} of ${amount}! In a real application, you would be redirected to a secure payment page.`);
            });
        });
    }
    
    // Campaign support buttons
    const campaignButtons = document.querySelectorAll('.campaign-card .btn');
    
    if (campaignButtons.length) {
        campaignButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const campaignTitle = this.closest('.campaign-card').querySelector('h3').textContent;
                
                // In a real application, this would redirect to a campaign-specific donation page
                // For demo purposes, show a success message
                alert(`You're supporting the "${campaignTitle}" campaign! In a real application, you would be redirected to a campaign-specific donation page.`);
            });
        });
    }
    
    // Partnership and sponsorship buttons
    const partnershipButtons = document.querySelectorAll('.partnership-card .btn, .sponsorship-card .btn');
    
    if (partnershipButtons.length) {
        partnershipButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const cardType = this.closest('.partnership-card') ? 'partnership' : 'sponsorship';
                const cardTitle = this.closest(`.${cardType}-card`).querySelector('h3').textContent;
                
                // In a real application, this would redirect to a partnership/sponsorship form
                // For demo purposes, show a success message
                alert(`You're interested in the ${cardTitle} ${cardType}! In a real application, you would be redirected to a detailed information page and contact form.`);
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = 'red';
                        errorMessage.style.fontSize = 'var(--font-size-sm)';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('is-invalid');
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (isValid) {
                // In a real application, this would submit the form data to the server
                // For demo purposes, show a success message
                alert('Your message has been sent! We will get back to you soon.');
                contactForm.reset();
            } else {
                // Scroll to the first invalid field
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }
    
    // Social share buttons
    const socialShareButtons = document.querySelectorAll('.social-share-btn');
    
    if (socialShareButtons.length) {
        socialShareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.querySelector('i').className.split('-')[1];
                const shareUrl = encodeURIComponent(window.location.href);
                const shareTitle = encodeURIComponent('Support STEAM-Labz: Empowering STEAM Education for All');
                const shareText = encodeURIComponent('Help STEAM-Labz provide accessible STEAM education and resources to creators, makers, and educators worldwide.');
                
                let shareWindow;
                
                switch (platform) {
                    case 'twitter':
                        shareWindow = window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`, '_blank');
                        break;
                    case 'facebook':
                        shareWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
                        break;
                    case 'linkedin':
                        shareWindow = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
                        break;
                    case 'reddit':
                        shareWindow = window.open(`https://www.reddit.com/submit?url=${shareUrl}&title=${shareTitle}`, '_blank');
                        break;
                }
                
                if (shareWindow) {
                    shareWindow.focus();
                }
            });
        });
    }
    
    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (progressBars.length) {
        // Set initial width to 0
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            bar.dataset.targetWidth = targetWidth;
        });
        
        // Function to check if element is in viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        // Function to animate progress bars
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                if (isInViewport(bar) && bar.style.width === '0%') {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.targetWidth;
                    }, 200);
                }
            });
        };
        
        // Animate on scroll
        window.addEventListener('scroll', animateProgressBars);
        
        // Initial check
        animateProgressBars();
    }
});
