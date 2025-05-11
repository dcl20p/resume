document.addEventListener('DOMContentLoaded', () => {
  const fadeInSections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeInSections.forEach(section => {
    observer.observe(section);
  });
}); 