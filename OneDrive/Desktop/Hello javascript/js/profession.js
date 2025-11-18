/* Interactive demos for the profession page: Skill Reveal, Frog Playground, Typewriter */

(function () {
  const interactBtn = document.getElementById('interactBtn');
  const demoOutput = document.getElementById('demoOutput');
  const frogContainer = document.getElementById('frogContainer');
  const demoSelect = document.getElementById('demoSelect');

  let typewriterInterval = null;

  // Utility: clear running state
  function clearDemo() {
    frogContainer.innerHTML = '';
    demoOutput.innerHTML = '';
    if (typewriterInterval) clearInterval(typewriterInterval);
  }

  // Demo: Typewriter demo
  function runTypewriterDemo() {
    if (typewriterInterval) clearInterval(typewriterInterval);

    const messages = [
      'Building delightful user experiences.',
      'Writing clean, maintainable code.',
      'Delivering reliable web applications.',
    ];
    let idx = 0;

    demoOutput.innerHTML = `<div class="greet-text"><div id="typewriter" class="fade-in" style="min-height:24px"></div></div>`;
    const el = document.getElementById('typewriter');

    function typeText(text, cb) {
      el.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        if (i <= text.length) {
          el.textContent = text.substring(0, i++);
        } else {
          clearInterval(t);
          setTimeout(cb, 900);
        }
      }, 50);
      return t;
    }

    function next() {
      typewriterInterval = typeText(messages[idx], () => {
        idx = (idx + 1) % messages.length;
        next();
      });
    }

    next();
  }

  // Demo 4: Color Mixer (blend neon colors)
  function runColorDemo() {
    const colors = ['#00f5ff', '#ff00d6', '#39ff14', '#fbbf24'];
    let currentColorIdx = 0;

    demoOutput.innerHTML = `
      <div class="greet-text fade-in">
        <strong>Color Mixer</strong>
        <div id="colorBox" style="width:80px;height:80px;margin:12px 0;border-radius:8px;background:${colors[0]};box-shadow:0 0 20px ${colors[0]};transition:all 300ms ease;border:2px solid rgba(255,255,255,0.1);cursor:pointer;display:inline-block"></div>
        <div style="font-size:12px;color:var(--text-soft);margin-top:6px">Click the box to cycle colors!</div>
      </div>
    `;

    const box = document.getElementById('colorBox');
    if (box) {
      box.addEventListener('click', (e) => {
        e.stopPropagation();
        currentColorIdx = (currentColorIdx + 1) % colors.length;
        const newColor = colors[currentColorIdx];
        box.style.background = newColor;
        box.style.boxShadow = `0 0 30px ${newColor}`;
      });
    }
  }

  // Demo 5: Memory Game (flip tiles, match pairs)
  function runMemoryDemo() {
    const tiles = ['🚀', '💻', '🎨', '⚡', '🚀', '💻', '🎨', '⚡'];
    const shuffled = tiles.sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = 0;
    let canFlip = true;

    let html = `<div class="greet-text fade-in"><strong>Memory Game</strong><div style="font-size:12px;color:var(--text-soft);margin-top:4px">Match all pairs!</div></div>`;
    html += `<div id="gameBoard" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px">`;

    shuffled.forEach((tile, idx) => {
      html += `<div class="memory-tile" data-idx="${idx}" data-tile="${tile}" style="width:50px;height:50px;background:linear-gradient(90deg,var(--accent),var(--accent-2));border:1px solid rgba(0,245,255,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;user-select:none;transition:all 200ms">?</div>`;
    });
    html += '</div>';

    demoOutput.innerHTML = html;

    const tiles_els = document.querySelectorAll('.memory-tile');
    tiles_els.forEach(tile => {
      tile.addEventListener('click', (e) => {
        e.stopPropagation();
        if (tile.textContent !== '?' || flipped.length >= 2 || !canFlip) return;
        
        tile.textContent = tile.dataset.tile;
        tile.style.opacity = '0.7';
        flipped.push(tile);

        if (flipped.length === 2) {
          canFlip = false;
          if (flipped[0].dataset.tile === flipped[1].dataset.tile) {
            matched++;
            flipped[0].style.opacity = '1';
            flipped[1].style.opacity = '1';
            flipped = [];
            canFlip = true;
            if (matched === 4) {
              const board = document.getElementById('gameBoard');
              if (board) {
                board.innerHTML += '<div style="grid-column:1/-1;text-align:center;margin-top:8px;color:var(--accent);font-weight:700;font-size:14px">🎉 You won!</div>';
              }
            }
          } else {
            setTimeout(() => {
              flipped.forEach(t => {
                t.textContent = '?';
                t.style.opacity = '1';
              });
              flipped = [];
              canFlip = true;
            }, 600);
          }
        }
      });
    });
  }

  // Demo 6: Particle Burst (animated particles on click)
  function runParticleDemo() {
    demoOutput.innerHTML = `
      <div class="greet-text fade-in">
        <strong>Particle Burst</strong>
        <div style="font-size:12px;color:var(--text-soft);margin-top:4px">Click anywhere in this box to create particle burst!</div>
      </div>
    `;

    const container = demoOutput;

    function createParticles(x, y) {
      const colors = ['#00f5ff', '#ff00d6', '#39ff14'];
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / 12) * Math.PI * 2;
        const vel = { x: Math.cos(angle) * 3, y: Math.sin(angle) * 3 };

        particle.style.cssText = `
          position: fixed;
          width: 6px;
          height: 6px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 8px ${color};
          left: ${x}px;
          top: ${y}px;
          z-index: 100;
        `;

        document.body.appendChild(particle);

        let life = 50;
        const animate = () => {
          life--;
          x += vel.x;
          y += vel.y;
          vel.y += 0.1; // gravity
          particle.style.left = x + 'px';
          particle.style.top = y + 'px';
          particle.style.opacity = life / 50;

          if (life > 0) requestAnimationFrame(animate);
          else particle.remove();
        };
        animate();
      }
    }

    container.addEventListener('click', (e) => {
      if (e.target !== container && !container.contains(e.target)) return;
      createParticles(e.clientX, e.clientY);
    });
  }

  // Dispatch selected demo
  function runSelectedDemo() {
    clearDemo();
    const sel = demoSelect?.value || 'typewriter';
    demoOutput.classList.remove('hidden');

    if (sel === 'typewriter') runTypewriterDemo();
    else if (sel === 'color') runColorDemo();
    else if (sel === 'memory') runMemoryDemo();
    else if (sel === 'particles') runParticleDemo();
  }

  // Run button
  interactBtn.addEventListener('click', runSelectedDemo);

  // Optional: run when selection changes
  demoSelect.addEventListener('change', () => {
    // clear previous demo visuals
    clearDemo();
    demoOutput.classList.add('hidden');
  });

  // Click outside frogs clears them
  document.addEventListener('click', (e) => {
    if (!frogContainer.contains(e.target) && !demoOutput.contains(e.target)) {
      frogContainer.innerHTML = '';
    }
  });
})();
