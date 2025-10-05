// Advanced Theme System for nobulem.wtf
class ThemeManager {
  constructor() {
    this.themes = {
      dark: {
        name: 'Dark',
        icon: '🌙',
        colors: {
          bg: '#000000',
          bg2: '#0a0a0a',
          card: '#111111',
          text: '#ffffff',
          muted: '#cccccc',
          line: '#333333',
          accent: '#ffffff',
          primary: '#ffffff',
          secondary: '#888888'
        },
        particles: 'rgba(255,255,255,0.4)',
        waves: 'rgba(255,255,255,0.02)',
        animationSpeed: '20s',
        description: 'Classic dark theme'
      },
      light: {
        name: 'Light',
        icon: '☀️',
        colors: {
          bg: '#ffffff',
          bg2: '#f8f9fa',
          card: '#ffffff',
          text: '#1a1a1a',
          muted: '#6b7280',
          line: '#e5e7eb',
          accent: '#1a1a1a',
          primary: '#1a1a1a',
          secondary: '#6b7280'
        },
        particles: 'rgba(26,26,26,0.3)',
        waves: 'rgba(26,26,26,0.05)',
        animationSpeed: '25s',
        description: 'Clean light theme'
      },
      sunset: {
        name: 'Sunset',
        icon: '🌅',
        colors: {
          bg: 'linear-gradient(135deg, #ff6b35, #f7931e)',
          bg2: '#ff8c42',
          card: 'rgba(255,255,255,0.15)',
          text: '#ffffff',
          muted: '#ffe4d6',
          line: 'rgba(255,255,255,0.2)',
          accent: '#fff3cd',
          primary: '#fff3cd',
          secondary: '#ffb366'
        },
        particles: 'rgba(255,243,205,0.6)',
        waves: 'rgba(255,243,205,0.1)',
        animationSpeed: '15s',
        description: 'Warm sunset vibes'
      },
      neon: {
        name: 'Neon',
        icon: '⚡',
        colors: {
          bg: 'linear-gradient(135deg, #0a0a0a, #1a0a1a)',
          bg2: '#1a1a2e',
          card: 'rgba(0,255,255,0.15)',
          text: '#00ffff',
          muted: '#66ffff',
          line: 'rgba(0,255,255,0.3)',
          accent: '#ff00ff',
          primary: '#00ffff',
          secondary: '#ff00ff'
        },
        particles: 'rgba(0,255,255,0.8)',
        waves: 'rgba(255,0,255,0.1)',
        animationSpeed: '10s',
        description: 'Electric neon glow'
      },
      galaxy: {
        name: 'Galaxy',
        icon: '🌌',
        colors: {
          bg: 'linear-gradient(135deg, #0c0c0c, #1a0d2e)',
          bg2: '#1a1a3a',
          card: 'rgba(138,43,226,0.15)',
          text: '#e6e6fa',
          muted: '#b19cd9',
          line: 'rgba(138,43,226,0.3)',
          accent: '#9370db',
          primary: '#8a2be2',
          secondary: '#6a5acd'
        },
        particles: 'rgba(147,112,219,0.7)',
        waves: 'rgba(138,43,226,0.1)',
        animationSpeed: '30s',
        description: 'Cosmic space theme'
      },
      ocean: {
        name: 'Ocean',
        icon: '🌊',
        colors: {
          bg: 'linear-gradient(135deg, #001122, #003366)',
          bg2: '#002244',
          card: 'rgba(0,191,255,0.15)',
          text: '#e0f6ff',
          muted: '#87ceeb',
          line: 'rgba(0,191,255,0.3)',
          accent: '#00bfff',
          primary: '#1e90ff',
          secondary: '#4682b4'
        },
        particles: 'rgba(0,191,255,0.6)',
        waves: 'rgba(30,144,255,0.1)',
        animationSpeed: '35s',
        description: 'Deep ocean depths'
      }
    };

    this.currentTheme = this.loadTheme();
    this.isInitialized = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeTheme();
      });
    } else {
      this.initializeTheme();
    }
  }

  initializeTheme() {
    if (this.isInitialized) return;
    
    this.createThemeButton();
    this.createThemeSelector();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.isInitialized = true;
  }

  createThemeButton() {
    const linksContainer = document.querySelector('.nav .links');
    if (!linksContainer) return;

    // Check if button already exists
    if (document.getElementById('themeButton')) return;

    const themeButton = document.createElement('button');
    themeButton.id = 'themeButton';
    themeButton.className = 'theme-button';
    themeButton.innerHTML = `
      <span class="theme-icon">${this.themes[this.currentTheme].icon}</span>
      <span class="theme-text">Themes</span>
    `;

    this.addThemeButtonStyles();
    linksContainer.appendChild(themeButton);
  }

  addThemeButtonStyles() {
    // Check if styles already exist
    if (document.getElementById('theme-button-styles')) return;

    const style = document.createElement('style');
    style.id = 'theme-button-styles';
    style.textContent = `
      .theme-button {
        background: rgba(255,255,255,0.1);
        border: 1px solid var(--line);
        border-radius: 25px;
        padding: 8px 16px;
        color: var(--text);
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        overflow: hidden;
        margin-left: 12px;
        animation: theme-btn-glow 3s ease-in-out infinite;
      }

      .theme-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.6s ease;
      }

      .theme-button:hover::before {
        left: 100%;
      }

      .theme-button:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px) scale(1.05);
        border-color: rgba(255,255,255,0.4);
        box-shadow: 0 8px 25px rgba(255,255,255,0.2);
      }

      .theme-icon {
        font-size: 16px;
        transition: transform 0.3s ease;
      }

      .theme-button:hover .theme-icon {
        transform: rotate(20deg) scale(1.2);
      }

      @keyframes theme-btn-glow {
        0%, 100% { box-shadow: 0 0 10px rgba(255,255,255,0.1); }
        50% { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
      }

      @media (max-width: 980px) {
        .theme-button {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 100;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          padding: 0;
          justify-content: center;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
        }
        
        .theme-text {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  createThemeSelector() {
    // Check if selector already exists
    if (document.getElementById('themeSelector')) return;

    const themeSelector = document.createElement('div');
    themeSelector.id = 'themeSelector';
    themeSelector.className = 'theme-selector-overlay';
    
    themeSelector.innerHTML = `
      <div class="theme-selector-modal">
        <div class="theme-selector-header">
          <h3>🎨 Choose Your Theme</h3>
          <button class="theme-close-btn">&times;</button>
        </div>
        <div class="theme-grid">
          ${Object.entries(this.themes).map(([key, theme]) => `
            <div class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                 data-theme="${key}">
              <div class="theme-preview" data-theme="${key}">
                <div class="theme-preview-bg"></div>
                <div class="theme-preview-card"></div>
                <div class="theme-preview-text"></div>
              </div>
              <div class="theme-info">
                <div class="theme-name">
                  <span class="theme-emoji">${theme.icon}</span>
                  ${theme.name}
                </div>
                <div class="theme-description">${theme.description}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.addThemeSelectorStyles();
    document.body.appendChild(themeSelector);
  }

  addThemeSelectorStyles() {
    // Check if styles already exist
    if (document.getElementById('theme-selector-styles')) return;

    const style = document.createElement('style');
    style.id = 'theme-selector-styles';
    style.textContent = `
      .theme-selector-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(15px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .theme-selector-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      .theme-selector-modal {
        background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 30px;
        max-width: 600px;
        width: 90vw;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: modal-entrance 0.5s ease both;
        box-shadow: 0 50px 150px rgba(255,255,255,0.2);
      }

      .theme-selector-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid var(--line);
      }

      .theme-selector-header h3 {
        margin: 0;
        font-size: 24px;
        color: var(--text);
        background: linear-gradient(45deg, var(--text), var(--muted));
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-text 3s ease infinite;
      }

      .theme-close-btn {
        background: none;
        border: none;
        color: var(--text);
        font-size: 28px;
        cursor: pointer;
        padding: 5px;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .theme-close-btn:hover {
        background: rgba(255,255,255,0.1);
        transform: scale(1.1) rotate(90deg);
      }

      .theme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .theme-option {
        background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        border: 2px solid transparent;
        border-radius: 15px;
        padding: 20px;
        cursor: pointer;
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
        animation: theme-option-entrance 0.6s ease both;
      }

      .theme-option:nth-child(1) { animation-delay: 0.1s; }
      .theme-option:nth-child(2) { animation-delay: 0.2s; }
      .theme-option:nth-child(3) { animation-delay: 0.3s; }
      .theme-option:nth-child(4) { animation-delay: 0.4s; }
      .theme-option:nth-child(5) { animation-delay: 0.5s; }
      .theme-option:nth-child(6) { animation-delay: 0.6s; }

      .theme-option::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.6s ease;
      }

      .theme-option:hover::before {
        left: 100%;
      }

      .theme-option:hover {
        transform: translateY(-8px) scale(1.03);
        border-color: rgba(255,255,255,0.3);
        box-shadow: 0 20px 60px rgba(255,255,255,0.15);
      }

      .theme-option.active {
        border-color: var(--accent);
        background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
        box-shadow: 0 0 30px rgba(255,255,255,0.2);
      }

      .theme-preview {
        width: 100%;
        height: 80px;
        border-radius: 10px;
        margin-bottom: 15px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .theme-preview-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
      }

      .theme-preview-card {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 40px;
        height: 25px;
        border-radius: 4px;
        opacity: 0.8;
      }

      .theme-preview-text {
        position: absolute;
        bottom: 10px;
        right: 15px;
        width: 30px;
        height: 3px;
        border-radius: 2px;
      }

      .theme-info {
        text-align: center;
      }

      .theme-name {
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 5px;
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .theme-emoji {
        font-size: 20px;
        animation: theme-emoji-bounce 2s ease-in-out infinite;
      }

      .theme-description {
        font-size: 13px;
        color: var(--muted);
        opacity: 0.8;
      }

      /* Theme-specific preview styles */
      .theme-preview[data-theme="dark"] .theme-preview-bg { background: linear-gradient(135deg, #000, #1a1a1a); }
      .theme-preview[data-theme="dark"] .theme-preview-card { background: #333; }
      .theme-preview[data-theme="dark"] .theme-preview-text { background: #fff; }

      .theme-preview[data-theme="light"] .theme-preview-bg { background: linear-gradient(135deg, #fff, #f8f9fa); }
      .theme-preview[data-theme="light"] .theme-preview-card { background: #e5e7eb; }
      .theme-preview[data-theme="light"] .theme-preview-text { background: #1a1a1a; }

      .theme-preview[data-theme="sunset"] .theme-preview-bg { background: linear-gradient(135deg, #ff6b35, #f7931e); }
      .theme-preview[data-theme="sunset"] .theme-preview-card { background: rgba(255,255,255,0.2); }
      .theme-preview[data-theme="sunset"] .theme-preview-text { background: #fff3cd; }

      .theme-preview[data-theme="neon"] .theme-preview-bg { background: linear-gradient(135deg, #0a0a0a, #1a0a1a); }
      .theme-preview[data-theme="neon"] .theme-preview-card { background: rgba(0,255,255,0.3); }
      .theme-preview[data-theme="neon"] .theme-preview-text { background: #00ffff; }

      .theme-preview[data-theme="galaxy"] .theme-preview-bg { background: linear-gradient(135deg, #0c0c0c, #1a0d2e); }
      .theme-preview[data-theme="galaxy"] .theme-preview-card { background: rgba(138,43,226,0.3); }
      .theme-preview[data-theme="galaxy"] .theme-preview-text { background: #9370db; }

      .theme-preview[data-theme="ocean"] .theme-preview-bg { background: linear-gradient(135deg, #001122, #003366); }
      .theme-preview[data-theme="ocean"] .theme-preview-card { background: rgba(0,191,255,0.3); }
      .theme-preview[data-theme="ocean"] .theme-preview-text { background: #00bfff; }

      .theme-notification {
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
        border: 1px solid var(--line);
        border-radius: 15px;
        padding: 15px 20px;
        color: var(--text);
        font-weight: 700;
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(10px);
        animation: notification-slide-in 0.5s ease, notification-slide-out 0.5s ease 2.5s forwards;
        box-shadow: 0 10px 30px rgba(255,255,255,0.1);
      }

      .notification-icon {
        font-size: 18px;
        animation: notification-icon-spin 0.5s ease;
      }

      @keyframes modal-entrance {
        from { opacity: 0; transform: translateY(50px) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes theme-option-entrance {
        from { opacity: 0; transform: translateY(30px) rotateX(15deg); }
        to { opacity: 1; transform: translateY(0) rotateX(0deg); }
      }

      @keyframes theme-emoji-bounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(10deg); }
      }

      @keyframes notification-slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes notification-slide-out {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }

      @keyframes notification-icon-spin {
        from { transform: rotate(0deg) scale(1); }
        to { transform: rotate(360deg) scale(1.2); }
      }

      @media (max-width: 768px) {
        .theme-grid {
          grid-template-columns: 1fr;
        }
        
        .theme-selector-modal {
          width: 95vw;
          padding: 20px;
        }

        .theme-notification {
          top: 80px;
          right: 20px;
          left: 20px;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupEventListeners() {
    const themeButton = document.getElementById('themeButton');
    if (themeButton) {
      themeButton.addEventListener('click', () => {
        this.openThemeSelector();
      });
    }

    // Theme option clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-option')) {
        const themeName = e.target.closest('.theme-option').getAttribute('data-theme');
        this.selectTheme(themeName);
      }
      
      if (e.target.classList.contains('theme-close-btn')) {
        this.closeThemeSelector();
      }
      
      if (e.target.classList.contains('theme-selector-overlay')) {
        this.closeThemeSelector();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeThemeSelector();
      }
    });
  }

  openThemeSelector() {
    const selector = document.getElementById('themeSelector');
    if (selector) {
      selector.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeThemeSelector() {
    const selector = document.getElementById('themeSelector');
    if (selector) {
      selector.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  selectTheme(themeName) {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      this.applyTheme(themeName);
      this.saveTheme(themeName);
      this.updateActiveTheme(themeName);
      this.updateThemeButton();
      this.closeThemeSelector();
      this.showThemeChangeNotification(this.themes[themeName].name);
    }
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply theme-specific body background
    document.body.style.background = theme.colors.bg;

    // Update particles and waves
    this.updateParticles(theme);
    this.updateWaves(theme);
    this.updateAnimationSpeeds(theme);
    
    // Apply theme-specific animations
    this.applyThemeAnimations(themeName);

    // Update navigation background
    const nav = document.querySelector('.nav');
    if (nav) {
      if (themeName === 'light') {
        nav.style.background = 'rgba(255,255,255,0.9)';
      } else {
        nav.style.background = 'rgba(0,0,0,0.9)';
      }
    }
  }

  updateParticles(theme) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.background = theme.particles;
    });
  }

  updateWaves(theme) {
    const waves = document.querySelectorAll('.wave');
    waves.forEach(wave => {
      wave.style.background = `linear-gradient(45deg, transparent 0%, ${theme.waves} 25%, transparent 50%, ${theme.waves} 75%, transparent 100%)`;
    });
  }

  updateAnimationSpeeds(theme) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const baseSpeed = parseInt(theme.animationSpeed);
      particle.style.animationDuration = `${baseSpeed + (index % 4) * 5}s`;
    });
  }

  applyThemeAnimations(themeName) {
    // Remove existing theme classes
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-sunset', 'theme-neon', 'theme-galaxy', 'theme-ocean');
    
    // Add new theme class
    document.body.classList.add(`theme-${themeName}`);

    // Create theme-specific animation styles
    this.createThemeAnimations(themeName);
  }

  createThemeAnimations(themeName) {
    // Remove existing theme animations
    const existingStyle = document.getElementById('theme-animations');
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'theme-animations';
    
    let animations = '';

    switch (themeName) {
      case 'sunset':
        animations = `
          .theme-sunset .brand .dot {
            background: linear-gradient(45deg, #ff6b35, #f7931e) !important;
            box-shadow: 0 0 20px #ff6b35, 0 0 40px #f7931e !important;
          }
          
          .theme-sunset .particle {
            animation: sunset-float 15s linear infinite;
          }
          
          @keyframes sunset-float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; filter: hue-rotate(0deg); }
            25% { opacity: 1; filter: hue-rotate(90deg); }
            75% { opacity: 1; filter: hue-rotate(270deg); }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; filter: hue-rotate(360deg); }
          }
        `;
        break;

      case 'neon':
        animations = `
          .theme-neon .brand .dot {
            background: linear-gradient(45deg, #00ffff, #ff00ff) !important;
            box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff, 0 0 60px #00ffff !important;
            animation: neon-pulse 1s ease-in-out infinite alternate;
          }
          
          .theme-neon .particle {
            animation: neon-float 10s linear infinite;
            box-shadow: 0 0 10px currentColor;
          }
          
          .theme-neon .shape {
            border-color: #00ffff !important;
            box-shadow: 0 0 20px #00ffff;
            animation: neon-shape-glow 2s ease-in-out infinite alternate;
          }
          
          @keyframes neon-pulse {
            0% { box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff; }
            100% { box-shadow: 0 0 40px #ff00ff, 0 0 60px #00ffff, 0 0 80px #ff00ff; }
          }
          
          @keyframes neon-float {
            0% { transform: translateY(100vh) rotate(0deg); filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { transform: translateY(-100px) rotate(360deg); filter: hue-rotate(360deg); }
          }
          
          @keyframes neon-shape-glow {
            0% { border-color: #00ffff !important; box-shadow: 0 0 20px #00ffff; }
            100% { border-color: #ff00ff !important; box-shadow: 0 0 30px #ff00ff; }
          }
        `;
        break;

      case 'galaxy':
        animations = `
          .theme-galaxy .brand .dot {
            background: linear-gradient(45deg, #8a2be2, #9370db) !important;
            box-shadow: 0 0 20px #8a2be2, 0 0 40px #9370db !important;
          }
          
          .theme-galaxy .particle {
            animation: galaxy-float 30s linear infinite;
          }
          
          .theme-galaxy .shape {
            border-color: #9370db !important;
            animation: galaxy-shape-drift 25s ease-in-out infinite;
          }
          
          @keyframes galaxy-float {
            0% { transform: translateY(100vh) rotate(0deg) scale(1); opacity: 0; }
            10% { opacity: 1; }
            50% { transform: translateY(50vh) rotate(180deg) scale(1.5); }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg) scale(0.5); opacity: 0; }
          }
          
          @keyframes galaxy-shape-drift {
            0%, 100% { transform: translateY(0) rotate(0deg); filter: hue-rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); filter: hue-rotate(90deg); }
            50% { transform: translateY(-10px) rotate(180deg); filter: hue-rotate(180deg); }
            75% { transform: translateY(-30px) rotate(270deg); filter: hue-rotate(270deg); }
          }
        `;
        break;

      case 'ocean':
        animations = `
          .theme-ocean .brand .dot {
            background: linear-gradient(45deg, #00bfff, #1e90ff) !important;
            box-shadow: 0 0 20px #00bfff, 0 0 40px #1e90ff !important;
          }
          
          .theme-ocean .particle {
            animation: ocean-float 35s linear infinite;
          }
          
          .theme-ocean .wave {
            animation-duration: 40s;
          }
          
          .theme-ocean .shape {
            border-color: #00bfff !important;
            animation: ocean-drift 20s ease-in-out infinite;
          }
          
          @keyframes ocean-float {
            0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(50px) rotate(180deg); opacity: 0; }
          }
          
          @keyframes ocean-drift {
            0%, 100% { transform: translateY(0) scale(1); }
            33% { transform: translateY(-15px) scale(1.1); }
            66% { transform: translateY(-5px) scale(0.9); }
          }
        `;
        break;

      case 'light':
        animations = `
          .theme-light .brand .dot {
            background: linear-gradient(45deg, #1a1a1a, #333) !important;
            box-shadow: 0 0 20px rgba(26,26,26,0.5), 0 0 40px rgba(26,26,26,0.3) !important;
          }
          
          .theme-light .particle {
            animation: light-float 25s linear infinite;
          }
          
          .theme-light .shape {
            border-color: rgba(26,26,26,0.2) !important;
          }
          
          @keyframes light-float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-100px) rotate(180deg); opacity: 0; }
          }
        `;
        break;
    }

    style.textContent = animations;
    document.head.appendChild(style);
  }

  updateActiveTheme(themeName) {
    document.querySelectorAll('.theme-option').forEach(option => {
      option.classList.remove('active');
    });
    
    const activeOption = document.querySelector(`[data-theme="${themeName}"]`);
    if (activeOption) {
      activeOption.classList.add('active');
    }
  }

  updateThemeButton() {
    const themeButton = document.getElementById('themeButton');
    const themeIcon = themeButton?.querySelector('.theme-icon');
    
    if (themeIcon) {
      themeIcon.textContent = this.themes[this.currentTheme].icon;
      themeIcon.style.transform = 'scale(1.3) rotate(20deg)';
      setTimeout(() => {
        themeIcon.style.transform = '';
      }, 300);
    }
  }

  showThemeChangeNotification(themeName) {
    // Remove existing notification
    const existingNotification = document.querySelector('.theme-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
      <span class="notification-icon">🎨</span>
      <span>Theme changed to ${themeName}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  saveTheme(themeName) {
    localStorage.setItem('nobulem-theme', themeName);
  }

  loadTheme() {
    return localStorage.getItem('nobulem-theme') || 'dark';
  }
}

// Initialize theme manager when DOM is loaded
let themeManagerInstance = null;

function initThemeManager() {
  if (!themeManagerInstance) {
    themeManagerInstance = new ThemeManager();
  }
}

// Multiple initialization methods to ensure it works
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeManager);
} else {
  initThemeManager();
}

// Backup initialization
window.addEventListener('load', () => {
  if (!themeManagerInstance) {
    initThemeManager();
  }
});

