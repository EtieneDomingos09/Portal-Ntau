// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.toggle("active");
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  mobileNav.classList.remove("active");
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-item h3");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const suffix = counter.textContent.replace(/[0-9]/g, "");
    let current = 0;
    const increment = target / 50;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// FAQ Toggle
function toggleFaq(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Form submission
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const service = formData.get("service");

  // Create WhatsApp message
  const message = `Olá! Meu nome é ${name}.
            
Gostaria de solicitar informações sobre: ${service}
            
Telefone para contato: ${phone}
            
Mensagem: ${formData.get("message")}`;

  const whatsappUrl = `https://wa.me/244999999999?text=${encodeURIComponent(
    message
  )}`;

  // Show success message
  alert("Redirecionando para WhatsApp...");
  window.open(whatsappUrl, "_blank");

  // Reset form
  event.target.reset();
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileNav = document.getElementById("mobileNav");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  if (!mobileNav.contains(e.target) && !mobileBtn.contains(e.target)) {
    mobileNav.classList.remove("active");
  }
});
