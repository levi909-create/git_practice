/* Footer interactivity module */

(function() {
  const footer = document.querySelector('footer.muted');
  const small = footer?.querySelector('small');
  
  if (!footer || !small) return;

  // Click to show easter egg messages
  let clickCount = 0;
  const messages = [
    '👋 Thanks for visiting!',
    '💻 Built with passion & code',
    '✨ Every pixel matters',
    '🚀 Always learning & improving',
    '💡 Ideas become reality here',
    '🎯 Quality over everything',
    '🌟 Made with ❤️',
    '🎨 Design & function unite',
    '⚡ Performance is key',
    '🏆 Excellence is the goal',
  ];

  footer.addEventListener('click', () => {
    clickCount++;
    
    // Create particle burst on click
    createFooterBurst(event);
    
    // Change message every 3 clicks
    if (clickCount % 3 === 0) {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      small.textContent = randomMsg;
      small.style.animation = 'none';
      setTimeout(() => {
        small.style.animation = 'footerPop 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, 10);
    }
  });

  // Mouse over animation
  footer.addEventListener('mouseenter', () => {
    small.style.animation = 'footerGlow 2s ease-in-out infinite';
  });

  footer.addEventListener('mouseleave', () => {
    small.style.animation = 'none';
  });

  // Create particle burst effect
  function createFooterBurst(e) {
    const rect = footer.getBoundingClientRect();
    const x = e?.clientX || rect.left + rect.width / 2;
    const y = rect.top - 10;

    const colors = ['#00f5ff', '#ff00d6', '#39ff14'];
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = (i / 6) * Math.PI * 2;
      const vel = { x: Math.cos(angle) * 2.5, y: Math.sin(angle) * 2.5 - 1 };

      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 6px ${color};
        left: ${x}px;
        top: ${y}px;
        z-index: 99;
      `;

      document.body.appendChild(particle);

      let life = 40;
      const animate = () => {
        life--;
        x += vel.x;
        y += vel.y;
        vel.y += 0.15; // gravity
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = life / 40;

        if (life > 0) requestAnimationFrame(animate);
        else particle.remove();
      };
      animate();
    }
  }

  // Optional: Show instructions on first visit
  if (!localStorage.getItem('visitedBefore')) {
    small.title = 'Click me for a surprise! 🎁';
    localStorage.setItem('visitedBefore', 'true');
  }
})();
