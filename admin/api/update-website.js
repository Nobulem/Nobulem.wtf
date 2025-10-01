// Enhanced Cloudflare Worker for updating website files with real data fetching
export default {
  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // Authentication check
      const apiKey = request.headers.get('X-API-Key');
      if (!apiKey || apiKey !== env.ADMIN_API_KEY) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Route handling
      if (path === '/api/get-data' && request.method === 'GET') {
        return await this.getCurrentData(request, env);
      } else if (path === '/api/update-games' && request.method === 'POST') {
        return await this.updateGamesFile(request, env);
      } else if (path === '/api/update-showcases' && request.method === 'POST') {
        return await this.updateShowcasesFile(request, env);
      } else if (path === '/api/update-developers' && request.method === 'POST') {
        return await this.updateDevelopersFile(request, env);
      } else if (path === '/api/update-homepage' && request.method === 'POST') {
        return await this.updateHomepage(request, env);
      } else if (path === '/api/update-featured' && request.method === 'POST') {
        return await this.updateFeaturedContent(request, env);
      } else if (path === '/api/update-icon' && request.method === 'POST') {
        return await this.updateWebsiteIcon(request, env);
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async getCurrentData(request, env) {
    try {
      // Get current files from GitHub
      const files = ['games/index.html', 'showcases/index.html', 'developers/index.html', 'index.html'];
      const fileContents = {};
      
      for (const file of files) {
        const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${file}`, {
          headers: {
            'Authorization': `token ${env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Nobulem-Admin-Panel'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          fileContents[file] = atob(data.content);
        }
      }
      
      // Parse data from files
      const parsedData = {
        games: this.parseGamesFromHTML(fileContents['games/index.html'] || ''),
        videos: this.parseVideosFromHTML(fileContents['showcases/index.html'] || ''),
        developers: this.parseDevelopersFromHTML(fileContents['developers/index.html'] || ''),
        featured: this.parseFeaturedFromHTML(fileContents['index.html'] || '')
      };
      
      return new Response(JSON.stringify(parsedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error getting current data:', error);
      return new Response(JSON.stringify({ error: 'Failed to get current data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async updateGamesFile(request, env) {
    try {
      const { games } = await request.json();
      
      // Get current games file
      const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/games/index.html`, {
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get games file');
      }
      
      const fileData = await response.json();
      let content = atob(fileData.content);
      
      // Generate new games HTML
      const gamesHtml = this.generateGamesHtml(games);
      
      // Replace games grid content - updated pattern to match your actual HTML structure
      const gamesGridPattern = /(<div class="games-grid" id="gamesGrid">)(.*?)(<\/div>\s*<!--.*?Pagination.*?-->|<\/div>\s*<\/div>\s*<\/section>)/s;
      content = content.replace(gamesGridPattern, `$1\n${gamesHtml}\n\n      $3`);
      
      // Update file on GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/games/index.html`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update games via admin panel',
          content: btoa(content),
          sha: fileData.sha,
          branch: env.GITHUB_BRANCH
        })
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update games file');
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Games updated successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating games:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async updateShowcasesFile(request, env) {
    try {
      const { videos } = await request.json();
      
      // Get current showcases file
      const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/showcases/index.html`, {
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get showcases file');
      }
      
      const fileData = await response.json();
      let content = atob(fileData.content);
      
      // Generate new videos HTML
      const videosHtml = this.generateVideosHtml(videos);
      
      // Replace videos grid content - updated pattern to match your actual HTML structure
      const videosGridPattern = /(<div class="videos-grid" id="videosGrid">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s;
      content = content.replace(videosGridPattern, `$1\n        <!-- Videos managed by admin panel -->\n${videosHtml}\n      $3`);
      
      // Update file on GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/showcases/index.html`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update showcases via admin panel',
          content: btoa(content),
          sha: fileData.sha,
          branch: env.GITHUB_BRANCH
        })
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update showcases file');
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Showcases updated successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating showcases:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async updateDevelopersFile(request, env) {
    try {
      const { developers } = await request.json();
      
      // Get current developers file
      const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/developers/index.html`, {
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get developers file');
      }
      
      const fileData = await response.json();
      let content = atob(fileData.content);
      
      // Generate new developers HTML
      const developersHtml = this.generateDevelopersHtml(developers);
      
      // Replace dev grid content - updated pattern to match your actual HTML structure
      const devGridPattern = /(<div class="dev-grid">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s;
      content = content.replace(devGridPattern, `$1\n${developersHtml}\n      $3`);
      
      // Update file on GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/developers/index.html`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update developers via admin panel',
          content: btoa(content),
          sha: fileData.sha,
          branch: env.GITHUB_BRANCH
        })
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update developers file');
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Developers updated successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating developers:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async updateFeaturedContent(request, env) {
    try {
      const { featuredGames, featuredShowcases, featuredDevelopers } = await request.json();
      
      // Get current homepage file
      const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/index.html`, {
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get homepage file');
      }
      
      const fileData = await response.json();
      let content = atob(fileData.content);
      
      // Update featured games section
      if (featuredGames && featuredGames.length > 0) {
        const gamesHtml = this.generateHomepageGamesHtml(featuredGames);
        const gamesPattern = /(<div class="grid three" style="margin-top:20px" id="latest-games">)(.*?)(<\/div>)/s;
        content = content.replace(gamesPattern, `$1\n        <!-- Featured games -->\n${gamesHtml}\n      $3`);
      }
      
      // Update featured showcases section
      if (featuredShowcases && featuredShowcases.length > 0) {
        const showcasesHtml = this.generateHomepageShowcasesHtml(featuredShowcases);
        const showcasesPattern = /(<div class="grid three" style="margin-top:20px" id="popular-showcases">)(.*?)(<\/div>)/s;
        content = content.replace(showcasesPattern, `$1\n        <!-- Featured showcases -->\n${showcasesHtml}\n      $3`);
      } else {
        // Show coming soon if no showcases
        const showcasesPattern = /(<div class="grid three" style="margin-top:20px" id="popular-showcases">)(.*?)(<\/div>)/s;
        const comingSoonHtml = `
        <div class="coming-soon">
          <div class="pulse-text reveal">🎬 Coming Soon!</div>
          <p class="muted reveal">Awesome showcase videos are on their way.</p>
          <div class="loader">
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
          </div>
        </div>`;
        content = content.replace(showcasesPattern, `$1\n${comingSoonHtml}\n      $3`);
      }
      
      // Update featured developers section
      if (featuredDevelopers && featuredDevelopers.length > 0) {
        const devsHtml = this.generateHomepageDevelopersHtml(featuredDevelopers);
        const devsPattern = /(<div class="dev-preview">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s;
        content = content.replace(devsPattern, `$1\n${devsHtml}\n      $3`);
      }
      
      // Update file on GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/index.html`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update featured content via admin panel',
          content: btoa(content),
          sha: fileData.sha,
          branch: env.GITHUB_BRANCH
        })
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update homepage file');
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Featured content updated successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating featured content:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async updateHomepage(request, env) {
    try {
      const { games, videos, developers } = await request.json();
      
      // Get current homepage file
      const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/index.html`, {
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get homepage file');
      }
      
      const fileData = await response.json();
      let content = atob(fileData.content);
      
      // Update latest games section (take first 3)
      if (games && Object.keys(games).length > 0) {
        const latestGames = Object.entries(games).slice(0, 3);
        const gamesHtml = this.generateHomepageGamesHtml(latestGames);
        const gamesPattern = /(<div class="grid three" style="margin-top:20px" id="latest-games">)(.*?)(<\/div>)/s;
        content = content.replace(gamesPattern, `$1\n        <!-- Latest games -->\n${gamesHtml}\n      $3`);
      }
      
      // Update showcases section
      if (videos && videos.length > 0) {
        const topVideos = videos.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 3);
        const showcasesHtml = this.generateHomepageShowcasesHtml(topVideos);
        const showcasesPattern = /(<div class="grid three" style="margin-top:20px" id="popular-showcases">)(.*?)(<\/div>)/s;
        content = content.replace(showcasesPattern, `$1\n        <!-- Popular showcases -->\n${showcasesHtml}\n      $3`);
      } else {
        // Show coming soon if no showcases
        const showcasesPattern = /(<div class="grid three" style="margin-top:20px" id="popular-showcases">)(.*?)(<\/div>)/s;
        const comingSoonHtml = `
        <div class="coming-soon">
          <div class="pulse-text reveal">🎬 Coming Soon!</div>
          <p class="muted reveal">Awesome showcase videos are on their way.</p>
          <div class="loader">
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
          </div>
        </div>`;
        content = content.replace(showcasesPattern, `$1\n${comingSoonHtml}\n      $3`);
      }
      
      // Update developers section (take first 3)
      if (developers && Object.keys(developers).length > 0) {
        const featuredDevs = Object.entries(developers).slice(0, 3);
        const devsHtml = this.generateHomepageDevelopersHtml(featuredDevs);
        const devsPattern = /(<div class="dev-preview">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s;
        content = content.replace(devsPattern, `$1\n${devsHtml}\n      $3`);
      }
      
      // Update file on GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/index.html`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Nobulem-Admin-Panel',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update homepage via admin panel',
          content: btoa(content),
          sha: fileData.sha,
          branch: env.GITHUB_BRANCH
        })
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update homepage file');
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Homepage updated successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating homepage:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async updateWebsiteIcon(request, env) {
    try {
      const { iconUrl } = await request.json();
      
      const files = ['index.html', 'games/index.html', 'showcases/index.html', 'developers/index.html', 'executors/index.html', 'pricing/index.html', 'tos/index.html'];
      const updatedFiles = [];
      
      for (const file of files) {
        try {
          // Get current file
          const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${file}`, {
            headers: {
              'Authorization': `token ${env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Nobulem-Admin-Panel'
            }
          });
          
          if (!response.ok) continue;
          
          const fileData = await response.json();
          let content = atob(fileData.content);
          
          // Update favicon
          const faviconPattern = /<link rel="icon" type="image\/png" href="[^"]*">/;
          const newFavicon = `<link rel="icon" type="image/png" href="${iconUrl}">`;
          content = content.replace(faviconPattern, newFavicon);
          
          // Update file on GitHub
          const updateResponse = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${file}`, {
            method: 'PUT',
            headers: {
              'Authorization': `token ${env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Nobulem-Admin-Panel',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: 'Update website icon via admin panel',
              content: btoa(content),
              sha: fileData.sha,
              branch: env.GITHUB_BRANCH
            })
          });
          
          if (updateResponse.ok) {
            updatedFiles.push(file);
          }
        } catch (error) {
          console.error(`Error updating ${file}:`, error);
        }
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Website icon updated in ${updatedFiles.length} files`,
        updatedFiles 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating website icon:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // HTML Generation Methods
  generateGamesHtml(games) {
    return Object.entries(games).map(([gameId, game]) => {
      const statusClass = `status-${game.status.toLowerCase()}`;
      const statusText = game.status;
      
      return `        <div class="game-card reveal delay-1" data-game-id="${gameId}" data-status="${game.status.toLowerCase()}" onclick="openGameModal('${gameId}')">
          <img src="${game.thumbnail}" alt="${game.name}" class="game-thumbnail">
          <div class="game-content">
            <h3 class="game-name">${game.name}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-status">
              <span class="status-badge ${statusClass}">${statusText}</span>
              <span class="game-id"># ${game.gameId}</span>
            </div>
          </div>
        </div>`;
    }).join('\n\n');
  },

  generateVideosHtml(videos) {
    return videos.map((video, index) => {
      const delayClass = `delay-${(index % 6) + 1}`;
      
      return `        <div class="video-card reveal ${delayClass}" data-date="${video.publishedAt}" onclick="openVideo('${video.url}')">
          <div class="video-thumbnail-container">
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
            <div class="play-overlay">
              <div class="play-button">▶</div>
            </div>
            <div class="video-duration">${video.duration}</div>
          </div>
          <div class="video-content">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
            <div class="video-meta">
              <div class="video-date">
                <span>📅</span>
                <span>${video.dateDisplay}</span>
              </div>
              <div class="video-views">${video.views}</div>
            </div>
            <div class="video-channel">${video.channel}</div>
          </div>
        </div>`;
    }).join('\n\n');
  },

  generateDevelopersHtml(developers) {
    return Object.entries(developers).map(([devId, dev]) => {
      const skillsHtml = dev.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('\n            ');
      
      return `        <div class="dev-card scroll-reveal">
          <div class="dev-avatar">
            <img src="${dev.avatar}" alt="${dev.name}">
          </div>
          <h3 class="dev-name">${dev.name}</h3>
          <div class="dev-role">${dev.role}</div>
          <p class="dev-description">
            ${dev.description}
          </p>
          <div class="skill-tags">
            ${skillsHtml}
          </div>
          <div class="dev-stats">
            <div class="stat">
              <span class="stat-number">Pro</span>
              <span class="stat-label">Level</span>
            </div>
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Quality</span>
            </div>
            <div class="stat">
              <span class="stat-number">∞</span>
              <span class="stat-label">Skills</span>
            </div>
          </div>
        </div>`;
    }).join('\n\n');
  },

  generateHomepageGamesHtml(games) {
    return games.map(([gameId, game], index) => {
      const delayClass = `delay-${index + 1}`;
      return `        <div class="game-card reveal ${delayClass}" onclick="window.location.href='/games'">
          <img src="${game.thumbnail}" alt="${game.name}" class="game-image">
          <div class="game-content">
            <h3>${game.name}</h3>
            <p>${game.description.substring(0, 100)}${game.description.length > 100 ? '...' : ''}</p>
            <div class="game-id"># ${game.gameId}</div>
          </div>
        </div>`;
    }).join('\n');
  },

  generateHomepageShowcasesHtml(videos) {
    return videos.map((video, index) => {
      const delayClass = `delay-${index + 1}`;
      return `        <div class="showcase-card reveal ${delayClass}" onclick="window.open('${video.url}', '_blank')">
          <div class="showcase-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="showcase-content">
            <h3 class="showcase-title">${video.title.substring(0, 40)}${video.title.length > 40 ? '...' : ''}</h3>
            <p class="showcase-views">${video.views}</p>
          </div>
        </div>`;
    }).join('\n');
  },

  generateHomepageDevelopersHtml(developers) {
    return developers.map(([devId, dev], index) => {
      const delayClass = `delay-${index + 1}`;
      return `        <div class="dev-card-mini reveal ${delayClass}" onclick="window.location.href='/developers'">
          <div class="dev-avatar-mini">
            <img src="${dev.avatar}" alt="${dev.name}">
          </div>
          <h3 class="dev-name-mini">${dev.name}</h3>
          <p class="dev-role-mini">${dev.role}</p>
        </div>`;
    }).join('\n');
  },

  // Parsing Methods - Fixed to match your actual HTML structure
  parseGamesFromHTML(html) {
    const games = {};
    
    // Updated regex to match your actual game card structure
    const gamePattern = /<div class="game-card[^>]*data-game-id="([^"]+)"[^>]*data-status="([^"]+)"[^>]*onclick="openGameModal\('([^']+)'\)"[^>]*>.*?<img src="([^"]+)"[^>]*alt="([^"]+)"[^>]*class="game-thumbnail">.*?<h3 class="game-name">([^<]+)<\/h3>.*?<p class="game-description">([^<]+)<\/p>.*?<span class="status-badge[^"]*">([^<]+)<\/span>.*?<span class="game-id"># ([^<]+)<\/span>/gs;
    
    let match;
    while ((match = gamePattern.exec(html)) !== null) {
      const [, gameId, status, modalId, thumbnail, alt, name, description, statusText, gameNumber] = match;
      games[gameId] = {
        name: name.trim(),
        thumbnail: thumbnail.trim(),
        description: description.trim(),
        status: statusText.trim(),
        gameId: gameNumber.trim(),
        features: this.getGameFeatures(gameId)
      };
    }
    
    return games;
  },

  parseVideosFromHTML(html) {
    const videos = [];
    
    // Updated regex to match your actual video card structure
    const videoPattern = /<div class="video-card[^>]*data-date="([^"]*)"[^>]*onclick="openVideo\('([^']*)'[^>]*>.*?<img src="([^"]*)"[^>]*alt="([^"]*)"[^>]*class="video-thumbnail">.*?<div class="video-duration">([^<]*)<\/div>.*?<h3 class="video-title">([^<]*)<\/h3>.*?<p class="video-description">([^<]*)<\/p>.*?<div class="video-views">([^<]*)<\/div>.*?<div class="video-channel">([^<]*)<\/div>/gs;
    
    let match;
    while ((match = videoPattern.exec(html)) !== null) {
      const [, date, url, thumbnail, alt, duration, title, description, views, channel] = match;
      const videoId = this.extractVideoId(url);
      
      videos.push({
        id: videoId,
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim(),
        url: url.trim(),
        publishedAt: date,
        duration: duration.trim(),
        views: views.trim(),
        viewCount: this.parseViewCount(views.trim()),
        channel: channel.trim(),
        dateDisplay: this.formatDateDisplay(date)
      });
    }
    
    return videos;
  },

  parseDevelopersFromHTML(html) {
    const developers = {};
    
    // Updated regex to match your actual developer card structure
    const devPattern = /<div class="dev-card[^>]*>.*?<img src="([^"]+)"[^>]*alt="([^"]+)"[^>]*>.*?<h3 class="dev-name">([^<]+)<\/h3>.*?<div class="dev-role">([^<]+)<\/div>.*?<p class="dev-description">\s*(.*?)\s*<\/p>.*?<div class="skill-tags">(.*?)<\/div>/gs;
    
    let match;
    while ((match = devPattern.exec(html)) !== null) {
      const [, avatar, alt, name, role, description, skillsHtml] = match;
      const devId = name.trim().toLowerCase().replace('@', '').replace(/\s+/g, '-');
      
      // Extract skills
      const skills = [];
      const skillPattern = /<span class="skill-tag">([^<]+)<\/span>/g;
      let skillMatch;
      while ((skillMatch = skillPattern.exec(skillsHtml)) !== null) {
        skills.push(skillMatch[1].trim());
      }
      
      developers[devId] = {
        name: name.trim(),
        role: role.trim(),
        description: description.trim().replace(/\s+/g, ' '),
        avatar: avatar.trim(),
        skills: skills
      };
    }
    
    return developers;
  },

  parseFeaturedFromHTML(html) {
    const featured = {
      games: [],
      showcases: [],
      developers: []
    };

    // Parse featured games from homepage
    const gamesPattern = /<div class="grid three"[^>]*id="latest-games"[^>]*>(.*?)<\/div>/s;
    const gamesMatch = html.match(gamesPattern);
    if (gamesMatch) {
      const gameCardPattern = /<div class="game-card[^>]*>.*?<h3>([^<]+)<\/h3>.*?<div class="game-id"># ([^<]+)<\/div>/gs;
      let gameMatch;
      while ((gameMatch = gameCardPattern.exec(gamesMatch[1])) !== null) {
        featured.games.push({
          name: gameMatch[1].trim(),
          gameId: gameMatch[2].trim()
        });
      }
    }

    // Parse featured showcases from homepage
    const showcasesPattern = /<div class="grid three"[^>]*id="popular-showcases"[^>]*>(.*?)<\/div>/s;
    const showcasesMatch = html.match(showcasesPattern);
    if (showcasesMatch && !showcasesMatch[1].includes('Coming Soon')) {
      const showcasePattern = /<div class="showcase-card[^>]*onclick="window\.open\('([^']+)'[^>]*>.*?<h3 class="showcase-title">([^<]+)<\/h3>/gs;
      let showcaseMatch;
      while ((showcaseMatch = showcasePattern.exec(showcasesMatch[1])) !== null) {
        featured.showcases.push({
          url: showcaseMatch[1].trim(),
          title: showcaseMatch[2].trim()
        });
      }
    }

    // Parse featured developers from homepage  
    const developersPattern = /<div class="dev-preview">(.*?)<\/div>\s*<\/div>\s*<\/section>/s;
    const developersMatch = html.match(developersPattern);
    if (developersMatch) {
      const devCardPattern = /<div class="dev-card-mini[^>]*>.*?<h3 class="dev-name-mini">([^<]+)<\/h3>/gs;
      let devMatch;
      while ((devMatch = devCardPattern.exec(developersMatch[1])) !== null) {
        featured.developers.push({
          name: devMatch[1].trim()
        });
      }
    }

    return featured;
  },

  // Helper methods
  getGameFeatures(gameId) {
    const gameFeatures = {
      'untitled-boxing': ['Perfect Dodge Timing', 'Player Chams', 'Combat ESP', 'Auto Block', 'Punch Prediction', 'Health Monitoring'],
      'marvelous-playground': ['Kill All Players', 'Kill Selected Player', 'ESP', 'Player Highlighting', 'Player Targeting System', 'Auto Combat', 'Damage Multiplier'],
      'project-power': ['Kill All Players', 'Kill Selected Player', 'ESP Overlay', 'Power-up Automation', 'Player Detection', 'Auto Abilities'],
      'doomspire-brickbattle': ['Auto Build Towers', 'Rocket Spam', 'Team Coordination', 'Building ESP', 'Auto Repair', 'Strategic Positioning'],
      '99-nights-forest': ['Auto Resource Gathering', 'Monster Detection ESP', 'Night Vision', 'Survival Automation', 'Item Collection', 'Danger Alerts'],
      'hyper-shot': ['Aimbot System', 'Wallhack ESP', 'Weapon Modifications', 'Auto Reload', 'Precision Targeting', 'Recoil Control']
    };
    return gameFeatures[gameId] || [];
  },

  // Utility Methods
  extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([\w-]+)/,
      /(?:youtu\.be\/)([\w-]+)/,
      /(?:youtube\.com\/embed\/)([\w-]+)/,
      /(?:youtube\.com\/v\/)([\w-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  },

  parseViewCount(viewsStr) {
    try {
      const cleanViews = viewsStr.replace(' views', '').replace(',', '').trim();
      
      if (cleanViews.includes('K')) {
        return parseInt(parseFloat(cleanViews.replace('K', '')) * 1000);
      } else if (cleanViews.includes('M')) {
        return parseInt(parseFloat(cleanViews.replace('M', '')) * 1000000);
      } else if (cleanViews.includes('B')) {
        return parseInt(parseFloat(cleanViews.replace('B', '')) * 1000000000);
      } else {
        return parseInt(cleanViews) || 0;
      }
    } catch {
      return 0;
    }
  },

  formatDateDisplay(dateStr) {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Unknown Date';
    }
  }
};
