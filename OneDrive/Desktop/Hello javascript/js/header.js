/* Header interactivity module */

(function() {
  const header = document.querySelector('.site-header');
  const brand = document.querySelector('.site-brand');
  const sub = document.querySelector('.site-sub');
  
  if (!header || !brand || !sub) return;

  // Messages to cycle through
  const messages = [
    'I really appreciate your visit.',
    '✨ Welcome to my portfolio!',
    '💻 Let\'s build something great',
    '🚀 Innovation through code',
    '🎨 Design meets function',
    '💡 Ideas in motion',
    '⚡ Crafting digital experiences',
    '🌟 Creating excellence daily',
  ];

  let currentMessageIndex = 0;
  let clickCount = 0;

  // Click to change subtitle message
  header.addEventListener('click', (e) => {
    if (e.target === header || e.target === sub) {
      clickCount++;
      
      // Change message
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      sub.style.animation = 'none';
      
      // Trigger fade animation
      sub.style.opacity = '0';
      setTimeout(() => {
        sub.textContent = messages[currentMessageIndex];
        sub.style.animation = 'headerMessageFade 600ms ease-out forwards';
      }, 150);

      // Create sparkle effect
      createHeaderSparkles(e);
    }
  });

  // Hover animation for brand
  brand.addEventListener('mouseenter', () => {
    brand.style.animation = 'headerGlow 1s ease-in-out infinite';
  });

  brand.addEventListener('mouseleave', () => {
    brand.style.animation = 'none';
    brand.style.textShadow = '0 2px 12px rgba(0,0,0,0.6)';
  });

  // Create sparkle particles on header click
  function createHeaderSparkles(e) {
    const rect = header.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const colors = ['#00f5ff', '#ff00d6', '#39ff14'];
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = (i / 8) * Math.PI * 2;
      const speed = 2 + Math.random() * 2;
      const vel = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };

      particle.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 8px ${color};
        left: ${x}px;
        top: ${y}px;
        z-index: 98;
      `;

      document.body.appendChild(particle);

      let life = 50;
      const animate = () => {
        life--;
        x += vel.x;
        y += vel.y;
        vel.y += 0.08; // slight gravity
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = life / 50;

        if (life > 0) requestAnimationFrame(animate);
        else particle.remove();
      };
      animate();
    }
  }

  // Double-click to reveal easter egg
  let lastClickTime = 0;
  header.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      // Double click detected
      triggerHeaderEasterEgg();
    }
    lastClickTime = now;
  });

  function triggerHeaderEasterEgg() {
    brand.style.animation = 'headerRainbow 1s ease-in-out';
    
    // Show special message
    const specialMsg = '🎉 Thanks for clicking! 🎉';
    sub.textContent = specialMsg;
    sub.style.animation = 'headerMessageFade 600ms ease-out';
    
    setTimeout(() => {
      sub.textContent = messages[currentMessageIndex];
      sub.style.animation = 'headerMessageFade 600ms ease-out';
    }, 2000);
  }

  // Show initial hint
  const headerHint = document.createElement('div');
  if (!localStorage.getItem('headerHintShown')) {
    header.title = 'Click me for a new message! Double-click for fun! 🎨';
    localStorage.setItem('headerHintShown', 'true');
  }
})();
