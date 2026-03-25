// ===== Navbar: add/remove scrolled class =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile hamburger menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const expanded = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', expanded);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Scroll-reveal =====
const revealElements = document.querySelectorAll(
  '#about, #projects .project-card, #skills .skill-category, #contact-form'
);
revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.revealIndex = i;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.revealIndex) * 100;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== Skill bar animation =====
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          const level = bar.dataset.level;
          bar.style.width = level + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// ===== Contact form (client-side demo) =====
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate async send
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    showStatus('Thanks! Your message has been sent. I\'ll get back to you soon.', 'success');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1200);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
