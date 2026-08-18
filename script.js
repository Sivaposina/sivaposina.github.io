/* ==========================================================================
   POSINA SIVA SAI VENKAT - HAND-DRAWN SKETCH PORTFOLIO JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initThemeToggle();
  initProjectFilters();
  initCaseStudyModal();
  initCertificateModal();
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
    images: [
      { src: "gauge_inspection_sheet.png", caption: "Gauge inspection and history tracking" }
    ],
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

/* ==========================================================================
   6. CERTIFICATES DATA STORE & MODAL HANDLER
   ========================================================================== */
const certificatesData = {
  "cert-ace-inotec": {
    category: "01 // INDUSTRY & RESEARCH",
    org: "ACE INOTEC MANUFACTURING PVT. LTD.",
    type: "Internship — Quality Department",
    title: "Quality Engineering Internship Certificate",
    date: "Industrial Internship",
    description: "Successfully completed internship training at ACE Inotec Manufacturing Pvt. Ltd., Bengaluru, from 21 May 2025 to 16 June 2025 in the Quality Department. Gained practical exposure to gauges and inspection processes, quality documentation, and manufacturing quality practices. Developed an Excel-based OEE tracking tool to support production-efficiency analysis and created a Gauge History & Inspection System for tracking gauge usage and inspection data. The internship strengthened practical understanding of industrial quality processes while demonstrating keen learning, hard work, discipline, and good conduct.",
    image: "certificates/ace_inotec.png"
  },
  "cert-brakes-india": {
    category: "01 // INDUSTRY & RESEARCH",
    org: "BRAKES INDIA PRIVATE LIMITED",
    type: "Industrial Internship",
    title: "Internship Training — Actuation Unit",
    date: "Industrial Internship",
    description: "Completed an internship in the Actuation Unit at Brakes India Private Limited, Chennai, from 04 December 2025 to 10 January 2026. Gained practical industrial exposure to automotive actuation systems and manufacturing operations, developing an understanding of how mechanical components and systems are produced and handled in an industrial environment. The experience strengthened practical knowledge, workplace discipline, and familiarity with automotive manufacturing practices.",
    image: "certificates/brakes_india.png"
  },
  "cert-tvs-motor": {
    category: "01 // INDUSTRY & RESEARCH [ 3-DAY IN-PLANT TRAINING ]",
    org: "TVS MOTOR COMPANY",
    type: "In-Plant Training",
    title: "3-Day In-Plant Training",
    subtitle: "2-Wheeler & 3-Wheeler Divisions | Hosur",
    date: "13–15 October 2025",
    description: "Completed a 3-day in-plant training at TVS Motor Company, Hosur, from 13 October 2025 to 15 October 2025. The training provided industrial exposure to the 2-wheeler and 3-wheeler divisions, offering an opportunity to observe and understand the automotive manufacturing environment and the practical application of mechanical engineering concepts in vehicle production. The experience provided valuable insight into industrial practices, manufacturing operations, workplace discipline, and the scale of automotive production.",
    detailsGrid: [
      { label: "Duration", value: "3 Days" },
      { label: "Location", value: "Hosur" },
      { label: "Training Type", value: "In-Plant Training" },
      { label: "Divisions", value: "2-Wheeler & 3-Wheeler" },
      { label: "Dates", value: "13 October 2025 – 15 October 2025" }
    ],
    image: "certificates/tvs_motor.png"
  },
  "cert-iit-indore": {
    category: "01 // INDUSTRY & RESEARCH [ RESEARCH INTERNSHIP ]",
    org: "IIT INDORE",
    type: "Research Internship",
    title: "Research Internship",
    subtitle: "Battery Materials • Electrospinning • Machine Learning",
    date: "16 May 2026 – 18 July 2026",
    description: "Completed a research internship at IIT Indore focused on the development and data-driven analysis of electrospun materials for next-generation sodium-ion battery applications. The work involved building a foundation in Li-ion and Na-ion battery technologies, studying electrospinning of polymeric materials, and investigating the influence of processing parameters on electrospun fiber characteristics. The research was further extended into machine learning-based prediction, data analysis, electrolyte ionic conductivity, and Design-Expert-based experimental analysis.",
    researchFocus: [
      { num: "01", title: "Battery Fundamentals", text: "Li-ion and Na-ion battery fundamentals, cell components, working principles, and key performance considerations." },
      { num: "02", title: "Electrospinning", text: "Studied electrospinning fundamentals and the influence of key process parameters such as polymer concentration, applied voltage, flow rate, and tip-to-collector distance." },
      { num: "03", title: "PVDF Materials", text: "Worked with PVDF-based electrospinning and investigated relationships between processing conditions and electrospun fiber diameter." },
      { num: "04", title: "Machine Learning", text: "Developed a machine-learning workflow for regression-based prediction of electrospun fiber diameter using experimentally reported process parameters and research literature data." },
      { num: "05", title: "Electrolyte Ionic Conductivity", text: "Extended the data-driven approach toward prediction and analysis of electrolyte ionic conductivity for sodium-ion battery applications, involving systematic collection and organization of experimental data from research literature." },
      { num: "06", title: "DOE & Design-Expert", text: "Gained practical exposure to Design-Expert and Design of Experiments (DOE) concepts for experimental analysis, optimization, and research support." }
    ],
    researchWorkflow: [
      "Literature Review",
      "Data Collection",
      "Data Cleaning & Preparation",
      "Feature / Parameter Analysis",
      "Machine Learning",
      "Model Evaluation",
      "DOE & Design-Expert",
      "Research Documentation"
    ],
    keyTechnicalAreas: [
      "Li-ion Batteries",
      "Na-ion Batteries",
      "Electrospinning",
      "PVDF",
      "Fiber Diameter Prediction",
      "Machine Learning",
      "Regression",
      "Electrolyte Ionic Conductivity",
      "DOE",
      "Design-Expert",
      "Literature Data Curation"
    ],
    researchContribution: "The internship provided experience at the intersection of mechanical/materials engineering, experimental process understanding, data science, and research methodology. A major focus was converting experimental information reported across research literature into structured datasets that could be analyzed using machine-learning and statistical approaches. The work helped develop a stronger understanding of how processing parameters, material characteristics, and experimental responses can be connected through data-driven modelling.",
    experimentalPrediction: [
      "Material & Process Parameters",
      "Electrospinning Conditions",
      "Fiber Characteristics",
      "Data Collection",
      "ML Prediction",
      "Experimental / Statistical Analysis"
    ],
    image: "certificates/iit_indore.png"
  },
  "cert-nptel-micromachining": {
    category: "02 // TECHNICAL CERTIFICATIONS",
    org: "NPTEL",
    type: "Introduction to Mechanical Micro Machining",
    title: "NPTEL Certification — Mechanical Micro Machining",
    date: "Technical Certification",
    description: "National Programme on Technology Enhanced Learning (NPTEL) certified course covering micro-machining fundamentals, precision manufacturing, micro-EDM, laser processing, and tool wear mechanics.",
    image: ""
  },
  "cert-greatlearning-catia": {
    category: "02 // TECHNICAL CERTIFICATIONS",
    org: "GREAT LEARNING",
    type: "CATIA Basics",
    title: "CATIA Basics Certification",
    date: "CAD Certification",
    description: "Certified in CATIA V5 3D Computer-Aided Design fundamentals, sketcher workbench, part modeling, and assembly design principles.",
    image: ""
  },
  "cert-skyy-catia": {
    category: "02 // TECHNICAL CERTIFICATIONS",
    org: "SKYY SKILL ACADEMY",
    type: "3D Modelling in CATIA",
    title: "Advanced 3D Modelling in CATIA",
    date: "CAD Certification",
    description: "Professional certification in parametric 3D surface modeling, mechanical assembly creation, and drafting standards using CATIA V5 software.",
    image: ""
  },
  "cert-aylin-autocad": {
    category: "02 // TECHNICAL CERTIFICATIONS",
    org: "AUTOCAD",
    type: "Aylin Technologies",
    title: "AutoCAD Engineering Drafting Certification",
    date: "CAD Certification",
    description: "Certified in 2D technical drawing, orthographic projection callouts, dimensioning standards, and engineering blueprint preparation by Aylin Technologies Pvt. Ltd.",
    image: ""
  },
  "cert-kbr-award": {
    category: "03 // AWARDS & RECOGNITION",
    org: "KBR",
    type: "Winning / Award Certificate",
    title: "KBR Engineering Design Competition Award",
    date: "National Award",
    description: "Secured Top 30 All-India Rank in KBR (Kriya), a prestigious national engineering design competition evaluating CAD modeling, innovation, and technical design feasibility.",
    image: ""
  }
};

function initCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.getElementById('close-cert-modal-btn');
  const certCards = document.querySelectorAll('.cert-item-card');

  if (!modal || !closeBtn) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const certId = card.getAttribute('data-cert-id');
      const data = certificatesData[certId];
      if (data) {
        openCertificateModal(data);
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

function openCertificateModal(data) {
  const modal = document.getElementById('certificate-modal');
  
  document.getElementById('cmodal-category-badge').textContent = data.category;
  document.getElementById('cmodal-date-tag').textContent = `[ ${data.date.toUpperCase()} ]`;
  document.getElementById('cmodal-org').textContent = data.org;
  document.getElementById('cmodal-title').textContent = data.title;
  document.getElementById('cmodal-desc').textContent = data.description;

  // Subtitle (if available)
  const subtitleEl = document.getElementById('cmodal-subtitle');
  if (subtitleEl) {
    if (data.subtitle && data.subtitle.trim() !== "") {
      subtitleEl.textContent = data.subtitle;
      subtitleEl.style.display = 'block';
    } else {
      subtitleEl.style.display = 'none';
    }
  }

  // Training Details Grid (if available)
  const detailsBoxEl = document.getElementById('cmodal-details-box');
  const detailsGridEl = document.getElementById('cmodal-details-grid');
  if (detailsBoxEl && detailsGridEl) {
    if (data.detailsGrid && data.detailsGrid.length > 0) {
      detailsGridEl.innerHTML = '';
      data.detailsGrid.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cmodal-detail-item';
        div.innerHTML = `<span class="cmodal-detail-label">${item.label}</span><span class="cmodal-detail-value">${item.value}</span>`;
        detailsGridEl.appendChild(div);
      });
      detailsBoxEl.style.display = 'block';
    } else {
      detailsBoxEl.style.display = 'none';
    }
  }

  // Research Content Box (if available)
  const researchBoxEl = document.getElementById('cmodal-research-box');
  if (researchBoxEl) {
    if (data.researchFocus || data.researchWorkflow || data.keyTechnicalAreas || data.researchContribution || data.experimentalPrediction) {
      let html = '';

      // 1. RESEARCH FOCUS
      if (data.researchFocus && data.researchFocus.length > 0) {
        html += `<div class="cmodal-research-section">
          <h3>RESEARCH FOCUS</h3>
          <div class="research-focus-grid">`;
        data.researchFocus.forEach(item => {
          html += `<div class="research-focus-card">
            <span class="research-focus-num">${item.num}</span>
            <div class="research-focus-title">${item.title}</div>
            <div class="research-focus-text">${item.text}</div>
          </div>`;
        });
        html += `</div></div>`;
      }

      // 2. RESEARCH WORKFLOW
      if (data.researchWorkflow && data.researchWorkflow.length > 0) {
        html += `<div class="cmodal-research-section">
          <h3>RESEARCH WORKFLOW</h3>
          <div class="research-pipeline-row">`;
        data.researchWorkflow.forEach((step, idx) => {
          html += `<span class="research-pipeline-step">${step}</span>`;
          if (idx < data.researchWorkflow.length - 1) {
            html += `<span class="research-pipeline-arrow">↓</span>`;
          }
        });
        html += `</div></div>`;
      }

      // 3. KEY TECHNICAL AREAS
      if (data.keyTechnicalAreas && data.keyTechnicalAreas.length > 0) {
        html += `<div class="cmodal-research-section">
          <h3>KEY TECHNICAL AREAS</h3>
          <div class="research-tech-chips">`;
        data.keyTechnicalAreas.forEach(chip => {
          html += `<span class="research-tech-chip">${chip}</span>`;
        });
        html += `</div></div>`;
      }

      // 4. RESEARCH CONTRIBUTION
      if (data.researchContribution) {
        html += `<div class="cmodal-research-section">
          <h3>RESEARCH CONTRIBUTION</h3>
          <p class="research-text-block">${data.researchContribution}</p>
        </div>`;
      }

      // 5. FROM EXPERIMENTAL PARAMETERS TO PREDICTION
      if (data.experimentalPrediction && data.experimentalPrediction.length > 0) {
        html += `<div class="cmodal-research-section">
          <h3>FROM EXPERIMENTAL PARAMETERS TO PREDICTION</h3>
          <div class="research-pipeline-row">`;
        data.experimentalPrediction.forEach((step, idx) => {
          html += `<span class="research-pipeline-step">${step}</span>`;
          if (idx < data.experimentalPrediction.length - 1) {
            html += `<span class="research-pipeline-arrow">→</span>`;
          }
        });
        html += `</div></div>`;
      }

      researchBoxEl.innerHTML = html;
      researchBoxEl.style.display = 'flex';
    } else {
      researchBoxEl.style.display = 'none';
      researchBoxEl.innerHTML = '';
    }
  }

  const imgEl = document.getElementById('cmodal-img');
  const placeholderEl = document.getElementById('cmodal-placeholder');
  const openBtnEl = document.getElementById('cmodal-open-btn');

  if (data.image && data.image.trim() !== "") {
    imgEl.onload = () => {
      imgEl.style.display = 'block';
      placeholderEl.style.display = 'none';
      openBtnEl.href = data.image;
      openBtnEl.style.display = 'inline-flex';
    };
    imgEl.onerror = () => {
      imgEl.style.display = 'none';
      placeholderEl.style.display = 'block';
      document.getElementById('cmodal-placeholder-text').textContent = `Official engineering credential issued to Posina Siva Sai Venkat by ${data.org}. (${data.subtitle || data.type})`;
      openBtnEl.style.display = 'none';
    };
    imgEl.src = data.image;
    imgEl.style.cursor = 'pointer';
    imgEl.onclick = () => { window.open(data.image, '_blank'); };
  } else {
    imgEl.style.display = 'none';
    placeholderEl.style.display = 'block';
    document.getElementById('cmodal-placeholder-text').textContent = `Official engineering credential issued to Posina Siva Sai Venkat by ${data.org}. (${data.subtitle || data.type})`;
    openBtnEl.style.display = 'none';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
