// Enhanced Preloader with Percentage
(function() {
    const preloader = document.getElementById('preloader');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    if (!preloader || !loadingPercentage) return;
    
    let progress = 0;
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        
        loadingPercentage.textContent = Math.floor(progress) + '%';
    }, interval);
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', () => {
        // Ensure we show 100% before hiding
        setTimeout(() => {
            loadingPercentage.textContent = '100%';
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Remove preloader from DOM after animation
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 300);
        }, 200);
    });
    
    // Fallback: Hide preloader after max 3 seconds even if load event doesn't fire
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            loadingPercentage.textContent = '100%';
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 300);
        }
    }, 3000);
})();

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Handle dropdown toggle on hover (mobile/tablet)
const dropdownToggle = document.querySelector('.nav-item-dropdown .nav-link');
const dropdownItem = document.querySelector('.nav-item-dropdown');
if (dropdownToggle && dropdownItem) {
    // Use hover for devices that support it
    dropdownItem.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 968) {
            dropdownItem.classList.add('mobile-dropdown-active');
        }
    });
    
    dropdownItem.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 968) {
            dropdownItem.classList.remove('mobile-dropdown-active');
        }
    });
    
    // Also support touch/click for mobile devices
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            e.stopPropagation();
            dropdownItem.classList.toggle('mobile-dropdown-active');
        }
    });
}

// Handle submenu links - don't close menu on click
const megaMenuLinks = document.querySelectorAll('.mega-menu-list a');
megaMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            // Allow navigation but keep menu open for now
            // You can change this behavior if needed
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking on dropdown toggle or submenu items
        if (window.innerWidth <= 968) {
            if (link.closest('.nav-item-dropdown')) {
                return;
            }
            if (link.closest('.mega-menu')) {
                return;
            }
        }
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            let displayValue;
            if (target % 1 === 0) {
                displayValue = Math.floor(current);
            } else {
                displayValue = current.toFixed(1);
            }
            element.textContent = displayValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            let displayValue;
            if (target % 1 === 0) {
                displayValue = target;
            } else {
                displayValue = target.toFixed(1);
            }
            element.textContent = displayValue + suffix;
        }
    };

    updateCounter();
}

// Intersection Observer for Counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number[data-target]');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

// Observe stats sections
const statsSection = document.querySelector('.stats');
const featuresSection = document.querySelector('.features');
if (statsSection) counterObserver.observe(statsSection);
if (featuresSection) counterObserver.observe(featuresSection);

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && phone && message) {
            // Here you would typically send the data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fade in on scroll animation - Now handled by initScrollAnimations()

// Parallax Effect for Whole Page
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background, .directors-background, .vision-background, .project-image, .about-image img, .values-image img, .what-we-do-img, .excavation-image img');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            
            // Calculate if element is in viewport
            const elementCenter = elementTop + (rect.height / 2);
            const viewportCenter = scrolled + (windowHeight / 2);
            
            // Distance from viewport center
            const distance = viewportCenter - elementCenter;
            
            // Apply parallax effect with different speeds for different elements
            let parallaxSpeed = 0.5;
            if (element.classList.contains('hero-background')) {
                parallaxSpeed = 0.3;
            } else if (element.classList.contains('directors-background')) {
                parallaxSpeed = 0.4;
            } else if (element.classList.contains('project-image')) {
                parallaxSpeed = 0.2;
            } else if (element.classList.contains('what-we-do-img')) {
                parallaxSpeed = 0.35;
            } else if (element.closest('.excavation-image')) {
                parallaxSpeed = 0.4;
            }
            
            const yPos = distance * parallaxSpeed;
            
            // Only apply if element is near viewport
            if (rect.bottom > -rect.height && rect.top < windowHeight + rect.height) {
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();
}

// About Section Load Animation
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aboutTitle = entry.target.querySelector('.about-title-container');
                const aboutDescription = entry.target.querySelector('.about-description');
                const aboutFeatureBoxes = entry.target.querySelectorAll('.about-feature-box');
                const aboutImage = entry.target.querySelector('.about-image');
                
                // Animate title
                if (aboutTitle) {
                    setTimeout(() => {
                        aboutTitle.style.opacity = '1';
                        aboutTitle.style.transform = 'translateX(0)';
                    }, 100);
                }
                
                // Animate description
                if (aboutDescription) {
                    setTimeout(() => {
                        aboutDescription.style.opacity = '1';
                        aboutDescription.style.transform = 'translateY(0)';
                    }, 300);
                }
                
                // Animate feature boxes with stagger
                aboutFeatureBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 500 + (index * 200));
                });
                
                // Animate image
                if (aboutImage) {
                    setTimeout(() => {
                        aboutImage.style.opacity = '1';
                        aboutImage.style.transform = 'translateX(0)';
                    }, 400);
                }
                
                aboutObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    // Set initial styles for about section elements
    const aboutTitle = aboutSection.querySelector('.about-title-container');
    const aboutDescription = aboutSection.querySelector('.about-description');
    const aboutFeatureBoxes = aboutSection.querySelectorAll('.about-feature-box');
    const aboutImage = aboutSection.querySelector('.about-image');
    
    if (aboutTitle) {
        aboutTitle.style.opacity = '0';
        aboutTitle.style.transform = 'translateX(-50px)';
        aboutTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    if (aboutDescription) {
        aboutDescription.style.opacity = '0';
        aboutDescription.style.transform = 'translateY(30px)';
        aboutDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    aboutFeatureBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    if (aboutImage) {
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'translateX(50px)';
        aboutImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    aboutObserver.observe(aboutSection);
}

// Video Modal Functionality
const heroPlayButton = document.getElementById('heroPlayButton');
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const videoIframe = document.getElementById('videoIframe');
const videoPlayer = document.getElementById('videoPlayer');
const videoModalOverlay = document.querySelector('.video-modal-overlay');

// Hero video URL - Local video file
const heroVideoUrl = 'images/Trailer-v2.mov';

// Function to check if URL is a local video file
function isLocalVideo(url) {
    const videoExtensions = ['.mov', '.mp4', '.webm', '.ogg', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
}

// Function to play video (handles both local files and iframe embeds)
function playVideo(videoUrl) {
    if (!videoModal) return;
    
    // Hide both initially
    if (videoIframe) videoIframe.style.display = 'none';
    if (videoPlayer) videoPlayer.style.display = 'none';
    
    if (isLocalVideo(videoUrl)) {
        // Use video element for local files
        if (videoPlayer) {
            const source = videoPlayer.querySelector('source');
            if (source) {
                source.src = videoUrl;
                videoPlayer.load();
                videoPlayer.style.display = 'block';
                videoPlayer.play();
            }
        }
    } else {
        // Use iframe for YouTube/embed URLs
        if (videoIframe) {
            const urlWithAutoplay = videoUrl.includes('?') ? videoUrl + '&autoplay=1' : videoUrl + '?autoplay=1';
            videoIframe.src = urlWithAutoplay;
            videoIframe.style.display = 'block';
        }
    }
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close modal
const closeModal = () => {
    if (!videoModal) return;
    
    videoModal.classList.remove('active');
    
    // Stop video playback
    if (videoIframe) {
        videoIframe.src = '';
        videoIframe.style.display = 'none';
    }
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        const source = videoPlayer.querySelector('source');
        if (source) source.src = '';
        videoPlayer.style.display = 'none';
    }
    
    document.body.style.overflow = '';
};

if (heroPlayButton && videoModal) {
    // Open modal with hero video
    heroPlayButton.addEventListener('click', () => {
        playVideo(heroVideoUrl);
    });

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', closeModal);
    }

    if (videoModalOverlay) {
        videoModalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Podcast Play Buttons
const podcastPlayButtons = document.querySelectorAll('.podcast-play-button');

podcastPlayButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        const videoUrl = button.getAttribute('data-video-url');
        if (videoUrl) {
            playVideo(videoUrl);
        }
    });
});

// Scroll Animation System
function initScrollAnimations() {
    // Default animation types for different elements
    const animationMap = {
        // Titles and Headings (excluding services)
        'h1, h2, h3, .section-title, .about-title, .projects-title, .excavation-title, .podcasts-title, .values-title, .certification-title, .partnerships-title, .vision-title, .our-people-title, .directors-title, .what-we-do-title': 'animate-slide-up',
        
        // Vertical Labels (excluding services)
        '.about-vertical-label, .projects-vertical-label, .values-vertical-label, .certification-vertical-label, .partnerships-vertical-label, .vision-vertical-label, .directors-vertical-label, .what-we-do-vertical-label, .hero-vertical-label, .contact-vertical-label, .our-people-vertical-label': 'animate-fade-in',
        
        // Descriptions and Text (excluding services)
        'p, .section-description, .about-description, .hero-description, .projects-description, .values-description, .certification-description, .partnerships-description, .vision-description, .directors-description, .what-we-do-description, .our-people-description': 'animate-fade-in',
        
        // Cards (excluding service-card)
        '.project-card, .value-card, .certification-card, .podcast-video-card, .about-feature-box, .excavation-feature-box': 'animate-slide-up',
        
        // Images
        '.about-image, .excavation-image, .values-image, .partnerships-image, .partnerships-image-reversed, .what-we-do-img, .our-people-image': 'animate-slide-right',
        '.about-image img, .excavation-image img, .values-image img, .partnerships-image img, .partnerships-image-reversed img, .what-we-do-img img, .our-people-image img': 'animate-slide-right',
        
        // Text Content Areas
        '.about-text, .excavation-text, .partnerships-text, .partnerships-text-reversed, .what-we-do-content': 'animate-slide-left',
        
        // Grids and Containers (excluding services-grid)
        '.stats-grid, .projects-grid, .values-grid, .podcasts-grid, .about-features-grid, .excavation-features-grid': 'animate-fade-in',
        
        // Stat Items
        '.stat-item': 'animate-scale',
        
        // Content Sections
        '.directors-content, .vision-content, .certification-content, .what-we-do-content, .our-people-content': 'animate-fade-in',
        
        // Contact Form
        '.contact-form-content, .contact-info-card, .contact-form-left, .contact-info-right': 'animate-slide-up',
        
        // Buttons (excluding services-view-details-btn)
        '.btn-primary, .btn-secondary, .projects-view-all-btn, .partnerships-learn-more-btn, .careers-btn': 'animate-scale',
        
        // Title Containers (excluding services-title-container)
        '.about-title-container, .projects-title-container, .values-title-container, .certification-title-container, .partnerships-title-container, .vision-title-container, .directors-title-container, .what-we-do-title-container, .our-people-title-container, .contact-title-container': 'animate-fade-in'
    };

    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing once animated
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Helper function to check if element is in services section
    function isInServicesSection(element) {
        const servicesSection = document.querySelector('.services-summary, .services');
        if (!servicesSection) return false;
        return servicesSection.contains(element);
    }

    // Apply animations to elements
    Object.keys(animationMap).forEach(selector => {
        const elements = document.querySelectorAll(selector);
        const animationClass = animationMap[selector];
        
        elements.forEach((element, index) => {
            // Skip if element is in services section
            if (isInServicesSection(element)) {
                return;
            }
            
            // Skip if already has animation class
            if (element.classList.contains('animate-slide-up') || 
                element.classList.contains('animate-fade-in') || 
                element.classList.contains('animate-slide-right') || 
                element.classList.contains('animate-slide-left') || 
                element.classList.contains('animate-scale')) {
                return;
            }
            
            // Add animation class
            element.classList.add(animationClass);
            
            // Add stagger delay for grid items
            if (element.parentElement && (
                element.parentElement.classList.contains('stats-grid') ||
                element.parentElement.classList.contains('projects-grid') ||
                element.parentElement.classList.contains('values-grid') ||
                element.parentElement.classList.contains('podcasts-grid') ||
                element.parentElement.classList.contains('about-features-grid') ||
                element.parentElement.classList.contains('excavation-features-grid')
            )) {
                const delayIndex = index % 5;
                if (delayIndex > 0) {
                    element.classList.add(`animate-delay-${delayIndex}`);
                }
            }
            
            // Observe element
            animationObserver.observe(element);
        });
    });

    // Animate sections with children - Enhanced version (excluding services section)
    const sections = document.querySelectorAll('section, .contact-section');
    sections.forEach(section => {
        // Skip services section
        if (section.classList.contains('services-summary') || section.classList.contains('services')) {
            return;
        }
        
        const sectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Animate children with stagger (excluding service-card)
                const children = section.querySelectorAll(`
                    .project-card, .value-card, .certification-card, .podcast-video-card, 
                    .stat-item, .about-feature-box, .excavation-feature-box, 
                    .partnerships-card, .careers-floating-card
                `);
                
                children.forEach((child, index) => {
                    setTimeout(() => {
                        if (!child.classList.contains('animated')) {
                            child.classList.add('animated');
                        }
                    }, index * 100);
                });
                
                // Animate title containers first (excluding services-title-container)
                const titleContainers = section.querySelectorAll(`
                    .about-title-container, .projects-title-container, 
                    .values-title-container, .certification-title-container, .partnerships-title-container, 
                    .vision-title-container, .directors-title-container, .what-we-do-title-container, 
                    .our-people-title-container, .contact-title-container
                `);
                titleContainers.forEach((container, index) => {
                    setTimeout(() => {
                        if (!container.classList.contains('animated')) {
                            container.classList.add('animated');
                        }
                    }, index * 50);
                });
                
                // Animate vertical labels (excluding services-vertical-label)
                const verticalLabels = section.querySelectorAll(`
                    .about-vertical-label, .projects-vertical-label, 
                    .values-vertical-label, .certification-vertical-label, .partnerships-vertical-label, 
                    .vision-vertical-label, .directors-vertical-label, .what-we-do-vertical-label, 
                    .contact-vertical-label, .our-people-vertical-label
                `);
                verticalLabels.forEach((label, index) => {
                    setTimeout(() => {
                        if (!label.classList.contains('animated')) {
                            label.classList.add('animated');
                        }
                    }, index * 50);
                });
                
                // Animate images
                const images = section.querySelectorAll(`
                    .about-image, .excavation-image, .values-image, .partnerships-image, 
                    .partnerships-image-reversed, .what-we-do-img, .our-people-image
                `);
                images.forEach((img, index) => {
                    setTimeout(() => {
                        if (!img.classList.contains('animated')) {
                            img.classList.add('animated');
                        }
                    }, 200 + (index * 100));
                });
                
                // Stop observing once animated
                sectionObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

        sectionObserver.observe(section);
    });
}

// Custom Cursor Tracking with Flowing Effect
(function() {
    const cursor = document.getElementById('customCursor');
    const cursorDot = cursor?.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth flowing animation for dot
        function animateCursor() {
            // Dot follows with slight delay
            dotX += (mouseX - dotX) * 0.15;
            dotY += (mouseY - dotY) * 0.15;
            
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .nav-link, .service-card, .project-card, .podcast-video-card, .contact-submit-btn, .hero-play-button, .podcast-play-button, input, textarea, select');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
    } else {
        // Hide cursor on mobile
        cursor.style.display = 'none';
    }
})();

// Services Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.services-slider-prev');
    const nextBtn = document.querySelector('.services-slider-next');
    const dots = document.querySelectorAll('.services-dot');
    
    if (!cards.length) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    const visibleCards = 3;
    const maxIndex = totalCards - visibleCards; // Maximum index (no infinite scroll)
    let autoScrollInterval = null;
    let autoScrollDirection = 'left'; // 'left' for next, 'right' for prev
    
    function initializePositions() {
        cards.forEach((card, index) => {
            if (index < 3) {
                card.setAttribute('data-position', index + 1);
            } else {
                card.setAttribute('data-position', '0');
            }
        });
    }
    
    function updatePositions() {
        const slideIndex = Math.floor(currentIndex / visibleCards);
        const maxSlides = Math.ceil(totalCards / visibleCards);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        // Disable buttons at boundaries (no infinite scroll)
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    }
    
    function nextSlide() {
        // Stop at the end (no infinite scroll)
        if (currentIndex >= maxIndex) {
            return;
        }
        
        const card1 = document.querySelector('.service-card[data-position="1"]');
        const card2 = document.querySelector('.service-card[data-position="2"]');
        const card3 = document.querySelector('.service-card[data-position="3"]');
        
        // Move card 1 to exit (far left)
        if (card1) card1.setAttribute('data-position', '0');
        
        // Move card 2 to position 1 (left side)
        if (card2) card2.setAttribute('data-position', '1');
        
        // Move card 3 to position 2 (center - main focus)
        if (card3) card3.setAttribute('data-position', '2');
        
        // Get next card (no modulo - no infinite scroll)
        const nextCardIndex = currentIndex + 3;
        if (nextCardIndex < totalCards) {
            const nextCard = cards[nextCardIndex];
            if (nextCard) {
                nextCard.setAttribute('data-position', '4'); // Enter from far right
                setTimeout(() => {
                    nextCard.setAttribute('data-position', '3');
                }, 50);
            }
        }
        
        // Increment (no wrap around)
        currentIndex++;
        updatePositions();
    }
    
    function prevSlide() {
        // Stop at the beginning (no infinite scroll)
        if (currentIndex <= 0) {
            return;
        }
        
        const card1 = document.querySelector('.service-card[data-position="1"]');
        const card2 = document.querySelector('.service-card[data-position="2"]');
        const card3 = document.querySelector('.service-card[data-position="3"]');
        
        // Move card 3 to exit (far right)
        if (card3) card3.setAttribute('data-position', '4');
        
        // Move card 2 to position 3 (right side)
        if (card2) card2.setAttribute('data-position', '3');
        
        // Move card 1 to position 2 (center - main focus)
        if (card1) card1.setAttribute('data-position', '2');
        
        // Get previous card (no modulo - no infinite scroll)
        const prevCardIndex = currentIndex - 1;
        if (prevCardIndex >= 0) {
            const prevCard = cards[prevCardIndex];
            if (prevCard) {
                prevCard.setAttribute('data-position', '0'); // Enter from far left
                setTimeout(() => {
                    prevCard.setAttribute('data-position', '1');
                }, 50);
            }
        }
        
        // Decrement (no wrap around)
        currentIndex--;
        updatePositions();
    }
    
    function goToSlide(slideIndex) {
        const maxSlides = Math.ceil(totalCards / visibleCards);
        const targetSlideIndex = Math.min(slideIndex, maxSlides - 1);
        const targetIndex = targetSlideIndex * visibleCards;
        
        if (targetIndex === currentIndex) return;
        
        // Reset and go to target
        currentIndex = targetIndex;
        initializePositions();
        updatePositions();
    }
    
    function startAutoScroll() {
        // Clear any existing interval
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        
        // Start auto-scroll every 5 seconds
        autoScrollInterval = setInterval(() => {
            if (autoScrollDirection === 'left') {
                // Slide left (next) until end
                if (currentIndex >= maxIndex) {
                    // Reached the end, change direction to right
                    autoScrollDirection = 'right';
                    prevSlide();
                } else {
                    nextSlide();
                }
            } else {
                // Slide right (prev) until beginning
                if (currentIndex <= 0) {
                    // Reached the beginning, change direction to left
                    autoScrollDirection = 'left';
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }, 5000);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    function restartAutoScroll() {
        stopAutoScroll();
        // Only restart if not at the end
        if (currentIndex < maxIndex) {
            // Restart after a short delay
            setTimeout(() => {
                startAutoScroll();
            }, 5000);
        }
    }
    
    initializePositions();
    updatePositions();
    startAutoScroll();
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            restartAutoScroll();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            restartAutoScroll();
        });
    }
    
    // Also attach events to mobile buttons
    const mobilePrevBtn = document.querySelector('.services-mobile-prev');
    const mobileNextBtn = document.querySelector('.services-mobile-next');
    
    if (mobileNextBtn) {
        mobileNextBtn.addEventListener('click', () => {
            nextSlide();
            restartAutoScroll();
        });
    }
    
    if (mobilePrevBtn) {
        mobilePrevBtn.addEventListener('click', () => {
            prevSlide();
            restartAutoScroll();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            restartAutoScroll();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const servicesSection = document.querySelector('.services-summary');
        if (!servicesSection) return;
        
        const rect = servicesSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                restartAutoScroll();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                restartAutoScroll();
            }
        }
    });
    
    // Pause auto-scroll on hover
    const servicesCarousel = document.querySelector('.services-carousel-container');
    if (servicesCarousel) {
        servicesCarousel.addEventListener('mouseenter', stopAutoScroll);
        servicesCarousel.addEventListener('mouseleave', startAutoScroll);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    activateNavLink();
    // Initialize parallax
    initParallax();
    // Initialize scroll animations
    initScrollAnimations();
});

