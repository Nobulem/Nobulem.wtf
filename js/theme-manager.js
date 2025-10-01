// Advanced Theme System for nobulem.wtf - Fixed Card Backgrounds
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
          secondary: '#888888',
          cardBg: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
          buttonBg: '#ffffff',
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
          navActive: '#000000',
          eyebrowColor: '#000000',
          subtitleColor: '#4a5568',
          borderColor: '#e5e7eb'
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

      // (neon, galaxy, ocean also included... not pasting full to save space)
    };

    this.currentTheme = this.loadTheme();
    this.isInitialized = false;
    this.init();
  }

  init() {
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
        margin-left: 12px;
      }
      .theme-button:hover {
        background: rgba(255,255,255,0.2);
      }
    `;
    document.head.appendChild(style);
  }

  createThemeSelector() {
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
            <div class="theme-option ${key === this.currentTheme ? 'active' : ''}" data-theme="${key}">
              <div class="theme-preview" data-theme="${key}">
                <div class="theme-preview-bg"></div>
                <div class="theme-preview-card"></div>
                <div class="theme-preview-text"></div>
              </div>
              <div class="theme-info">
                <div class="theme-name">
                  <span class="theme-emoji">${theme.icon}</span> ${theme.name}
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

  // ... rest of your functions (applyTheme, updateCardBackgrounds, etc.) stay same but re-indented
}

// Initialize
let themeManagerInstance = null;
function initThemeManager() {
  if (!themeManagerInstance) themeManagerInstance = new ThemeManager();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeManager);
} else {
  initThemeManager();
}
window.addEventListener('load', () => {
  if (!themeManagerInstance) initThemeManager();
});
