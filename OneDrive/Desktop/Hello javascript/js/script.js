/* Professional greeting script
   - time-aware greeting (Good morning / afternoon / evening)
   - accessible focus handling
   - subtle animation using Web Animations API and CSS
*/

(function () {
  function getTimeGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning,';
    if (h < 18) return 'Good afternoon,';
    return 'Good evening,';
  }

  function greet(name) {
    const cleaned = name?.trim();
    const time = getTimeGreeting();
    if (cleaned) return `${time} ${cleaned}!`;
    return `${time} there!`;
  }

  const nameEl = document.getElementById('name');
  const btn = document.getElementById('greetBtn');
  const output = document.getElementById('output');

  function showGreeting(name) {
    const text = greet(name);
    const sub = 'Glad you stopped by — have a great day.';

    // build accessible output
    output.innerHTML = `
      <div class="greet-text fade-in">
        <div class="greet-main"><strong>${escapeHtml(text)}</strong></div>
        <div class="greet-sub">${escapeHtml(sub)}</div>
      </div>
    `;

    // subtle animation via Web Animations API (if supported)
    const el = output.querySelector('.greet-text');
    if (el && el.animate) {
      el.animate(
        [
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 360, easing: 'cubic-bezier(.2,.9,.2,1)' }
      );
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (s) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[s]);
    });
  }

  function spawnRockets() {
    const container = document.getElementById('frogContainer');
    if (!container) return;
    container.innerHTML = '';

    const rocketCount = Math.random() < 0.5 ? 2 : 3;
    for (let i = 0; i < rocketCount; i++) {
      const rocket = document.createElement('div');
      rocket.className = 'rocket';
      rocket.textContent = '🚀';
      rocket.style.left = Math.random() * 80 + 10 + '%';
      rocket.style.bottom = '-50px';
      container.appendChild(rocket);

      setTimeout(() => {
        rocket.style.transition = 'bottom 2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease';
        rocket.style.bottom = '120vh';
        rocket.style.opacity = '0';
      }, i * 300);
    }

    setTimeout(() => {
      container.innerHTML = '';
    }, 3000);
  }

  btn.addEventListener('click', () => {
    showGreeting(nameEl.value);
    spawnRockets();
    nameEl.focus();
    // replay the hop-in on the page title
    const title = document.getElementById('greet-title');
    if (title) {
      title.classList.remove('hop-in');
      void title.offsetWidth; // force reflow
      title.classList.add('hop-in');
    }
  });

  // Allow pressing Enter in the input to trigger the greeting
  nameEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });

  // small welcome message on load
  document.addEventListener('DOMContentLoaded', () => {
    const welcome = `${getTimeGreeting()} welcome!`;
    output.innerHTML = `
      <div class="greet-text fade-in">
        <div class="greet-main"><strong>${escapeHtml(welcome)}</strong></div>
        <div class="greet-sub">Type your name and press Greet.</div>
      </div>
    `;
    // add hop-in to the main page title when content loads
    const title = document.getElementById('greet-title');
    if (title) {
      title.classList.add('hop-in');
      // remove class after animation so it can be replayed later
      title.addEventListener('animationend', function onEnd() {
        title.classList.remove('hop-in');
        title.removeEventListener('animationend', onEnd);
      });
    }
  });

  // expose greet for other scripts if needed
  window.appGreet = greet;
})();