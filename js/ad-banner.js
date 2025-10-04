// AD Banner Component for nobulem.wtf
class AdBanner {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.createBanner();
      });
    } else {
      this.createBanner();
    }
  }

  createBanner() {
    // Check if banner already exists
    if (document.getElementById('ad-banner')) return;

    const nav = document.querySelector('.nav');
    if (!nav) return;

    const banner = document.createElement('div');
    banner.id = 'ad-banner';
    banner.className = 'ad-banner';
    banner.innerHTML = `
      <div class="ad-banner-content">
        <span class="ad-banner-icon">🎮</span>
        <span class="ad-banner-text">For the best cheats, buy at <strong>bloxproducts</strong>!</span>
        <a href="https://bloxproducts.com/r/248772056" target="_blank" rel="noopener noreferrer" class="ad-banner-button">
          Go Buy <span class="arrow">→</span>
        </a>
      </div>
    `;

    // Insert after nav
    nav.parentNode.insertBefore(banner, nav.nextSibling);

    // Add styles
    this.addStyles();
  }

  addStyles() {
    // Check if styles already exist
    if (document.getElementById('ad-banner-styles')) return;

    const style = document.createElement('style');
    style.id = 'ad-banner-styles';
    style.textContent = `
      .ad-banner {
        background: linear-gradient(135deg, #ff4444, #cc0000);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        position: sticky;
        top: 73px;
        z-index: 45;
        animation: banner-slide-down 0.8s ease;
      }

      .ad-banner-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 12px 20px;
        flex-wrap: wrap;
        max-width: 1150px;
        margin: 0 auto;
      }

      .ad-banner-icon {
        font-size: 24px;
        animation: icon-bounce 2s ease-in-out infinite;
      }

      .ad-banner-text {
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      }

      .ad-banner-text strong {
        color: #ffeb3b;
        font-weight: 900;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      }

      .ad-banner-button {
        background: #ffeb3b;
        color: #000000;
        padding: 8px 20px;
        border-radius: 25px;
        font-weight: 900;
        font-size: 14px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255,235,59,0.4);
        position: relative;
        overflow: hidden;
      }

      .ad-banner-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.6s ease;
      }

      .ad-banner-button:hover::before {
        left: 100%;
      }

      .ad-banner-button:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 25px rgba(255,235,59,0.6);
        background: #fff59d;
      }

      .ad-banner-button .arrow {
        font-size: 18px;
        transition: transform 0.3s ease;
        display: inline-block;
      }

      .ad-banner-button:hover .arrow {
        transform: translateX(5px);
      }

      @keyframes banner-slide-down {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes icon-bounce {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-5px) scale(1.1);
        }
      }

      @media (max-width: 768px) {
        .ad-banner {
          top: 60px;
        }

        .ad-banner-content {
          flex-direction: column;
          gap: 8px;
          padding: 10px 15px;
          text-align: center;
        }

        .ad-banner-text {
          font-size: 13px;
        }

        .ad-banner-button {
          padding: 6px 16px;
          font-size: 13px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize AD banner
new AdBanner();
