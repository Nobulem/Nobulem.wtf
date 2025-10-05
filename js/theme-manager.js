// Advanced Theme System for nobulem.wtf - Fixed Card Backgrounds
class ThemeManager {
  constructor() {
    this.defaultTheme = 'halloween'; // Configure main theme here
    this.themes = {
      halloween: {
        name: 'Halloween',
        icon: '🎃',
        colors: {
          bg: 'linear-gradient(135deg, #1a0d00, #2d1600)',
          bg2: '#2d1600',
          card: 'rgba(255,140,0,0.15)',
          text: '#ff9933',
          muted: '#ffb366',
          line: 'rgba(255,140,0,0.3)',
          accent: '#ff8c00',
          primary: '#ff8c00',
          secondary: '#cc7000',
          cardBg: 'linear-gradient(145deg, rgba(255,140,0,0.15), rgba(255,140,0,0.08))',
          buttonBg: '#ff8c00',
          navActive: '#ff9933',
          eyebrowColor: '#ffb366',
          subtitleColor: '#ffb366',
          borderColor: 'rgba(255,140,0,0.3)'
        },
        particles: 'rgba(255,140,0,0.6)',
        waves: 'rgba(255,140,0,0.1)',
        animationSpeed: '18s',
        description: 'Spooky Halloween theme'
      },
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
          secondary: '#888888',
          cardBg: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
          buttonBg: '#ffffff',
          buttonText: '#000000',
          navActive: '#ffffff',
          eyebrowColor: '#eaeaea',
          subtitleColor: '#cccccc',
          borderColor: '#333333'
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
    text: '#000000',
    muted: '#4a5568',
    line: '#e5e7eb',
    accent: '#1a1a1a',
    primary: '#1a1a1a',
    secondary: '#6b7280',
    cardBg: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
    buttonBg: '#1a1a1a',
    buttonText: '#ffffff',
    navActive: '#000000',
    eyebrowColor: '#000000',
    subtitleColor: '#4a5568',
    borderColor: '#e5e7eb',
    loaderBg: 'linear-gradient(145deg, #f8f9fa, #e5e7eb)',
    inputBg: '#ffffff',
    inputBorder: '#e5e7eb',
    inputText: '#000000',
    linkColor: '#000000'
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
          secondary: '#ffb366',
          cardBg: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
          buttonBg: '#fff3cd',
          navActive: '#ffffff',
          eyebrowColor: '#ffe4d6',
          subtitleColor: '#ffe4d6',
          borderColor: 'rgba(255,255,255,0.2)'
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
          secondary: '#ff00ff',
          cardBg: 'linear-gradient(145deg, rgba(0,255,255,0.15), rgba(0,255,255,0.08))',
          buttonBg: '#00ffff',
          navActive: '#00ffff',
          eyebrowColor: '#66ffff',
          subtitleColor: '#66ffff',
          borderColor: 'rgba(0,255,255,0.3)'
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
          secondary: '#6a5acd',
          cardBg: 'linear-gradient(145deg, rgba(138,43,226,0.15), rgba(138,43,226,0.08))',
          buttonBg: '#9370db',
          navActive: '#e6e6fa',
          eyebrowColor: '#b19cd9',
          subtitleColor: '#b19cd9',
          borderColor: 'rgba(138,43,226,0.3)'
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
          secondary: '#4682b4',
          cardBg: 'linear-gradient(145deg, rgba(0,191,255,0.15), rgba(0,191,255,0.08))',
          buttonBg: '#00bfff',
          navActive: '#e0f6ff',
          eyebrowColor: '#87ceeb',
          subtitleColor: '#87ceeb',
          borderColor: 'rgba(0,191,255,0.3)'
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

    // Add pumpkin icon to brand
    this.addPumpkinToBrand();
  }

  addPumpkinToBrand() {
    const brandContainer = document.querySelector('.brand');
    if (!brandContainer) return;

    // Check if pumpkin already exists
    if (document.querySelector('.pumpkin-icon')) return;

    const dotElement = brandContainer.querySelector('.dot');
    if (dotElement) {
      const pumpkinIcon = document.createElement('span');
      pumpkinIcon.className = 'pumpkin-icon';
      pumpkinIcon.style.display = 'none';
      pumpkinIcon.textContent = '🎃';
      dotElement.parentNode.insertBefore(pumpkinIcon, dotElement);
    }
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
          ${Object.entries(this.themes).sort((a, b) => {
            // Show Halloween first, then alphabetically
            if (a[0] === 'halloween') return -1;
            if (b[0] === 'halloween') return 1;
            return a[1].name.localeCompare(b[1].name);
          }).map(([key, theme]) => `
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

      .theme-preview[data-theme="halloween"] .theme-preview-bg { background: linear-gradient(135deg, #1a0d00, #2d1600); }
      .theme-preview[data-theme="halloween"] .theme-preview-card { background: rgba(255,140,0,0.3); }
      .theme-preview[data-theme="halloween"] .theme-preview-text { background: #ff8c00; }

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

    // Update card backgrounds and buttons
    this.updateCardBackgrounds(theme);

    // Update navigation background
    const nav = document.querySelector('.nav');
    if (nav) {
      if (themeName === 'light') {
        nav.style.background = 'rgba(255,255,255,0.9)';
        nav.style.borderBottom = '1px solid #e5e7eb';
      } else {
        nav.style.background = 'rgba(0,0,0,0.9)';
        nav.style.borderBottom = '1px solid var(--line)';
      }
    }

    // Fix particles positioning
    this.fixParticlePositioning();
  }

  updateCardBackgrounds(theme) {
    // Update all card backgrounds
    const cardSelectors = [
      '.card',
      '.game-card',
      '.dev-card-mini',
      '.dev-card',
      '.showcase-card',
      '.video-card',
      '.executor-card',
      '.plan',
      '.stat-card',
      '.contact-card',
      '.info-card',
      '.highlight-box',
      '.discord-cta',
      '.team-stats',
      '.quote-section',
      '.tos-content',
      '.loader-section',
      '.warning-box'
    ];

    cardSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.background = theme.colors.cardBg;
        element.style.border = `1px solid ${theme.colors.borderColor}`;
      });
    });

    // Update button backgrounds for better visibility
    const buttons = document.querySelectorAll('.btn, .plan-button, .discord-button, .sort-btn, .theme-button, .copy-btn, .modal-copy-btn');
    buttons.forEach(button => {
      if (button.classList.contains('primary') || button.classList.contains('plan-button') || button.classList.contains('copy-btn') || button.classList.contains('modal-copy-btn')) {
        if (theme.name === 'Light') {
          button.style.background = '#1a1a1a';
          button.style.color = '#ffffff';
          button.style.textShadow = 'none';
          button.style.boxShadow = '1px 1px 3px rgba(0,0,0,0.3)';
          button.style.border = '2px solid #1a1a1a';
        } else {
          button.style.background = theme.colors.buttonBg || 'rgba(200,200,200,0.15)';
          button.style.color = theme.colors.buttonText || '#000000';
          button.style.textShadow = 'none';
          button.style.boxShadow = '';
          button.style.border = `2px solid ${theme.colors.buttonBg || 'rgba(200,200,200,0.15)'}`;
        }
      }
    });

    // Fix title color and text shadow
    const titles = document.querySelectorAll('.title, h1');
    titles.forEach(title => {
      title.style.color = theme.colors.text;
      if (theme.name === 'Light') {
        title.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
      } else {
        title.style.textShadow = '';
      }
    });

    // Fix all anchor link colors
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (!link.closest('.nav .links')) {
        if (theme.name === 'Light') {
          link.style.color = theme.colors.text;
          link.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
        } else {
          link.style.color = theme.colors.text;
          link.style.textShadow = '';
        }
      }
    });

    // Handle theme icon visibility
    const whiteIcons = document.querySelectorAll('.theme-icon-white');
    const blackIcons = document.querySelectorAll('.theme-icon-black');

    if (theme.name === 'Light') {
      whiteIcons.forEach(icon => icon.style.display = 'none');
      blackIcons.forEach(icon => icon.style.display = 'inline-block');
    } else {
      whiteIcons.forEach(icon => icon.style.display = 'inline-block');
      blackIcons.forEach(icon => icon.style.display = 'none');
    }

    // Handle feature icon visibility
    const darkFeatureIcons = document.querySelectorAll('.feature-icon-dark');
    const lightFeatureIcons = document.querySelectorAll('.feature-icon-light');

    if (theme.name === 'Light') {
      darkFeatureIcons.forEach(icon => icon.style.display = 'none');
      lightFeatureIcons.forEach(icon => icon.style.display = 'block');
    } else {
      darkFeatureIcons.forEach(icon => icon.style.display = 'block');
      lightFeatureIcons.forEach(icon => icon.style.display = 'none');
    }

    // Fix navigation active state for ALL nav links
    const navLinks = document.querySelectorAll('.nav .links a');
    navLinks.forEach(link => {
      const isActive = link.style.color === '#fff' ||
                       link.style.color === 'rgb(255, 255, 255)' ||
                       link.style.opacity === '1' ||
                       link.getAttribute('style')?.includes('color: #fff') ||
                       link.getAttribute('style')?.includes('color:#fff') ||
                       link.getAttribute('style')?.includes('opacity: 1');

      if (isActive) {
        link.style.color = theme.colors.navActive;
        if (theme.name === 'Light') {
          link.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
          link.style.fontWeight = '900';
        } else {
          link.style.textShadow = '';
          link.style.fontWeight = '800';
        }
      }
    });

    // Fix eyebrow and subtitle colors
    const eyebrows = document.querySelectorAll('.eyebrow');
    eyebrows.forEach(eyebrow => {
      eyebrow.style.color = theme.colors.eyebrowColor;
      if (theme.name === 'Light') {
        eyebrow.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
      } else {
        eyebrow.style.textShadow = '';
      }
    });

    const subtitles = document.querySelectorAll('.subtitle, .hero-subtitle');
    subtitles.forEach(subtitle => {
      subtitle.style.color = theme.colors.subtitleColor;
      if (theme.name === 'Light') {
        subtitle.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
      } else {
        subtitle.style.textShadow = '';
      }
    });

    // Fix search inputs
    const searchInputs = document.querySelectorAll('input[type="text"], input[type="search"], .search-input');
    searchInputs.forEach(input => {
      if (theme.name === 'Light') {
        input.style.background = '#ffffff';
        input.style.color = '#000000';
        input.style.border = '2px solid #e5e7eb';
        input.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
      } else {
        input.style.background = theme.colors.card;
        input.style.color = theme.colors.text;
        input.style.border = `1px solid ${theme.colors.line}`;
        input.style.boxShadow = '';
      }
    });

    // Fix clear buttons
    const clearButtons = document.querySelectorAll('.clear-btn');
    clearButtons.forEach(btn => {
      if (theme.name === 'Light') {
        btn.style.background = '#e5e7eb';
        btn.style.color = '#000000';
        btn.style.border = '1px solid #d1d5db';
      } else {
        btn.style.background = '';
        btn.style.color = '';
        btn.style.border = '';
      }
    });
  }

  fixParticlePositioning() {
    // Fix particles getting stuck at top by ensuring proper positioning
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.position = 'fixed';
      particle.style.zIndex = '0';
      particle.style.pointerEvents = 'none';
    });
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
            animation: sunset-float 15s linear infinite, sunset-shimmer 3s ease-in-out infinite;
            background: radial-gradient(circle, rgba(255,243,205,0.8) 0%, rgba(255,107,53,0.6) 100%) !important;
          }
          
          .theme-sunset .bg-animation::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30%;
            background: linear-gradient(0deg, rgba(255,107,53,0.3) 0%, transparent 100%);
            pointer-events: none;
            animation: horizon-glow 4s ease-in-out infinite;
          }
          
          @keyframes sunset-float {
            0% { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
            10% { opacity: 1; transform: translateY(90vh) rotate(36deg) scale(0.8); }
            90% { opacity: 1; transform: translateY(10vh) rotate(324deg) scale(1.2); }
            100% { transform: translateY(-10vh) rotate(360deg) scale(0.3); opacity: 0; }
          }
          
          @keyframes sunset-shimmer {
            0%, 100% { filter: brightness(1) hue-rotate(0deg); }
            50% { filter: brightness(1.3) hue-rotate(15deg); }
          }
          
          @keyframes horizon-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
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
            animation: neon-float 10s linear infinite, neon-flicker 0.1s infinite;
            box-shadow: 0 0 15px currentColor, 0 0 30px currentColor;
            background: #00ffff !important;
          }
          
          .theme-neon .shape {
            border-color: #00ffff !important;
            box-shadow: 0 0 25px #00ffff, inset 0 0 25px rgba(0,255,255,0.1);
            animation: neon-shape-glow 2s ease-in-out infinite alternate;
          }
          
          .theme-neon .bg-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, rgba(0,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,0,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(0,255,255,0.05) 0%, transparent 50%);
            animation: neon-ambient 8s ease-in-out infinite;
            pointer-events: none;
          }
          
          @keyframes neon-pulse {
            0% { box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff; }
            100% { box-shadow: 0 0 40px #ff00ff, 0 0 60px #00ffff, 0 0 80px #ff00ff; }
          }
          
          @keyframes neon-float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
          }
          
          @keyframes neon-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
            75% { opacity: 1; }
            85% { opacity: 0.9; }
          }
          
          @keyframes neon-shape-glow {
            0% { border-color: #00ffff !important; box-shadow: 0 0 20px #00ffff; }
            100% { border-color: #ff00ff !important; box-shadow: 0 0 30px #ff00ff; }
          }
          
          @keyframes neon-ambient {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
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
            animation: galaxy-float 30s linear infinite, star-twinkle 2s ease-in-out infinite;
            background: radial-gradient(circle, #ffffff 0%, rgba(147,112,219,0.8) 70%, transparent 100%) !important;
            border-radius: 50%;
          }
          
          .theme-galaxy .shape {
            border-color: #9370db !important;
            animation: galaxy-shape-drift 25s ease-in-out infinite, cosmic-pulse 3s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(147,112,219,0.5), inset 0 0 30px rgba(138,43,226,0.2);
          }
          
          .theme-galaxy .bg-animation::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(2px 2px at 20px 30px, #fff, transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 90px 40px, #fff, transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 160px 30px, #fff, transparent);
            background-repeat: repeat;
            background-size: 200px 100px;
            animation: stars-move 20s linear infinite;
            pointer-events: none;
          }
          
          @keyframes galaxy-float {
            0% { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
            10% { opacity: 1; transform: translateY(90vh) rotate(36deg) scale(0.8); }
            50% { transform: translateY(50vh) rotate(180deg) scale(1.2); }
            90% { opacity: 1; transform: translateY(10vh) rotate(324deg) scale(0.8); }
            100% { transform: translateY(-10vh) rotate(360deg) scale(0.3); opacity: 0; }
          }
          
          @keyframes star-twinkle {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes galaxy-shape-drift {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
            75% { transform: translateY(-30px) rotate(270deg); }
          }
          
          @keyframes cosmic-pulse {
            0%, 100% { box-shadow: 0 0 30px rgba(147,112,219,0.5); }
            50% { box-shadow: 0 0 50px rgba(147,112,219,0.8), 0 0 80px rgba(138,43,226,0.4); }
          }
          
          @keyframes stars-move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100px); }
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
            animation: ocean-bubble 35s linear infinite, bubble-wobble 3s ease-in-out infinite;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(0,191,255,0.4) 70%, transparent 100%) !important;
            border-radius: 50%;
            border: 1px solid rgba(0,191,255,0.3);
          }
          
          .theme-ocean .wave {
            animation-duration: 25s;
            background: linear-gradient(45deg, 
              transparent 0%, 
              rgba(0,191,255,0.1) 25%, 
              transparent 50%, 
              rgba(30,144,255,0.1) 75%, 
              transparent 100%) !important;
          }
          
          .theme-ocean .shape {
            border-color: #00bfff !important;
            animation: ocean-drift 20s ease-in-out infinite, water-ripple 4s ease-in-out infinite;
            box-shadow: 0 0 25px rgba(0,191,255,0.4), inset 0 0 25px rgba(30,144,255,0.2);
          }
          
          .theme-ocean .bg-animation::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40%;
            background: 
              radial-gradient(ellipse at bottom, rgba(0,191,255,0.2) 0%, transparent 70%),
              linear-gradient(0deg, rgba(0,34,68,0.3) 0%, transparent 100%);
            animation: ocean-depth 6s ease-in-out infinite;
            pointer-events: none;
          }
          
          @keyframes ocean-bubble {
            0% { transform: translateY(100vh) translateX(0) scale(0.3); opacity: 0; }
            10% { opacity: 0.8; transform: translateY(90vh) translateX(10px) scale(0.6); }
            90% { opacity: 0.8; transform: translateY(10vh) translateX(-10px) scale(1); }
            100% { transform: translateY(-10vh) translateX(20px) scale(0.2); opacity: 0; }
          }
          
          @keyframes bubble-wobble {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          }
          
          @keyframes ocean-drift {
            0%, 100% { transform: translateY(0) scale(1); }
            33% { transform: translateY(-15px) scale(1.1); }
            66% { transform: translateY(-5px) scale(0.9); }
          }
          
          @keyframes water-ripple {
            0%, 100% { box-shadow: 0 0 25px rgba(0,191,255,0.4); }
            50% { box-shadow: 0 0 40px rgba(0,191,255,0.6), 0 0 60px rgba(30,144,255,0.3); }
          }
          
          @keyframes ocean-depth {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
        `;
        break;

      case 'halloween':
        animations = `
          .theme-halloween .brand .dot {
            display: none !important;
          }

          .theme-halloween .pumpkin-icon {
            display: block !important;
            font-size: 20px;
            animation: pumpkin-flicker 2s ease-in-out infinite;
          }

          @keyframes pumpkin-flicker {
            0%, 100% {
              filter: drop-shadow(0 0 8px #ff8c00) drop-shadow(0 0 12px #ff8c00);
              text-shadow: 0 0 10px #ff8c00;
            }
            50% {
              filter: drop-shadow(0 0 15px #ff6600) drop-shadow(0 0 20px #ff6600);
              text-shadow: 0 0 20px #ff6600;
            }
          }

          .theme-halloween .bg-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M10,30 Q15,25 20,30 T30,30" stroke="rgba(200,200,200,0.3)" fill="none" stroke-width="0.5"/><path d="M10,30 L20,40" stroke="rgba(200,200,200,0.3)" fill="none" stroke-width="0.3"/><path d="M30,30 L25,40" stroke="rgba(200,200,200,0.3)" fill="none" stroke-width="0.3"/></svg>'),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M60,20 Q65,15 70,20 T80,20" stroke="rgba(200,200,200,0.3)" fill="none" stroke-width="0.5"/><path d="M60,20 L70,30" stroke="rgba(200,200,200,0.3)" fill="none" stroke-width="0.3"/><path d="M80,20 L75,30" stroke="rgba(200,200,200,0.3)" fill="none" stroke-width="0.3"/></svg>');
            background-size: 150px 150px, 120px 120px;
            background-position: 0 0, 200px 100px;
            background-repeat: repeat;
            pointer-events: none;
            opacity: 0.4;
          }

          .theme-halloween .particle {
            animation: halloween-float 20s linear infinite, spider-crawl 8s ease-in-out infinite;
            background: radial-gradient(circle, rgba(255,140,0,0.8) 0%, rgba(204,112,0,0.4) 100%) !important;
          }

          .theme-halloween .particle::after {
            content: '👻';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
            animation: spider-rotate 4s linear infinite;
          }

          @keyframes halloween-float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
          }

          @keyframes spider-crawl {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(10px); }
            50% { transform: translateX(-5px); }
            75% { transform: translateX(8px); }
          }

          @keyframes spider-rotate {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
            25% { transform: translate(-50%, -50%) rotate(-15deg); }
            50% { transform: translate(-50%, -50%) rotate(15deg); }
            75% { transform: translate(-50%, -50%) rotate(-10deg); }
          }

          .theme-halloween .bg-animation::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><path d="M10,30 L30,20 L20,15 L30,10 L20,5 L25,0" stroke="rgba(139,69,19,0.5)" fill="none" stroke-width="2"/><ellipse cx="35" cy="35" rx="15" ry="8" fill="rgba(139,69,19,0.4)"/></svg>'),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><path d="M150,40 L170,30 L160,25 L170,20 L160,15 L165,10" stroke="rgba(139,69,19,0.5)" fill="none" stroke-width="2"/><ellipse cx="175" cy="45" rx="15" ry="8" fill="rgba(139,69,19,0.4)"/></svg>');
            background-size: 250px 150px, 220px 140px;
            background-position: 10% 15%, 80% 25%;
            background-repeat: no-repeat;
            animation: broom-fly 15s linear infinite;
            pointer-events: none;
            opacity: 0.6;
          }

          @keyframes broom-fly {
            0% { background-position: -300px 15%, 100vw 25%; }
            100% { background-position: 100vw 15%, -300px 25%; }
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
            animation: light-float 25s linear infinite, light-shimmer 3s ease-in-out infinite;
            background: radial-gradient(circle, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.3) 70%, transparent 100%) !important;
            position: fixed !important;
            z-index: 0 !important;
          }
          
          .theme-light .shape {
            border-color: rgba(26,26,26,0.2) !important;
            box-shadow: 0 0 15px rgba(26,26,26,0.1);
          }
          
          .theme-light .bg-animation::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 30% 20%, rgba(248,249,250,0.8) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(229,231,235,0.6) 0%, transparent 50%);
            animation: light-ambient 10s ease-in-out infinite;
            pointer-events: none;
          }
          
          @keyframes light-float {
            0% { transform: translateY(100vh) rotate(0deg) scale(0.8); opacity: 0; }
            20% { opacity: 0.4; transform: translateY(80vh) rotate(36deg) scale(1); }
            80% { opacity: 0.4; transform: translateY(20vh) rotate(324deg) scale(1.2); }
            100% { transform: translateY(-10vh) rotate(360deg) scale(0.6); opacity: 0; }
          }
          
          @keyframes light-shimmer {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          
          @keyframes light-ambient {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.05); }
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
    return localStorage.getItem('nobulem-theme') || this.defaultTheme;
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
