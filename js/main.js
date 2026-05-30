// TaskPex — main.js
// Deep link handler: tries to open app, falls back to Play Store

const PACKAGE = "com.app.taskpex";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=" + PACKAGE;
const APP_HOST = "https://taskpexapp.netlify.app";

function openOrDownload() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  // Build intent URL (Android deep link)
  let path = APP_HOST + "/ref";
  if (ref) path += "?code=" + encodeURIComponent(ref);

  const intent = "intent://" + path.replace("https://", "") +
    "#Intent;scheme=https;package=" + PACKAGE + ";end;";

  window.location.href = intent;

  // Fallback to Play Store after 2.5s if app not installed
  setTimeout(() => {
    window.location.href = PLAY_STORE;
  }, 2500);
}

// Wire up all CTA buttons
document.addEventListener("DOMContentLoaded", () => {
  [
    "navOpenBtn", "mobileOpenBtn", "heroOpenBtn",
    "earnOpenBtn", "screenshotsOpenBtn", "downloadOpenBtn"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", e => {
        e.preventDefault();
        openOrDownload();
      });
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar && navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  if (mobileMenu && hamburger) {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
  }
}

hamburger && hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu && mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Close mobile menu when a link is tapped
mobileMenu && mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", closeMobileMenu);
});

// Close mobile menu on outside click
document.addEventListener("click", (e) => {
  if (mobileMenu && mobileMenu.classList.contains("open")) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// Close mobile menu on scroll
window.addEventListener("scroll", () => {
  if (mobileMenu && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  }
});

// FAQ accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const span = btn.querySelector("span");
  const isOpen = answer.classList.contains("open");
  document.querySelectorAll(".faq-a").forEach(a => a.classList.remove("open"));
  document.querySelectorAll(".faq-q span").forEach(s => s.textContent = "+");
  if (!isOpen) {
    answer.classList.add("open");
    span.textContent = "−";
  }
}

// Spin wheel demo
let spinning = false;
let totalRotation = 0;
const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("demoWheel");

spinBtn && spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  spinBtn.textContent = "SPINNING...";
  spinBtn.disabled = true;
  const extra = 1440 + Math.floor(Math.random() * 360);
  totalRotation += extra;
  wheel.style.transform = "rotate(" + totalRotation + "deg)";
  setTimeout(() => {
    spinning = false;
    spinBtn.textContent = "SPIN NOW";
    spinBtn.disabled = false;
  }, 3200);
});

// Auto-scroll screenshots carousel
const carousel = document.getElementById("carousel");
let carouselPos = 0;
if (carousel) {
  setInterval(() => {
    carouselPos += 240;
    if (carouselPos >= carousel.scrollWidth - carousel.clientWidth) carouselPos = 0;
    carousel.scrollTo({ left: carouselPos, behavior: "smooth" });
  }, 3000);
}

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  ".feature-card, .step-card, .testi-card, .earn-row"
).forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});
