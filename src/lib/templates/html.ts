import type { IGeneratedFile, IDesignContext, Architecture, StateManagement } from '../types.js';
import { generateFontImportHtml } from './css-variables.js';

/**
 * Generate a complete HTML project with vanilla JS
 * @param projectName - Name of the project
 * @param _architecture - Reserved for future use: architecture pattern selection
 * @param _stateManagement - Reserved for future use: state management approach
 * @param designContext - Optional design context for styling
 * @param year - Optional year for footer copyright (defaults to current year)
 * @returns Array of generated files
 */
export function generateHtmlProject(
  projectName: string,
  _architecture: Architecture,
  _stateManagement: StateManagement,
  designContext?: IDesignContext,
  year?: number
): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];
  const ctx = designContext;

  const fontLinks = generateFontImportHtml(ctx);
  const fontFamily = ctx?.typography?.fontFamily ?? 'Inter, system-ui, sans-serif';

  const primaryColor = ctx?.colorPalette?.primary ?? '#2563eb';
  const primaryFg = ctx?.colorPalette?.primaryForeground ?? '#ffffff';
  const bgColor = ctx?.colorPalette?.background ?? '#ffffff';
  const fgColor = ctx?.colorPalette?.foreground ?? '#0f172a';
  const mutedColor = ctx?.colorPalette?.muted ?? '#f1f5f9';
  const mutedFg = ctx?.colorPalette?.mutedForeground ?? '#64748b';
  const borderColor = ctx?.colorPalette?.border ?? '#e2e8f0';
  const accentColor = ctx?.colorPalette?.accent ?? '#f1f5f9';
  const destructiveColor = ctx?.colorPalette?.destructive ?? '#ef4444';
  const secondaryColor = ctx?.colorPalette?.secondary ?? '#f1f5f9';
  const secondaryFg = ctx?.colorPalette?.secondaryForeground ?? '#0f172a';

  // index.html
  files.push({
    path: `${projectName}/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${projectName} — Modern web application" />
  <meta name="theme-color" content="${primaryColor}" />
  <title>${projectName}</title>
  ${fontLinks}
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Header -->
  <header class="header" role="banner">
    <nav class="nav container" aria-label="Main navigation">
      <a href="/" class="nav__logo">${projectName}</a>
      <ul class="nav__links" role="menubar">
        <li role="none"><a href="#features" role="menuitem" class="nav__link">Features</a></li>
        <li role="none"><a href="#about" role="menuitem" class="nav__link">About</a></li>
        <li role="none"><a href="#contact" role="menuitem" class="nav__link">Contact</a></li>
      </ul>
      <button type="button" class="nav__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </nav>
  </header>

  <!-- Main Content -->
  <main id="main-content" role="main">
    <!-- Hero Section -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="container hero__inner">
        <span class="hero__badge">Now in Beta</span>
        <h1 id="hero-heading" class="hero__title">${projectName}</h1>
        <p class="hero__subtitle">A modern, responsive web application built with vanilla HTML, CSS, and JavaScript.</p>
        <div class="hero__actions">
          <a href="#features" class="btn btn--primary">Get Started</a>
          <a href="#about" class="btn btn--outline">Learn More</a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features" aria-labelledby="features-heading">
      <div class="container">
        <h2 id="features-heading" class="section-title">Features</h2>
        <p class="section-subtitle">Powerful features to help your team deliver exceptional results.</p>
        <div class="features__grid">
          <article class="card">
            <div class="card__icon">1</div>
            <h3 class="card__title">Responsive Design</h3>
            <p class="card__text">Looks great on every screen size, from mobile to desktop.</p>
          </article>
          <article class="card">
            <div class="card__icon">2</div>
            <h3 class="card__title">Accessible</h3>
            <p class="card__text">Built with ARIA landmarks, keyboard navigation, and semantic HTML.</p>
          </article>
          <article class="card">
            <div class="card__icon">3</div>
            <h3 class="card__title">Performant</h3>
            <p class="card__text">Zero dependencies. Fast load times. No build step required.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about" aria-labelledby="about-heading">
      <div class="container">
        <h2 id="about-heading" class="section-title">About</h2>
        <p class="about__text">
          ${projectName} is a modern vanilla HTML/CSS/JS starter that follows best practices
          for accessibility, performance, and maintainability. No frameworks, no build tools —
          just clean, semantic code.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact" aria-labelledby="contact-heading">
      <div class="container">
        <h2 id="contact-heading" class="section-title">Contact</h2>
        <form class="contact__form" aria-label="Contact form" novalidate>
          <div class="form-group">
            <label for="contact-name" class="form-label">Name</label>
            <input id="contact-name" name="name" type="text" required aria-required="true" class="form-input" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="contact-email" class="form-label">Email</label>
            <input id="contact-email" name="email" type="email" required aria-required="true" class="form-input" placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label for="contact-message" class="form-label">Message</label>
            <textarea id="contact-message" name="message" rows="4" required aria-required="true" class="form-input form-textarea" placeholder="Your message"></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--full">Send Message</button>
        </form>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">
      <p class="footer__copy">&copy; ${year ?? new Date().getFullYear()} ${projectName}. All rights reserved.</p>
      <nav aria-label="Footer navigation">
        <ul class="footer__links">
          <li><a href="#" class="footer__link">Privacy</a></li>
          <li><a href="#" class="footer__link">Terms</a></li>
        </ul>
      </nav>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
`,
  });

  // css/style.css
  files.push({
    path: `${projectName}/css/style.css`,
    content: `/* ===========================
   CSS Custom Properties
   =========================== */
:root {
  --color-primary: ${primaryColor};
  --color-primary-fg: ${primaryFg};
  --color-secondary: ${secondaryColor};
  --color-secondary-fg: ${secondaryFg};
  --color-background: ${bgColor};
  --color-foreground: ${fgColor};
  --color-muted: ${mutedColor};
  --color-muted-fg: ${mutedFg};
  --color-border: ${borderColor};
  --color-accent: ${accentColor};
  --color-destructive: ${destructiveColor};
  --font-family: ${fontFamily};
  --font-family-heading: ${ctx?.typography?.headingFont ?? fontFamily};
  --radius-sm: ${ctx?.borderRadius?.sm ?? '0.25rem'};
  --radius-md: ${ctx?.borderRadius?.md ?? '0.375rem'};
  --radius-lg: ${ctx?.borderRadius?.lg ?? '0.5rem'};
  --shadow-sm: ${ctx?.shadows?.sm ?? '0 1px 2px 0 rgb(0 0 0 / 0.05)'};
  --shadow-md: ${ctx?.shadows?.md ?? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'};
  --shadow-lg: ${ctx?.shadows?.lg ?? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'};
  --spacing-unit: ${ctx?.spacing?.unit ?? 4}px;
  --container-max: 1200px;
  --header-height: 3.5rem;
}

/* ===========================
   Reset & Base
   =========================== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-foreground);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--color-foreground);
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

ul {
  list-style: none;
}

/* ===========================
   Skip Link (Accessibility)
   =========================== */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-primary-fg);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  z-index: 100;
  font-weight: 500;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 1rem;
}

/* ===========================
   Layout
   =========================== */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: 1rem;
}

@media (min-width: 640px) {
  .container { padding-inline: 1.5rem; }
}

@media (min-width: 1024px) {
  .container { padding-inline: 2rem; }
}

/* ===========================
   Header & Navigation
   =========================== */
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-background) 95%, transparent);
  backdrop-filter: blur(8px);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

.nav__logo {
  font-size: 1.125rem;
  font-weight: 700;
  font-family: var(--font-family-heading);
  color: var(--color-foreground);
}

.nav__links {
  display: none;
  gap: 1.5rem;
}

.nav__link {
  font-size: 0.875rem;
  color: var(--color-muted-fg);
  transition: color 0.15s ease;
}

.nav__link:hover {
  color: var(--color-foreground);
}

.nav__toggle {
  display: flex;
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-foreground);
}

.nav__toggle:hover {
  background: var(--color-accent);
}

@media (min-width: 640px) {
  .nav__links { display: flex; }
  .nav__toggle { display: none; }
}

/* ===========================
   Hero
   =========================== */
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.hero__inner {
  text-align: center;
  max-width: 48rem;
  margin-inline: auto;
}

.hero__badge {
  display: inline-block;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.hero__title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.hero__subtitle {
  margin-top: 1.5rem;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-muted-fg);
  max-width: 36rem;
  margin-inline: auto;
  line-height: 1.7;
}

.hero__actions {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

/* ===========================
   Buttons
   =========================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  text-decoration: none;
  line-height: 1.5;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-fg);
  border-color: var(--color-primary);
}

.btn--primary:hover {
  opacity: 0.9;
  color: var(--color-primary-fg);
}

.btn--outline {
  background: var(--color-background);
  color: var(--color-foreground);
  border-color: var(--color-border);
}

.btn--outline:hover {
  background: var(--color-accent);
  color: var(--color-foreground);
}

.btn--full {
  width: 100%;
}

@media (min-width: 640px) {
  .btn { padding: 0.75rem 2rem; }
}

/* ===========================
   Sections
   =========================== */
.section-title {
  font-family: var(--font-family-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  text-align: center;
}

.section-subtitle {
  margin-top: 0.75rem;
  text-align: center;
  color: var(--color-muted-fg);
  max-width: 32rem;
  margin-inline: auto;
}

/* Features */
.features {
  padding: 4rem 0;
}

.features__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}

@media (min-width: 640px) {
  .features__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .features__grid { grid-template-columns: repeat(3, 1fr); }
}

/* Card */
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: var(--color-background);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card__icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 1rem;
}

.card__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card__text {
  font-size: 0.875rem;
  color: var(--color-muted-fg);
  line-height: 1.6;
}

/* About */
.about {
  padding: 4rem 0;
  background: var(--color-muted);
}

.about__text {
  margin-top: 1.5rem;
  max-width: 40rem;
  margin-inline: auto;
  text-align: center;
  color: var(--color-muted-fg);
  line-height: 1.8;
}

/* Contact */
.contact {
  padding: 4rem 0;
}

.contact__form {
  max-width: 32rem;
  margin: 2rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ===========================
   Form Elements
   =========================== */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.form-input {
  height: 2.5rem;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: inherit;
  background: var(--color-background);
  color: var(--color-foreground);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input::placeholder {
  color: var(--color-muted-fg);
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
  outline: none;
}

.form-textarea {
  height: auto;
  resize: vertical;
  min-height: 6rem;
}

/* ===========================
   Footer
   =========================== */
.footer {
  border-top: 1px solid var(--color-border);
  padding: 2rem 0;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer__copy {
  font-size: 0.875rem;
  color: var(--color-muted-fg);
}

.footer__links {
  display: flex;
  gap: 1rem;
}

.footer__link {
  font-size: 0.875rem;
  color: var(--color-muted-fg);
}

.footer__link:hover {
  color: var(--color-foreground);
}

@media (min-width: 640px) {
  .footer__inner {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* ===========================
   Dark Mode (prefers-color-scheme)
   =========================== */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-foreground: #f1f5f9;
    --color-muted: #1e293b;
    --color-muted-fg: #94a3b8;
    --color-border: #334155;
    --color-accent: #1e293b;
  }
}
`,
  });

  // js/main.js
  files.push({
    path: `${projectName}/js/main.js`,
    content: `// ${projectName} — Main JavaScript
// Vanilla JS with no dependencies

(function () {
  'use strict';

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.style.display = isExpanded ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = 'var(--header-height)';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.padding = '1rem';
      navLinks.style.background = 'var(--color-background)';
      navLinks.style.borderBottom = '1px solid var(--color-border)';

      if (isExpanded) {
        navLinks.removeAttribute('style');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Set focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Contact form handling
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Basic client-side validation
      var isValid = true;
      this.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.setAttribute('aria-invalid', 'true');
          isValid = false;
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      if (!isValid) {
        var firstInvalid = this.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Replace with actual submission logic
      console.log('Form submitted:', data);
      alert('Thank you for your message!');
      this.reset();
    });
  }

  // Intersection Observer for scroll animations
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.card, .about__text, .contact__form').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // Handle .is-visible class
  var style = document.createElement('style');
  style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
})();
`,
  });

  // README.md
  files.push({
    path: `${projectName}/README.md`,
    content: `# ${projectName}

A modern vanilla HTML/CSS/JavaScript starter — no frameworks, no build tools.

## Getting Started

1. Open \`index.html\` in your browser, or
2. Use a local server:

\`\`\`bash
# Python
python3 -m http.server 3000

# Node.js (npx)
npx serve .
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles with CSS custom properties
├── js/
│   └── main.js         # Vanilla JavaScript
└── README.md
\`\`\`

## Features

- **Zero dependencies** — no npm, no build step
- **Responsive** — mobile-first with CSS Grid and Flexbox
- **Accessible** — ARIA landmarks, skip link, keyboard navigation, semantic HTML
- **Dark mode** — automatic via \`prefers-color-scheme\`
- **CSS custom properties** — easy theming via variables
- **Scroll animations** — Intersection Observer for reveal effects
`,
  });

  return files;
}
