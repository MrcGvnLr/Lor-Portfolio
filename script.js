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
    //smooth scrolling

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

    // Animate proficiency bars on scroll
    const proficiencyBars = document.querySelectorAll('.proficiency-bar');
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


