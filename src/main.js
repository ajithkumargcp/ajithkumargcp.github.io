// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const html = document.documentElement;
const body = document.body;

function setTheme(isDark) {
    if (isDark) {
        html.classList.add('dark');
        body.classList.remove('light');
        body.classList.add('bg-dark-bg', 'text-dark-text');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        body.classList.add('light');
        body.classList.remove('bg-dark-bg', 'text-dark-text');
        body.classList.add('bg-light-bg', 'text-light-text');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = !html.classList.contains('dark');
    setTheme(isDark);
});

// Scroll Header Logic
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-dark-bg/80', 'backdrop-blur-md', 'border-[#1e293b]');
        header.classList.remove('border-transparent');
    } else {
        header.classList.remove('bg-dark-bg/80', 'backdrop-blur-md', 'border-[#1e293b]');
        header.classList.add('border-transparent');
    }
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-4');
    observer.observe(el);
});

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
