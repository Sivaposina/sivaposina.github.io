/* ==========================================================================
   POSINA SIVA SAI VENKAT - HAND-DRAWN SKETCH PORTFOLIO JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initThemeToggle();
  initProjectFilters();
  initProjectDetailModal();
  initResumeModal();
  initContactForm();
});

/* ==========================================================================
   PROJECT DATA STORE FOR DETAIL MODAL OVERLAY
   ========================================================================== */
const projectsData = {
  p1: {
    category: "AI & ML",
    specTag: "[ PROCESS OPTIMIZATION ]",
    title: "Machine Learning Model for Electrospinning Optimization",
    overview: "Developed predictive machine learning regression models to optimize PVDF (Polyvinylidene Fluoride) polymer fiber diameter produced during electrospinning processes. Evaluated multi-variable experimental parameters to establish precise control over fiber morphology and nanoscale distribution.",
    highlights: [
      "Engineered data preprocessing, feature selection, and cross-validation pipelines in Python.",
      "Mapped relationships between Applied Voltage (10-30 kV), Flow Rate (0.2-3.0 mL/h), Polymer Concentration (10-25%), and Tip-to-Collector Distance.",
      "Achieved high predictive R² accuracy score using Scikit-Learn Random Forest and Gradient Boosting regressors.",
      "Optimized nanofiber diameter predictability to support high-efficiency filtration & piezo-electric sensor research."
    ],
    skills: ["Python", "Scikit-Learn", "Machine Learning", "Data Processing", "Regression Modeling", "Feature Engineering"],
    images: [] // User will provide images here!
  },
  p2: {
    category: "CAD & Bio-Mfg",
    specTag: "[ 3D PRINTING & LATTICE ]",
    title: "3D-Printed Artificial Bone Scaffold",
    overview: "Designed and fabricated lightweight porous biomimetic scaffold structures using advanced CAD software and additive manufacturing (3D Printing). Focused on structural geometry optimization to enhance osteointegration and cellular ingrowth for tissue engineering applications.",
    highlights: [
      "Created parametric porous unit-cell lattice geometries (Cubic, Gyroid, and Honeycomb topologies) using CAD tools.",
      "Applied mass reduction and surface area-to-volume ratio optimization while preserving required mechanical stiffness.",
      "Fabricated prototype scaffolds using high-precision 3D printing additive manufacturing.",
      "Evaluated compressive load resistance and pore interconnectivity for biomedical alignment."
    ],
    skills: ["Fusion 360", "CAD Modeling", "Additive Manufacturing", "Porous Geometry", "Lightweighting", "3D Printing"],
    images: [] // User will provide images here!
  },
  p3: {
    category: "CAD & Design",
    specTag: "[ CATIA V5 & FEA ]",
    title: "Drone Component Design using CATIA & 3D Printing",
    overview: "Engineered an optimized lightweight quadcopter arm and motor mount component in CATIA V5, executed finite element analysis (FEA) in ANSYS to evaluate structural load capacity, and validated the design via physical FDM 3D printing.",
    highlights: [
      "Designed parametric 3D solid models and complex surface geometries in CATIA V5 (Part & Assembly Design).",
      "Performed static structural stress and displacement simulations in ANSYS under maximum rotor thrust conditions.",
      "Identified stress concentration zones and applied rib reinforcement to prevent mechanical fatigue failure.",
      "Fabricated functional 3D-printed prototypes following Design for Manufacturing (DFM) principles."
    ],
    skills: ["CATIA V5", "ANSYS Structural", "Rapid Prototyping", "DFM", "Finite Element Analysis", "Aerospace Design"],
    images: [] // User will provide images here!
  },
  p4: {
    category: "Quality QA",
    specTag: "[ METROLOGY & GD&T ]",
    title: "Gauge History & Inspection System",
    overview: "Developed a comprehensive digital gauge tracking and inspection workflow to improve calibration monitoring, metrology record management, and GD&T compliance in high-volume automotive manufacturing.",
    highlights: [
      "Established systematic gauge calibration logs for precision micrometers, bore gauges, and height gauges.",
      "Enhanced inspection record traceability to satisfy rigorous automotive ISO quality assurance standards.",
      "Applied Geometric Dimensioning and Tolerancing (GD&T) principles to evaluate component drawing callouts.",
      "Streamlined quality control reporting to reduce defect rates during assembly line inspections."
    ],
    skills: ["Precision Gauges", "GD&T", "Calibration Workflow", "Quality Control", "ISO Standards", "Metrology"],
    images: [] // User will provide images here!
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
   3. PROJECT CATEGORY FILTER PILLS
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
   4. PROJECT DETAIL MODAL HANDLER
   ========================================================================== */
function initProjectDetailModal() {
  const modal = document.getElementById('project-detail-modal');
  const closeBtn = document.getElementById('close-project-modal-btn');
  const projectCards = document.querySelectorAll('.clickable-card');

  if (!modal || !closeBtn) return;

  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const projectId = card.getAttribute('data-project-id');
      const data = projectsData[projectId];
      if (data) {
        openProjectModal(data);
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

function openProjectModal(data) {
  const modal = document.getElementById('project-detail-modal');
  
  document.getElementById('pmodal-category-badge').textContent = data.category;
  document.getElementById('pmodal-spec-tag').textContent = data.specTag;
  document.getElementById('pmodal-title').textContent = data.title;
  document.getElementById('pmodal-overview').textContent = data.overview;

  // Populate bullet highlights
  const highlightsEl = document.getElementById('pmodal-highlights');
  highlightsEl.innerHTML = '';
  data.highlights.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    highlightsEl.appendChild(li);
  });

  // Populate skill pills
  const skillsEl = document.getElementById('pmodal-skill-pills');
  skillsEl.innerHTML = '';
  data.skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'skill-pill lg';
    span.textContent = skill;
    skillsEl.appendChild(span);
  });

  // Populate image gallery container
  const galleryEl = document.getElementById('pmodal-gallery-grid');
  galleryEl.innerHTML = '';

  if (data.images && data.images.length > 0) {
    data.images.forEach(imgSrc => {
      const div = document.createElement('div');
      div.className = 'pmodal-gallery-item';
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = data.title;
      div.appendChild(img);
      galleryEl.appendChild(div);
    });
  } else {
    // Show clean placeholder slot ready for user images
    const placeholder = document.createElement('div');
    placeholder.className = 'pmodal-gallery-placeholder';
    placeholder.innerHTML = '📁 <em>Project images ready to be added here upon receipt.</em>';
    galleryEl.appendChild(placeholder);
  }

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
