/* ==========================================================================
   POSINA SIVA SAI VENKAT - HAND-DRAWN SKETCH PORTFOLIO JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initThemeToggle();
  initAudioSynth();
  initProjectFilters();
  initElectrospinningSim();
  initScaffoldSim();
  initDroneCADSim();
  initCaliperSim();
  initResumeModal();
  initContactForm();
});

/* ==========================================================================
   1. FAINT CHARCOAL GRAPHITE BACKGROUND CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('sketch-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 1.2 + 0.6;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--border-color').trim();
      ctx.globalAlpha = 0.15;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 22000);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const strokeColor = getComputedStyle(document.body).getPropertyValue('--border-color').trim();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = (1 - dist / 80) * 0.08;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. LIGHT / DARK SKETCH MODE TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('sketch-theme') || 'light';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('sketch-theme', newTheme);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      icon.textContent = '☀️';
      text.textContent = 'LIGHT SKETCH';
    } else {
      icon.textContent = '🌙';
      text.textContent = 'DARK SKETCH';
    }
  }
}

/* ==========================================================================
   3. AUDIO SYNTH (OPTIONAL PENCIL FX)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudioSynth() {
  const soundBtn = document.getElementById('sound-toggle');
  const icon = document.getElementById('sound-icon');

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    icon.textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled && !audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  });

  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', () => {
      if (soundEnabled && audioCtx) playPencilSound();
    });
  });
}

function playPencilSound() {
  if (!audioCtx) return;
  try {
    const bufferSize = audioCtx.sampleRate * 0.05;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;

    whiteNoise.connect(filter);
    filter.connect(audioCtx.destination);
    whiteNoise.start();
  } catch (e) {}
}

/* ==========================================================================
   4. PROJECT CATEGORY FILTER PILLS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-sketch-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || filterVal === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. ELECTROSPINNING SIMULATOR
   ========================================================================== */
function initElectrospinningSim() {
  const canvas = document.getElementById('electrospinning-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const voltageInput = document.getElementById('voltage-input');
  const voltageVal = document.getElementById('voltage-val');
  const fiberOutput = document.getElementById('fiber-diameter-output');

  function update() {
    const voltage = parseFloat(voltageInput.value);
    voltageVal.textContent = voltage;

    const diameter = (280 - (voltage * 4.2)).toFixed(1);
    fiberOutput.textContent = `${diameter} nm`;

    render(voltage, diameter);
  }

  voltageInput.addEventListener('input', update);

  function render(voltage, diameter) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, w, h);

    // Emitter needle
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(20, h / 2 - 4, 30, 8);

    // Collector
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(w - 25, 15, 8, h - 30);

    // Fibers
    ctx.strokeStyle = '#F8FAFC';
    ctx.lineWidth = Math.max(0.8, (diameter / 160));

    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(50, h / 2);
      
      let curX = 50;
      let curY = h / 2;
      const steps = 12;
      const stepW = (w - 75) / steps;

      for (let s = 1; s <= steps; s++) {
        curX += stepW;
        const amp = (s / steps) * (voltage * 0.8);
        curY = h / 2 + Math.sin(s * 0.9 + Date.now() * 0.006 + i) * amp;
        ctx.lineTo(curX, curY);
      }
      ctx.globalAlpha = 0.75;
      ctx.stroke();
    }
  }
  update();
}

/* ==========================================================================
   6. BONE SCAFFOLD SIMULATOR
   ========================================================================== */
function initScaffoldSim() {
  const canvas = document.getElementById('scaffold-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const porosityInput = document.getElementById('porosity-input');
  const porosityVal = document.getElementById('porosity-val');
  const stiffnessVal = document.getElementById('stiffness-val');
  const weightRedVal = document.getElementById('weight-red-val');

  function update() {
    const porosity = parseFloat(porosityInput.value);
    porosityVal.textContent = porosity;
    weightRedVal.textContent = `${porosity.toFixed(1)}%`;

    const estStiffness = (14.0 * Math.pow((1 - porosity / 100), 2)).toFixed(2);
    stiffnessVal.textContent = `${estStiffness} GPa`;

    render(porosity);
  }

  porosityInput.addEventListener('input', update);

  function render(porosity) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, w, h);

    const strokeWidth = Math.max(1, (100 - porosity) / 12);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = strokeWidth;

    const gridSize = 25;
    for (let x = 40; x < w - 40; x += gridSize) {
      for (let y = 20; y < h - 20; y += gridSize) {
        ctx.strokeRect(x, y, gridSize - 4, gridSize - 4);
      }
    }
  }
  update();
}

/* ==========================================================================
   7. DRONE CAD SIMULATOR
   ========================================================================== */
function initDroneCADSim() {
  const canvas = document.getElementById('drone-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const rotateBtn = document.getElementById('drone-rotate-btn');
  const explodedBtn = document.getElementById('drone-exploded-btn');
  const stressBtn = document.getElementById('drone-stress-btn');

  let autoRotate = true;
  let exploded = false;
  let stressMode = false;
  let rotX = 0.5, rotY = 0.5;

  rotateBtn.addEventListener('click', () => {
    autoRotate = !autoRotate;
    rotateBtn.classList.toggle('solid-black-btn', autoRotate);
  });

  explodedBtn.addEventListener('click', () => {
    exploded = !exploded;
    explodedBtn.classList.toggle('solid-black-btn', exploded);
  });

  stressBtn.addEventListener('click', () => {
    stressMode = !stressMode;
    stressBtn.classList.toggle('solid-black-btn', stressMode);
  });

  const baseNodes = [
    {x: -50, y: -15, z: -15}, {x: 50, y: -15, z: -15},
    {x: 50, y: 15, z: -15}, {x: -50, y: 15, z: -15},
    {x: -50, y: -15, z: 15}, {x: 50, y: -15, z: 15},
    {x: 50, y: 15, z: 15}, {x: -50, y: 15, z: 15},
    {x: 75, y: -25, z: 0}, {x: 75, y: 25, z: 0}, {x: 100, y: 0, z: 0}
  ];

  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7],
    [1,8], [2,9], [8,10], [9,10]
  ];

  function render() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, w, h);

    if (autoRotate) rotY += 0.015;

    const projected = baseNodes.map((p, idx) => {
      let x = p.x + (exploded && idx >= 8 ? 20 : 0);
      let y = p.y;
      let z = p.z;

      let cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      let cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      const scale = 180 / (180 + z2);
      return { x: w / 2 + x1 * scale, y: h / 2 + y2 * scale };
    });

    edges.forEach((edge, i) => {
      const p1 = projected[edge[0]];
      const p2 = projected[edge[1]];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = stressMode ? (i > 11 ? '#EF4444' : '#3B82F6') : '#38BDF8';
      ctx.lineWidth = stressMode && i > 11 ? 2.5 : 1.2;
      ctx.stroke();
    });

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   8. VERNIER CALIPER SIMULATOR
   ========================================================================== */
function initCaliperSim() {
  const canvas = document.getElementById('caliper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const slider = document.getElementById('caliper-slider');
  const caliperVal = document.getElementById('caliper-val');
  const statusBadge = document.getElementById('insp-status-badge');

  function update() {
    const pos = parseFloat(slider.value);
    caliperVal.textContent = pos.toFixed(3);

    const diff = Math.abs(pos - 12.500);
    if (diff <= 0.050) {
      statusBadge.textContent = 'PASS [WITHIN TOLERANCE]';
      statusBadge.style.color = '#16A34A';
    } else {
      statusBadge.textContent = `REJECT [DEV: ${(pos - 12.500).toFixed(3)} mm]`;
      statusBadge.style.color = '#DC2626';
    }

    render(pos);
  }

  slider.addEventListener('input', update);

  function render(val) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, w, h);

    // Main beam
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(15, 45, w - 30, 18);

    // Fixed jaw
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(25, 30, 12, 70);

    // Sliding jaw
    const jawX = 25 + 12 + (val * 9);
    ctx.fillStyle = '#64748B';
    ctx.fillRect(jawX, 30, 15, 70);

    // Cylinder
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(37, 52, val * 9, 30);

    // Digital readout
    ctx.font = '12px "Space Mono", monospace';
    ctx.fillStyle = '#4ADE80';
    ctx.textAlign = 'center';
    ctx.fillText(`${val.toFixed(3)} mm`, w / 2, 25);
  }
  update();
}

/* ==========================================================================
   9. MODAL & CONTACT FORM
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('close-modal-btn');

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;

    feedback.style.display = 'block';
    feedback.style.padding = '0.8rem';
    feedback.style.marginTop = '0.8rem';
    feedback.style.border = '1.5px solid var(--border-color)';
    feedback.style.borderRadius = '8px';
    feedback.style.background = 'var(--bg-color)';
    feedback.innerHTML = `<strong>✓ MESSAGE TRANSMITTED!</strong><br>Thank you ${name}. Your message has been sent to Posina Siva Sai Venkat.`;

    form.reset();
    setTimeout(() => { feedback.style.display = 'none'; }, 6000);
  });
}
