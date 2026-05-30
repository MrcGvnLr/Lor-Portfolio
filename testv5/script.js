document.addEventListener("DOMContentLoaded",function(){
    
    const texts = [
        "Marc Gavin Lor",
        "a Gamer",
        "a Student",
        "an Intern",
        "a Learner",
        "a Programmer",
        "a Developer",

    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type(){
        const currentText = texts[textIndex];
        const typingElement = document.querySelector(".typing-text");

        if(isDeleting){
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentText.substring(0,charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        if (!isDeleting && charIndex === currentText.length){
            isDeleting = true;
            typingDelay = 1500;
        } else if(isDeleting && charIndex === 0){
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        }
        setTimeout(type, typingDelay);
    }

    //typing effect after delay
    setTimeout(type, 1000);

    // Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for Stats Animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Parallax effect for floating icons
    let parallaxTicking = false;
    const floatingIcons = document.querySelectorAll('.floating-icon');

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        floatingIcons.forEach((icon, index) => {
            const speed = (index + 1) * 0.1;
            icon.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.02 * (index % 2 === 0 ? 1 : -1)}deg)`;
        });

        parallaxTicking = false;
    }

    function requestParallax() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }

    window.addEventListener('scroll', requestParallax);

    // Enhanced hover effects for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('social-ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Profile image interaction
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.addEventListener('click', function() {
            this.classList.add('profile-clicked');
            setTimeout(() => {
                this.classList.remove('profile-clicked');
            }, 300);
        });
    }

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar-container');
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = targetWidth;
        }, 500 + index * 200); // stagger animation
    });

    // Enhanced Skill Cards Interactivity
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Add visibility animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideInUp 0.6s ease forwards`;
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove existing ripple
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();
            
            this.appendChild(ripple);
        });
        
        // Add tooltip effect on hover
        card.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            if (skill) {
                this.title = skill;
            }
        });
    });

    // Animate proficiency and soft skill bars on scroll
    const proficiencyBars = document.querySelectorAll('.proficiency-bar, .soft-skill-progress');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.width = width;
                }, 100);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    proficiencyBars.forEach(bar => barObserver.observe(bar));

    const quoteItems = [
        {
            message: '“Believe me, It works on my Machine.”',
            author: '— every programmer ever'
        },
        {
            message: '“If debugging is removing bugs, then programming must be adding them.”',
            author: '— Edsger Dijkstra'
        },
        {
            message: '“Simplicity is the soul of efficiency.”',
            author: '— Austin Freeman'
        },
        {
            message: '“If it works, dont touch it”',
            author: '— every programmer ever'
        },
        {
            message: '“Programmer: A machine that turns coffee into code.”',
            author: '— Unknown'
        }
        ,{
            message: '“Algorithm: Word used by programmers when they dont want to explain what they did.”',
            author: '— Random Programmer'
        }

    ];

    let currentQuote = 0;
    const quoteMessage = document.querySelector('.interactive-message');
    const quoteAuthor = document.querySelector('.interactive-meta');

    function rotateQuote() {
        currentQuote = (currentQuote + 1) % quoteItems.length;
        if (quoteMessage) {
            quoteMessage.textContent = quoteItems[currentQuote].message;
        }
        if (quoteAuthor) {
            quoteAuthor.textContent = quoteItems[currentQuote].author;
        }
    }

    setInterval(rotateQuote, 5200);
});

// Modal for certificates
document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-image');
        document.getElementById('certImage').src = imageSrc;
        document.getElementById('certModal').style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('certModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('certModal')) {
        document.getElementById('certModal').style.display = 'none';
    }
});




let swiper = new Swiper(".swiper-container",{
    slidesPerView:3,
    spaceBetween:30,
    grabCursor:true,
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    pagination:{
        el:".swiper-pagination",
        clickable:true,
        dynamicBullets:true
    }
});





//background//


