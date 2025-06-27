window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
  // Scroll observer to re-trigger animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-content').forEach(el => {
    observer.observe(el);
  });

 const cursor = document.querySelector('.cursor-highlight');

// Move the circle with the cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  cursor.style.opacity = 1; // just in case it reappears quickly
});

// Hide when cursor leaves the screen
// Hide when the mouse leaves the viewport
window.addEventListener('mouseout', (e) => {
  if (!e.relatedTarget && !e.toElement) {
    cursor.style.opacity = 0;
  }
});

// Show again when it comes back
window.addEventListener('mouseover', () => {
  cursor.style.opacity = 1;
});

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.section').forEach(section => {
  const wrapper = section.querySelector('.bg-wrapper');
  const bg = section.querySelector('.section-bg');

  // Parallax (translateY on wrapper)
  gsap.to(wrapper, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Zoom (scale on bg)
  gsap.to(bg, {
  scale: 1.05,
  duration: 6,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true
});
});


;});
