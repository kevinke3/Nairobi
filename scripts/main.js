// Main JavaScript for Nairobi Website
// ====================================

// DOM Ready State Check
let isDOMReady = false;

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    isDOMReady = true;
    console.log('DOM fully loaded');
});

// Loading Animation
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    const loader = document.querySelector('.loader');
    
    // Ensure loader shows for minimum time for better UX
    setTimeout(function() {
        if (loader) {
            loader.classList.add('hidden');
            
            // Remove loader from DOM after animation completes
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }
        
        // Initialize all features
        initAllFeatures();
        
    }, 1000); // Reduced to 1 second for better UX
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initAllFeatures() {
    console.log('Initializing all features...');
    
    // Add CSS animations
    addCSSAnimations();
    
    // Mobile Navigation (Priority 1)
    initMobileNavigation();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Intersection Observer animations
    initIntersectionObserver();
    
    // Form handling
    initFormHandling();
    
    // Image lazy loading
    initImageLazyLoading();
    
    // Reading progress indicator (for about page)
    initReadingProgress();
    
    // Content table navigation (for about page)
    initContentTableNavigation();
    
    // Portfolio link interaction
    initPortfolioLink();
    
    // Statistics Counter (for about page)
    initStatisticsCounter();
    
    // Image Gallery (for about page)
    initImageGallery();
    
    // Add about page specific elements
    if (document.body.classList.contains('about-page')) {
        createAboutPageElements();
    }
    
    // Initialize any dynamic elements
    initDynamicElements();
    
    console.log('All features initialized successfully');
}

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





// ===== MOBILE NAVIGATION =====
// function initMobileNavigation() {
//     console.log('Initializing mobile navigation...');
    
//     const menuToggle = document.querySelector('.menu-toggle');
//     const navLinks = document.querySelector('.nav-links');
    
//     if (!menuToggle || !navLinks) {
//         console.warn('Mobile navigation elements not found');
//         return;
//     }
    
//     // Set initial state
//     menuToggle.setAttribute('aria-expanded', 'false');
    
//     // Toggle menu function
//     function toggleMobileMenu() {
//         const isActive = navLinks.classList.toggle('active');
        
//         // Update icon
//         const icon = menuToggle.querySelector('i');
//         if (isActive) {
//             icon.classList.remove('fa-bars');
//             icon.classList.add('fa-times');
//             document.body.style.overflow = 'hidden';
//             menuToggle.setAttribute('aria-expanded', 'true');
//         } else {
//             icon.classList.remove('fa-times');
//             icon.classList.add('fa-bars');
//             document.body.style.overflow = '';
//             menuToggle.setAttribute('aria-expanded', 'false');
//         }
        
//         console.log('Mobile menu toggled:', isActive);
//     }
    
//     // Toggle menu on button click
//     menuToggle.addEventListener('click', function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         toggleMobileMenu();
//     });
    
//     // Close menu when clicking on a link
//     const navItems = document.querySelectorAll('.nav-links a');
//     navItems.forEach(item => {
//         item.addEventListener('click', function() {
//             if (navLinks.classList.contains('active')) {
//                 toggleMobileMenu();
//             }
//         });
//     });
    
//     // Close menu when clicking outside (mobile only)
//     document.addEventListener('click', function(e) {
//         if (window.innerWidth <= 768 && 
//             navLinks.classList.contains('active') && 
//             !navLinks.contains(e.target) && 
//             !menuToggle.contains(e.target)) {
//             toggleMobileMenu();
//         }
//     });
    
//     // Close menu on escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && navLinks.classList.contains('active')) {
//             toggleMobileMenu();
//         }
//     });
    
//     // Close menu on window resize (if resized to desktop)
//     window.addEventListener('resize', function() {
//         if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
//             toggleMobileMenu();
//         }
//     });
    
//     // Enhanced touch handling for mobile
//     if ('ontouchstart' in window) {
//         let touchStartX = 0;
//         let touchEndX = 0;
        
//         menuToggle.addEventListener('touchstart', function(e) {
//             touchStartX = e.touches[0].clientX;
//         }, {passive: true});
        
//         menuToggle.addEventListener('touchend', function(e) {
//             touchEndX = e.changedTouches[0].clientX;
//             const touchDiff = Math.abs(touchEndX - touchStartX);
            
//             // Only trigger on small movement (tap, not swipe)
//             if (touchDiff < 10) {
//                 this.click();
//             }
//         }, {passive: true});
//     }
    
//     console.log('Mobile navigation initialized successfully');
// }

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const landingPageHero = document.querySelector('.hero');
    
    if (!navbar || !landingPageHero || !navbar.classList.contains('transparent')) {
        return;
    }
    
    let isScrolled = false;
    
    function updateNavbar() {
        const shouldBeSolid = window.scrollY > 50;
        
        if (shouldBeSolid !== isScrolled) {
            isScrolled = shouldBeSolid;
            
            if (shouldBeSolid) {
                navbar.style.backgroundColor = 'white';
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = '';
                navbar.style.boxShadow = '';
            }
        }
    }
    
    // Initial check
    updateNavbar();
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                updateNavbar();
            }, 50);
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Select all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length === 0) return;
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate scroll position
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
                
                console.log('Smooth scrolling to:', href);
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    // Skip if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        return;
    }
    
    const animatedElements = document.querySelectorAll(
        '.card, .leader-card, .stat-card, .gallery-item, .hero-content, .page-header'
    );
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    if (forms.length === 0) return;
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Remove error class after user starts typing
                    input.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, {once: true});
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Thank you! Your message has been submitted. (Demo)');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
}

// ===== IMAGE LAZY LOADING =====
function initImageLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                
                // Load image
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove('lazy');
                
                // Handle load completion
                lazyImage.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                
                // Stop observing
                imageObserver.unobserve(lazyImage);
            }
        });
    }, {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.01
    });
    
    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
}

// ===== READING PROGRESS INDICATOR =====
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress-bar');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!progressBar && !backToTopBtn) return;
    
    function updateProgress() {
        // Update progress bar
        if (progressBar) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = window.pageYOffset;
            const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
            progressBar.style.width = Math.min(100, progress) + '%';
        }
        
        // Update back to top button
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }
    
    // Initialize
    updateProgress();
    
    // Throttle scroll events
    let progressTimeout;
    window.addEventListener('scroll', function() {
        if (!progressTimeout) {
            progressTimeout = setTimeout(function() {
                progressTimeout = null;
                updateProgress();
            }, 50);
        }
    });
    
    // Back to top functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== CONTENT TABLE NAVIGATION =====
function initContentTableNavigation() {
    const contentLinks = document.querySelectorAll('.content-table a[href^="#"]');
    
    if (contentLinks.length === 0) return;
    
    contentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navLinks && navLinks.classList.contains('active') && menuToggle) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Smooth scroll to target
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navbarHeight - 20,
                behavior: 'smooth'
            });
            
            // Highlight target briefly
            const originalBoxShadow = targetElement.style.boxShadow;
            targetElement.style.boxShadow = '0 0 0 3px rgba(30, 107, 82, 0.3)';
            
            setTimeout(() => {
                targetElement.style.boxShadow = originalBoxShadow;
            }, 1500);
        });
    });
}

// ===== PORTFOLIO LINK INTERACTION =====
function initPortfolioLink() {
    const portfolioLink = document.querySelector('.portfolio-name');
    
    if (!portfolioLink) return;
    
    // Add ripple effect on click
    portfolioLink.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode === this) {
                this.removeChild(ripple);
            }
        }, 600);
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// ===== STATISTICS COUNTER =====
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
        // Fallback: animate all stats immediately
        statNumbers.forEach(animateStatCounter);
        return;
    }
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Counter animation function
    function animateStatCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startValue = 0;
        
        function updateCounter() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (target - startValue) * easeOutQuart;
            
            // Update display
            if (target % 1 === 0) {
                // Integer
                element.textContent = Math.floor(currentValue) + suffix;
            } else {
                // Decimal
                element.textContent = currentValue.toFixed(1) + suffix;
            }
            
            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Start animation
        requestAnimationFrame(updateCounter);
    }
}

// ===== IMAGE GALLERY =====
function initImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
            <div class="lightbox-nav">
                <button class="lightbox-nav-btn prev-btn" aria-label="Previous image">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-nav-btn next-btn" aria-label="Next image">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-nav .prev-btn');
    const lightboxNext = lightbox.querySelector('.lightbox-nav .next-btn');
    
    let currentIndex = 0;
    let isLightboxOpen = false;
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        isLightboxOpen = true;
        
        // Add event listeners
        document.addEventListener('keydown', handleKeyboardNavigation);
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        isLightboxOpen = false;
        
        // Remove event listeners
        document.removeEventListener('keydown', handleKeyboardNavigation);
    }
    
    // Update lightbox content
    function updateLightbox() {
        const item = galleryItems[currentIndex];
        const imgSrc = item.querySelector('img').src;
        const caption = item.querySelector('.gallery-overlay h3')?.textContent || 'Nairobi Image';
        
        lightboxImage.src = imgSrc;
        lightboxCaption.textContent = caption;
        
        // Preload adjacent images for smoother navigation
        preloadAdjacentImages();
    }
    
    // Navigate lightbox
    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        updateLightbox();
    }
    
    // Handle keyboard navigation
    function handleKeyboardNavigation(e) {
        if (!isLightboxOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    }
    
    // Preload adjacent images
    function preloadAdjacentImages() {
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        
        [prevIndex, nextIndex].forEach(index => {
            const img = new Image();
            img.src = galleryItems[index].querySelector('img').src;
        });
    }
    
    // Set up gallery item click events
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        
        // Add keyboard support for gallery items
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });
    
    // Set up lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Gallery navigation controls (if present)
    const galleryPrevBtn = document.querySelector('.gallery-controls .prev-btn');
    const galleryNextBtn = document.querySelector('.gallery-controls .next-btn');
    const currentSlide = document.querySelector('.current-slide');
    const totalSlides = document.querySelector('.total-slides');
    
    if (totalSlides) {
        totalSlides.textContent = galleryItems.length;
    }
    
    if (galleryPrevBtn && galleryNextBtn && currentSlide) {
        galleryPrevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            currentSlide.textContent = currentIndex + 1;
        });
        
        galleryNextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            currentSlide.textContent = currentIndex + 1;
        });
    }
}

// ===== CREATE ABOUT PAGE ELEMENTS =====
function createAboutPageElements() {
    console.log('Creating about page elements...');
    
    // Create reading progress indicator
    if (!document.querySelector('.reading-progress')) {
        const readingProgress = document.createElement('div');
        readingProgress.className = 'reading-progress';
        readingProgress.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.insertBefore(readingProgress, document.body.firstChild);
    }
    
    // Create back to top button
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTopBtn);
    }
    
    // Create content table if not present and we have enough cards
    const contentSection = document.querySelector('.content-section');
    if (contentSection && !document.querySelector('.content-table')) {
        const cards = contentSection.querySelectorAll('.card');
        if (cards.length >= 3) {
            const contentTable = document.createElement('div');
            contentTable.className = 'content-table';
            
            const tableItems = Array.from(cards).map((card, index) => {
                const title = card.querySelector('h2').textContent;
                const id = `section-${index + 1}`;
                card.id = id;
                return `<li><a href="#${id}">${title}</a></li>`;
            }).join('');
            
            contentTable.innerHTML = `
                <h3><i class="fas fa-list"></i> Table of Contents</h3>
                <ul>
                    ${tableItems}
                </ul>
            `;
            contentSection.insertBefore(contentTable, contentSection.firstChild);
        }
    }
}

// ===== ADD CSS ANIMATIONS =====
function addCSSAnimations() {
    // Only add if not already added
    if (document.querySelector('#css-animations-style')) return;
    
    const style = document.createElement('style');
    style.id = 'css-animations-style';
    style.textContent = `
        /* Fade In Up Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Fade In Animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        /* Slide In Animation */
        @keyframes slideIn {
            from {
                transform: translateX(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Pulse Animation */
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        /* Apply animations */
        .card.animate-in,
        .leader-card.animate-in,
        .stat-card.animate-in,
        .gallery-item.animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .hero-content.animate-in,
        .page-header.animate-in {
            animation: fadeIn 1s ease-out forwards;
        }
        
        .nav-links.active {
            animation: slideIn 0.3s ease-out forwards;
        }
        
        .stat-card:hover {
            animation: pulse 0.5s ease-in-out;
        }
        
        /* Loading animation */
        .loader.hidden {
            animation: fadeOut 0.5s ease-out forwards;
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== INITIALIZE DYNAMIC ELEMENTS =====
function initDynamicElements() {
    // Add current year to footer if placeholder exists
    const yearElement = document.querySelector('[data-current-year]');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add active class to current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Initialize tooltips if any
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 10) + 'px';
            tooltipEl.style.left = (rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
            
            this.tooltipElement = tooltipEl;
        });
        
        tooltip.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// ===== ERROR HANDLING AND FALLBACKS =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, ':', e.lineno);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll/resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll/resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== POLYFILLS FOR OLDER BROWSERS =====
// RequestAnimationFrame polyfill
(function() {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    
    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || 
                                     window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

// ===== EXPORT FUNCTIONS FOR DEBUGGING (Optional) =====
if (typeof window !== 'undefined') {
    window.nairobiWebsite = {
        initAllFeatures,
        initMobileNavigation,
        initStatisticsCounter,
        initImageGallery,
        version: '1.0.0'
    };
}

console.log('Nairobi Website JavaScript loaded successfully');


