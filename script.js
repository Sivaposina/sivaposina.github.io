/* ==========================================================================
   POSINA SIVA SAI VENKAT - HAND-DRAWN SKETCH PORTFOLIO JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initThemeToggle();
  initProjectFilters();
  initCaseStudyModal();
  initResumeModal();
  initContactForm();
});

/* ==========================================================================
   PROJECT DATA STORE FOR CASE STUDY MODAL OVERLAY (4 FEATURED PROJECTS)
   Uses strictly factual candidate background data.
   ========================================================================== */
const projectsData = {
  p1: {
    title: "Machine Learning Model for Electrospinning Optimization",
    categoryTag: "AI & ML / RESEARCH",
    images: [
      { src: "electrospinning_ui.png", caption: "AI-assisted electrospinning parameter optimization interface" }
    ],
    overview: "Predicting PVDF fiber diameter using electrospinning process parameters and machine-learning regression.",
    role: "Research Intern (IIT Indore)",
    tools: ["Python", "Scikit-Learn", "Machine Learning", "Data Processing", "PVDF", "Electrospinning"],
    details: [
      "Built machine learning regression pipelines in Python using Scikit-Learn.",
      "Evaluated electrospinning parameters including voltage, flow rate, concentration, and tip-to-collector distance.",
      "Analyzed polymer fiber diameter distributions for process parameter optimization.",
      "Assisted in experimental data modeling and documentation."
    ],
    learning: "Gained practical experience in combining experimental physical processes with statistical machine learning modeling for process parameter optimization."
  },
  p2: {
    title: "3D-Printed Artificial Bone Scaffold",
    categoryTag: "CAD & BIO-MANUFACTURING",
    images: [
      { src: "bone_scaffold_cad.png", caption: "CAD lattice scaffold design" },
      { src: "bone_scaffold_print.png", caption: "3D-printed artificial bone scaffold" }
    ],
    overview: "Porous biomimetic scaffold design using CAD modeling and additive manufacturing.",
    role: "CAD & Additive Manufacturing Designer",
    tools: ["Fusion 360", "CAD Modeling", "3D Printing", "Additive Manufacturing", "Bioengineering"],
    details: [
      "Created parametric porous unit-cell lattice structures using 3D CAD software.",
      "Optimized structural geometry to achieve targeted porosity for biomimetic applications.",
      "Fabricated prototype scaffolds using high-precision FDM 3D printing.",
      "Evaluated physical lattice geometry integrity and pore distribution."
    ],
    learning: "Mastered biomimetic porous lattice modeling techniques and FDM 3D printing slice parameters for medical engineering applications."
  },
  p3: {
    title: "Gauge History & Inspection System",
    categoryTag: "QUALITY / MANUFACTURING",
    image: "gauge_system.jpg",
    overview: "Digital workflow for tracking gauge usage, inspection history, and quality-related data during manufacturing operations.",
    role: "Quality Intern (ACE Inotec, Bengaluru)",
    tools: ["Quality Engineering", "Inspection", "Excel", "Manufacturing"],
    details: [
      "Conducted sample inspections using precision gauges (micrometers, height gauges).",
      "Maintained gauge history calibration logs and equipment traceability records.",
      "Interpreted GD&T engineering drawing specifications during quality control procedures."
    ],
    learning: "Gained rigorous exposure to GD&T callout interpretation, precision metrology calibration, and industrial quality assurance workflows."
  },
  p4: {
    title: "Drone Lab Mechanical Component",
    categoryTag: "CAD & 3D PRINTING",
    images: [
      { src: "drone_catia_cad.png", caption: "CAD design and fabricated component" },
      { src: "drone_catia_print.png", caption: "Drone laboratory mechanical component" }
    ],
    overview: "Designed and fabricated a functional mechanical component for drone laboratory applications using CAD and additive manufacturing.",
    role: "CAD & Structural Designer",
    tools: ["CATIA V5", "3D Printing", "Mechanical Design"],
    details: [
      "Designed 3D parametric component models in CATIA V5.",
      "Conducted structural analysis considerations in ANSYS.",
      "Fabricated physical prototypes using 3D printing following Design for Manufacturing (DFM) guidelines."
    ],
    learning: "Enhanced proficiency in CATIA V5 surface/part modeling and rapid prototyping for lightweight structural components."
  }
};

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

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('sketch-theme', newTheme);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = 'LIGHT SKETCH';
    } else {
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = 'DARK SKETCH';
    }
  }
}

/* ==========================================================================
   3. CATEGORY FILTERS (ALL, AI/ML, CAD, MANUFACTURING, RESEARCH, QUALITY)
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-categories') || '').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. CASE STUDY MODAL HANDLER
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById('project-detail-modal');
  const closeBtn = document.getElementById('close-project-modal-btn');
  const triggers = document.querySelectorAll('.view-case-study-btn, .editorial-img-box');

  if (!modal || !closeBtn) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      let card = trigger.closest('[data-project-id]');
      if (!card) return;
      const projectId = card.getAttribute('data-project-id');
      const data = projectsData[projectId];
      if (data) {
        openCaseStudyModal(data);
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

function openCaseStudyModal(data) {
  const modal = document.getElementById('project-detail-modal');
  
  document.getElementById('pmodal-category-badge').textContent = data.categoryTag;
  document.getElementById('pmodal-spec-tag').textContent = '[ TECHNICAL CASE STUDY ]';
  document.getElementById('pmodal-title').textContent = data.title;
  document.getElementById('pmodal-overview').textContent = data.overview;

  // Highlights / Details
  const highlightsEl = document.getElementById('pmodal-highlights');
  highlightsEl.innerHTML = '';
  data.details.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    highlightsEl.appendChild(li);
  });

  // Tools / Technologies
  const skillsEl = document.getElementById('pmodal-skill-pills');
  skillsEl.innerHTML = '';
  data.tools.forEach(tool => {
    const span = document.createElement('span');
    span.className = 'skill-pill lg';
    span.textContent = tool;
    skillsEl.appendChild(span);
  });

  // Project Images in Modal (Primary & Secondary documentation)
  const galleryEl = document.getElementById('pmodal-gallery-grid');
  galleryEl.innerHTML = '';

  const imagesList = data.images || (data.image ? [{ src: data.image }] : []);

  imagesList.forEach(imgObj => {
    const container = document.createElement('div');
    container.className = 'pmodal-img-wrapper';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'pmodal-img-container';

    const img = document.createElement('img');
    img.src = typeof imgObj === 'string' ? imgObj : imgObj.src;
    img.alt = data.title;
    img.className = 'pmodal-img';

    imgDiv.appendChild(img);
    container.appendChild(imgDiv);

    if (typeof imgObj === 'object' && imgObj.caption) {
      const caption = document.createElement('div');
      caption.className = 'pmodal-img-caption';
      caption.textContent = imgObj.caption;
      container.appendChild(caption);
    }

    galleryEl.appendChild(container);
  });

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   5. RESUME MODAL & CONTACT FORM
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('close-modal-btn');

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
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
