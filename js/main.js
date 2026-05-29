// TaskPex — main.js

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// FAQ accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const span = btn.querySelector('span');
  const isOpen = answer.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q span').forEach(s => s.textContent = '+');
  if (!isOpen) {
    answer.classList.add('open');
    span.textContent = '−';
  }
}

// Referral code copy
function copyCode() {
  const code = document.getElementById('rcCode')?.textContent || 'GRO996';
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.rc-copy');
    if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => btn.textContent = '📋 Copy', 2000); }
  });
}

// Spin wheel demo
let spinning = false;
let totalRotation = 0;
const spinBtn = document.getElementById('spinBtn');
const wheel = document.getElementById('demoWheel');

spinBtn?.addEventListener('click', () => {
  if (spinning) return;
  spinning = true;
  spinBtn.textContent = 'SPINNING...';
  spinBtn.disabled = true;
  const extra = 1440 + Math.floor(Math.random() * 360);
  totalRotation += extra;
  wheel.style.transform = `rotate(${totalRotation}deg)`;
  setTimeout(() => {
    spinning = false;
    spinBtn.textContent = 'SPIN NOW';
    spinBtn.disabled = false;
  }, 3200);
});

// Screenshots dot navigation
let currentSlide = 0;
function goToSlide(index) {
  const track = document.getElementById('screenshotsTrack');
  const dots = document.querySelectorAll('.ss-dot');
  const phones = document.querySelectorAll('.ss-phone');
  if (!track || !phones.length) return;
  currentSlide = index;
  const phoneWidth = phones[0].offsetWidth + 32; // width + gap
  const trackCenter = track.parentElement.offsetWidth / 2;
  const offset = phoneWidth * index - trackCenter + phoneWidth / 2;
  track.style.transform = `translateX(-${Math.max(0, offset)}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step-card, .testi-card, .earn-row, .ss-phone').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

