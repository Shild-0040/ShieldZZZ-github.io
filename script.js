document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Typewriter Effect ---
    const roles = ['Developer', 'Designer', 'Creator', 'Problem Solver'];
    const typeWriterElement = document.getElementById('typewriter');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing word
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start the typing loop
    typeWriter();

    // --- Scroll Animation (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // --- Copy Email Functionality ---
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text').innerText;
    const tooltip = document.getElementById('copy-feedback');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // --- Update Copyright Year ---
    document.getElementById('year').textContent = new Date().getFullYear();
});
