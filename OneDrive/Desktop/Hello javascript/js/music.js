(function() {
  // Create AudioContext for ambient music
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  
  if (!AudioContext) {
    console.log('Web Audio API not supported');
    return;
  }
  
  const audioContext = new AudioContext();
  let oscillators = [];
  let gainNodes = [];
  let isPlaying = false;
  
  // Pentatonic scale frequencies for calming ambient music (C major pentatonic)
  const baseFrequencies = [
    130.81, // C3
    146.83, // D3
    164.81, // E3
    196.00, // G3
    220.00, // A3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00  // A4
  ];
  
  // Create ambient pad sound
  function createPad(frequency, startTime, duration) {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'triangle';
    
    osc1.frequency.value = frequency;
    osc2.frequency.value = frequency * 1.005; // Slight detuning for richness
    osc3.frequency.value = frequency / 2; // Octave below
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    
    // Slow fade in and out
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.015, startTime + 3);
    gainNode.gain.setValueAtTime(0.015, startTime + duration - 3);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    
    // Add filter for warmth
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.5;
    
    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
    osc3.stop(startTime + duration);
    
    return { oscillators: [osc1, osc2, osc3], gainNode };
  }
  
  // Play ambient music loop
  function playAmbientMusic() {
    if (!isPlaying) return;
    
    const now = audioContext.currentTime;
    const patternDuration = 16; // 16 seconds per pattern
    
    // Create a gentle, evolving pattern
    const pattern = [
      { freq: baseFrequencies[0], delay: 0, duration: 12 },    // C3
      { freq: baseFrequencies[5], delay: 2, duration: 10 },    // C4
      { freq: baseFrequencies[3], delay: 4, duration: 12 },    // G3
      { freq: baseFrequencies[2], delay: 6, duration: 10 },    // E3
      { freq: baseFrequencies[7], delay: 8, duration: 8 },     // E4
      { freq: baseFrequencies[1], delay: 10, duration: 8 }     // D3
    ];
    
    pattern.forEach(note => {
      createPad(note.freq, now + note.delay, note.duration);
    });
    
    // Schedule next pattern
    setTimeout(() => playAmbientMusic(), patternDuration * 1000);
  }
  
  // Start music
  function startMusic() {
    if (isPlaying) return;
    
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    isPlaying = true;
    playAmbientMusic();
  }
  
  // Stop music
  function stopMusic() {
    isPlaying = false;
  }
  
  // Start on user interaction
  let started = false;
  
  function initMusic() {
    if (!started) {
      started = true;
      startMusic();
    }
  }
  
  // Auto-start on interaction
  document.addEventListener('click', initMusic, { once: true });
  document.addEventListener('keydown', initMusic, { once: true });
  
  // Try to auto-start (may not work due to autoplay policies)
  setTimeout(initMusic, 1000);
  
})();
