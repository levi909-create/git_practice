(function() {
  'use strict';

  const form = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  if (!form) return;

  // Particle burst effect for successful submission
  function createParticleBurst(x, y) {
    const colors = ['#00f5ff', '#ff00d6', '#39ff14', '#a89155'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 10px currentColor;
      `;
      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 3 + Math.random() * 4;
      const vel = {
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity
      };

      let life = 50;
      const animate = () => {
        if (life <= 0) {
          particle.remove();
          return;
        }

        vel.y += 0.15; // gravity
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);
        
        particle.style.left = (currentLeft + vel.x) + 'px';
        particle.style.top = (currentTop + vel.y) + 'px';
        particle.style.opacity = life / 50;

        life--;
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }
  }

  // Form submission handler
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      console.log('Form submitted:', formData);

      // Show success message
      formResponse.innerHTML = `
        <div class="success-message">
          <h3>✓ Message Sent!</h3>
          <p>Thanks for reaching out, ${formData.name}! I'll get back to you soon.</p>
        </div>
      `;
      formResponse.style.display = 'block';

      // Create particle burst at submit button
      const btnRect = submitBtn.getBoundingClientRect();
      createParticleBurst(
        btnRect.left + btnRect.width / 2,
        btnRect.top + btnRect.height / 2
      );

      // Reset form
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Hide success message after 5 seconds
      setTimeout(() => {
        formResponse.style.display = 'none';
      }, 5000);
    }, 1000);
  });

  // Add input animation effects
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

})();
