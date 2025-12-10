// Main JavaScript for Nairobi Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Change navbar background on scroll for landing page
    const navbar = document.querySelector('.navbar');
    const landingPageHero = document.querySelector('.hero');
    
    if (landingPageHero && navbar.classList.contains('transparent')) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'white';
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'transparent';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards on about and leaders pages
    document.querySelectorAll('.card, .leader-card').forEach(card => {
        observer.observe(card);
    });
    
    // Form handling if any forms are added in the future
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic would go here
            alert('Form submitted! This is a demo website.');
        });
    });
    
    // Image lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Add to existing main.js file

// Reading progress indicator
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress-bar');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!progressBar || !backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        progressBar.style.width = scrolled + '%';
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Content table navigation
function initContentTableNavigation() {
    const contentLinks = document.querySelectorAll('.content-table a[href^="#"]');
    
    contentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to section
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Highlight the section briefly
                targetElement.style.boxShadow = '0 0 0 3px rgba(30, 107, 82, 0.3)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 1500);
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add these new initializations
    initReadingProgress();
    initContentTableNavigation();
    
    // Add reading progress bar and back-to-top button to about page
    if (document.body.classList.contains('about-page')) {
        // Create reading progress indicator
        const readingProgress = document.createElement('div');
        readingProgress.className = 'reading-progress';
        readingProgress.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.insertBefore(readingProgress, document.body.firstChild);
        
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        // Create content table if not present
        const contentSection = document.querySelector('.content-section');
        if (contentSection && !document.querySelector('.content-table')) {
            const cards = contentSection.querySelectorAll('.card');
            if (cards.length > 3) {
                const contentTable = document.createElement('div');
                contentTable.className = 'content-table';
                contentTable.innerHTML = `
                    <h3>Table of Contents</h3>
                    <ul>
                        ${Array.from(cards).map((card, index) => {
                            const title = card.querySelector('h2').textContent;
                            const id = `section-${index + 1}`;
                            card.id = id;
                            return `<li><a href="#${id}">${title}</a></li>`;
                        }).join('')}
                    </ul>
                `;
                contentSection.insertBefore(contentTable, contentSection.firstChild);
            }
        }
    }
});

// Enhanced portfolio link interaction
function initPortfolioLink() {
    const portfolioLink = document.querySelector('.portfolio-name');
    
    if (portfolioLink) {
        // Add click animation
        portfolioLink.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Open in new tab (already handled by target="_blank")
            // Just adding a slight delay for visual feedback
            setTimeout(() => {
                // This is already handled by the anchor tag's target="_blank"
            }, 300);
        });
        
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code...
    
    // Add portfolio link initialization
    initPortfolioLink();
});