// Promotional Banner Component for nobulem.wtf
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
    if (document.getElementById('promo-banner') || document.querySelector('.promo-banner')) return;

    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Use non-ad-related class names to bypass ad blockers
    const banner = document.createElement('div');
    banner.id = 'promo-banner';
    banner.className = 'promo-banner site-announcement';
    banner.setAttribute('role', 'banner');
    banner.setAttribute('aria-label', 'Site announcement');
    banner.innerHTML = `
      <div class="promo-content">
        <span class="promo-icon">🎮</span>
        <span class="promo-text">For the best cheats, buy at <strong>bloxproducts</strong>!</span>
        <a href="https://bloxproducts.com/r/248772056" target="_blank" rel="noopener noreferrer" class="promo-button">
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
    if (document.getElementById('promo-banner-styles')) return;

    const style = document.createElement('style');
    style.id = 'promo-banner-styles';
    style.textContent = `
      .promo-banner {
        background: linear-gradient(135deg, #ff4444, #cc0000);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        position: sticky;
        top: 73px;
        z-index: 45;
        animation: banner-slide-down 0.8s ease;
      }

      .promo-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 8px 20px;
        flex-wrap: wrap;
        max-width: 1150px;
        margin: 0 auto;
      }

      .promo-icon {
        font-size: 20px;
        animation: icon-bounce 2s ease-in-out infinite;
      }

      .promo-text {
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      }

      .promo-text strong {
        color: #ffeb3b;
        font-weight: 900;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      }

      .promo-button {
        background: #ffeb3b;
        color: #000000;
        padding: 6px 18px;
        border-radius: 25px;
        font-weight: 900;
        font-size: 13px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.3s ease;
        box-shadow: 0 3px 12px rgba(255,235,59,0.4);
        position: relative;
        overflow: hidden;
      }

      .promo-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.6s ease;
      }

      .promo-button:hover::before {
        left: 100%;
      }

      .promo-button:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 5px 20px rgba(255,235,59,0.6);
        background: #fff59d;
      }

      .promo-button .arrow {
        font-size: 16px;
        transition: transform 0.3s ease;
        display: inline-block;
      }

      .promo-button:hover .arrow {
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
          transform: translateY(-4px) scale(1.1);
        }
      }

      @media (max-width: 768px) {
        .promo-banner {
          top: 60px;
        }

        .promo-content {
          flex-direction: column;
          gap: 6px;
          padding: 8px 15px;
          text-align: center;
        }

        .promo-text {
          font-size: 12px;
        }

        .promo-button {
          padding: 5px 14px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize promotional banner
new AdBanner();
