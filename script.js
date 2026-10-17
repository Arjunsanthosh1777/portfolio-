document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const flowSelector = [
  '.intro .eyebrow',
  '.intro h1',
  '.intro-bottom',
  '.section-heading',
  '.about-content',
  '.project-card .project-info',
  '.project-card .project-visual',
  '.mini-projects article',
  '.skill-list li',
  '.education',
  '.life-grid article',
  '.contact-copy',
  '.contact-image'
].join(', ');
const flowItems = [...document.querySelectorAll(flowSelector)];

const flowDelayByParent = new Map();
flowItems.forEach(item => {
  const parent = item.parentElement;
  const index = flowDelayByParent.get(parent) || 0;
  item.classList.add('flow-item');
  item.style.setProperty('--flow-delay', `${Math.min(index * 90, 360)}ms`);
  flowDelayByParent.set(parent, index + 1);
});

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('in'));
  flowItems.forEach(item => item.classList.add('flow-in'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));

  const flowObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('flow-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  flowItems.forEach(item => flowObserver.observe(item));
}

const navLinks = [...document.querySelectorAll('.nav-links a')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('on', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionObserver.observe(section);
  });
}
