// Enhanced Admin Panel JavaScript with Real File Updates and Featured Content Selection
class AdminPanel {
  constructor() {
    this.currentUser = '';
    this.currentEditId = null;
    this.data = {
      games: {},
      videos: [],
      developers: {},
      featured: {
        games: [],
        showcases: [],
        developers: []
      }
    };
    
    // API configuration
    this.apiUrl = 'https://nobulem-admin-api.nobulem.workers.dev';
    this.apiKey = 'nobulem-690-secret';
    
    // Load data from server
    this.loadDataFromServer();
  }

  // API Methods
  async makeApiCall(endpoint, method = 'GET', data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'API request failed');
      }
      
      return result;
    } catch (error) {
      console.error('API Error:', error);
      this.showNotification(`API Error: ${error.message}`, 'error');
      throw error;
    }
  }

  async loadDataFromServer() {
    try {
      this.showNotification('Loading real data from website files...', 'success');
      const serverData = await this.makeApiCall('/api/get-data');
      
      if (serverData) {
        this.data = {
          games: serverData.games || {},
          videos: serverData.videos || [],
          developers: serverData.developers || {},
          featured: serverData.featured || { games: [], showcases: [], developers: [] }
        };
        
        // Also save to localStorage as backup
        localStorage.setItem('nobulemAdminData', JSON.stringify(this.data));
        this.updateStats();
        this.showNotification('Real website data loaded successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to load from server, using local data:', error);
      this.loadDataFromLocal();
      this.showNotification('Using local data (server unavailable)', 'error');
    }
  }

  loadDataFromLocal() {
    const savedData = localStorage.getItem('nobulemAdminData');
    if (savedData) {
      try {
        this.data = JSON.parse(savedData);
      } catch (e) {
        console.error('Error loading local data:', e);
        this.initializeDefaultData();
      }
    } else {
      this.initializeDefaultData();
    }
    this.updateStats();
  }

  async saveDataToServer() {
    try {
      // Save to localStorage first
      localStorage.setItem('nobulemAdminData', JSON.stringify(this.data));
      
      // Update individual files on server
      await Promise.all([
        this.makeApiCall('/api/update-games', 'POST', { games: this.data.games }),
        this.makeApiCall('/api/update-showcases', 'POST', { videos: this.data.videos }),
        this.makeApiCall('/api/update-developers', 'POST', { developers: this.data.developers })
      ]);
      
      this.showNotification('All changes saved to website!', 'success');
      return true;
    } catch (error) {
      console.error('Failed to save to server:', error);
      this.showNotification('Failed to save to server. Changes saved locally.', 'error');
      return false;
    }
  }

  async updateFeaturedContent() {
    try {
      // Get selected featured items
      const featuredGames = this.getSelectedFeaturedGames();
      const featuredShowcases = this.getSelectedFeaturedShowcases();  
      const featuredDevelopers = this.getSelectedFeaturedDevelopers();

      await this.makeApiCall('/api/update-featured', 'POST', {
        featuredGames,
        featuredShowcases,
        featuredDevelopers
      });
      
      this.showNotification('Featured content updated on homepage!', 'success');
      return true;
    } catch (error) {
      console.error('Failed to update featured content:', error);
      this.showNotification('Failed to update featured content on server', 'error');
      return false;
    }
  }

  async updateHomepageOnServer() {
    try {
      await this.makeApiCall('/api/update-homepage', 'POST', {
        games: this.data.games,
        videos: this.data.videos,
        developers: this.data.developers
      });
      
      this.showNotification('Homepage updated successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Failed to update homepage:', error);
      this.showNotification('Failed to update homepage on server', 'error');
      return false;
    }
  }

  async updateWebsiteIconOnServer(iconUrl) {
    try {
      const result = await this.makeApiCall('/api/update-icon', 'POST', { iconUrl });
      this.showNotification(`Website icon updated in ${result.updatedFiles?.length || 0} files!`, 'success');
      return true;
    } catch (error) {
      console.error('Failed to update website icon:', error);
      this.showNotification('Failed to update website icon on server', 'error');
      return false;
    }
  }

  // Featured Content Selection Methods
  getSelectedFeaturedGames() {
    const checkboxes = document.querySelectorAll('input[name="featured-games"]:checked');
    const selected = [];
    
    checkboxes.forEach(checkbox => {
      const gameId = checkbox.value;
      const game = this.data.games[gameId];
      if (game) {
        selected.push([gameId, game]);
      }
    });
    
    return selected.slice(0, 3); // Limit to 3
  }

  getSelectedFeaturedShowcases() {
    const checkboxes = document.querySelectorAll('input[name="featured-showcases"]:checked');
    const selected = [];
    
    checkboxes.forEach(checkbox => {
      const videoIndex = parseInt(checkbox.value);
      const video = this.data.videos[videoIndex];
      if (video) {
        selected.push(video);
      }
    });
    
    return selected.slice(0, 3); // Limit to 3
  }

  getSelectedFeaturedDevelopers() {
    const checkboxes = document.querySelectorAll('input[name="featured-developers"]:checked');
    const selected = [];
    
    checkboxes.forEach(checkbox => {
      const devId = checkbox.value;
      const developer = this.data.developers[devId];
      if (developer) {
        selected.push([devId, developer]);
      }
    });
    
    return selected.slice(0, 3); // Limit to 3
  }

  // Authentication
  login(username, password) {
    const validCredentials = {
      'ghost': 'animegirlsarecool',
      'ace': 'nnma1983',
      'emplic': 'wizardcum420',
      'Loaf': 'tsbpro123'
    };

    if (validCredentials[username] && validCredentials[username] === password) {
      this.currentUser = username;
      localStorage.setItem('adminUser', username);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = '';
    localStorage.removeItem('adminUser');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
  }

  // Data Management
  initializeDefaultData() {
    this.data = {
      games: {},
      videos: [],
      developers: {},
      featured: {
        games: [],
        showcases: [],
        developers: []
      }
    };
  }

  // UI Management
  showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    this.refreshSection(sectionId);
  }

  refreshSection(sectionId) {
    switch(sectionId) {
      case 'overview':
        this.updateStats();
        break;
      case 'games':
        this.renderGamesTable();
        break;
      case 'showcases':
        this.renderVideosTable();
        break;
      case 'developers':
        this.renderDevelopersTable();
        break;
      case 'featured':
        this.renderFeaturedSection();
        break;
    }
  }

  updateStats() {
    const totalGames = Object.keys(this.data.games).length;
    const workingGames = Object.values(this.data.games).filter(g => g.status === 'Working').length;
    const totalVideos = this.data.videos.length;
    const totalDevelopers = Object.keys(this.data.developers).length;

    document.getElementById('totalGames').textContent = totalGames;
    document.getElementById('workingGames').textContent = workingGames;
    document.getElementById('totalVideos').textContent = totalVideos;
    document.getElementById('totalDevelopers').textContent = totalDevelopers;
  }

  // Featured Content Section
  renderFeaturedSection() {
    this.renderFeaturedGames();
    this.renderFeaturedShowcases();
    this.renderFeaturedDevelopers();
  }

  renderFeaturedGames() {
    const container = document.getElementById('featuredGamesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(this.data.games).forEach(([gameId, game]) => {
      const isSelected = this.data.featured.games.some(fg => fg.name === game.name);
      
      const gameElement = document.createElement('div');
      gameElement.className = 'featured-item';
      gameElement.innerHTML = `
        <div class="featured-item-content">
          <img src="${game.thumbnail}" alt="${game.name}" class="featured-thumbnail">
          <div class="featured-info">
            <h4>${game.name}</h4>
            <p># ${game.gameId}</p>
          </div>
          <label class="featured-checkbox">
            <input type="checkbox" name="featured-games" value="${gameId}" ${isSelected ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
        </div>
      `;
      container.appendChild(gameElement);
    });
  }

  renderFeaturedShowcases() {
    const container = document.getElementById('featuredShowcasesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.data.videos.forEach((video, index) => {
      const isSelected = this.data.featured.showcases.some(fs => fs.title === video.title);
      
      const videoElement = document.createElement('div');
      videoElement.className = 'featured-item';
      videoElement.innerHTML = `
        <div class="featured-item-content">
          <img src="${video.thumbnail}" alt="${video.title}" class="featured-thumbnail">
          <div class="featured-info">
            <h4>${video.title.substring(0, 40)}${video.title.length > 40 ? '...' : ''}</h4>
            <p>${video.views}</p>
          </div>
          <label class="featured-checkbox">
            <input type="checkbox" name="featured-showcases" value="${index}" ${isSelected ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
        </div>
      `;
      container.appendChild(videoElement);
    });
    
    if (this.data.videos.length === 0) {
      container.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">No showcases available</p>';
    }
  }

  renderFeaturedDevelopers() {
    const container = document.getElementById('featuredDevelopersContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(this.data.developers).forEach(([devId, developer]) => {
      const isSelected = this.data.featured.developers.some(fd => fd.name === developer.name);
      
      const devElement = document.createElement('div');
      devElement.className = 'featured-item';
      devElement.innerHTML = `
        <div class="featured-item-content">
          <img src="${developer.avatar}" alt="${developer.name}" class="featured-thumbnail" style="border-radius: 50%;">
          <div class="featured-info">
            <h4>${developer.name}</h4>
            <p>${developer.role}</p>
          </div>
          <label class="featured-checkbox">
            <input type="checkbox" name="featured-developers" value="${devId}" ${isSelected ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
        </div>
      `;
      container.appendChild(devElement);
    });
  }

  // Games Management
  renderGamesTable() {
    const tbody = document.getElementById('gamesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    Object.entries(this.data.games).forEach(([gameId, game]) => {
      const statusClass = `status-${game.status.toLowerCase()}`;
      const statusText = game.status;
      
      const row = document.createElement('div');
      row.className = 'table-row';
      row.innerHTML = `
        <div class="game-name-cell">
          <img src="${game.thumbnail}" alt="${game.name}" class="preview-image">
          <div class="game-info">
            <div class="game-title">${game.name}</div>
            <div class="game-id"># ${game.gameId}</div>
          </div>
        </div>
        <div>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        <div># ${game.gameId}</div>
        <div class="table-actions">
          <button class="btn btn-secondary btn-small" onclick="editGame('${gameId}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteGame('${gameId}')">Delete</button>
        </div>
      `;
      tbody.appendChild(row);
    });
  }

  async addGame(gameData) {
    const gameId = this.generateGameId(gameData.name);
    this.data.games[gameId] = {
      name: gameData.name,
      thumbnail: gameData.thumbnail,
      description: gameData.description,
      status: gameData.status,
      gameId: gameData.gameId,
      features: gameData.features || []
    };
    
    // Save to server
    const saved = await this.saveDataToServer();
    if (saved) {
      this.renderGamesTable();
      this.showNotification('Game added and website updated!', 'success');
    }
  }

  editGame(gameId) {
    const game = this.data.games[gameId];
    if (!game) return;

    this.currentEditId = gameId;
    
    document.getElementById('gameModalTitle').textContent = 'Edit Game';
    document.getElementById('gameName').value = game.name;
    document.getElementById('gameId').value = game.gameId;
    document.getElementById('gameThumbnail').value = game.thumbnail;
    document.getElementById('gameDescription').value = game.description;
    document.getElementById('gameStatus').value = game.status;
    document.getElementById('gameFeatures').value = game.features.join(', ');
    
    this.showModal('gameModal');
  }

  async deleteGame(gameId) {
    const game = this.data.games[gameId];
    if (!game) return;

    if (confirm(`Are you sure you want to delete "${game.name}"?`)) {
      delete this.data.games[gameId];
      
      const saved = await this.saveDataToServer();
      if (saved) {
        this.renderGamesTable();
        this.showNotification('Game deleted and website updated!', 'success');
      }
    }
  }

  // Videos Management
  renderVideosTable() {
    const tbody = document.getElementById('videosTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    this.data.videos.forEach((video, index) => {
      const row = document.createElement('div');
      row.className = 'table-row';
      row.innerHTML = `
        <div class="game-name-cell">
          <img src="${video.thumbnail}" alt="${video.title}" class="preview-image">
          <div class="game-info">
            <div class="game-title">${video.title.substring(0, 40)}...</div>
            <div class="game-id">${video.dateDisplay}</div>
          </div>
        </div>
        <div>${video.views}</div>
        <div>${video.channel}</div>
        <div class="table-actions">
          <button class="btn btn-secondary btn-small" onclick="openVideo('${video.url}')">View</button>
          <button class="btn btn-danger btn-small" onclick="deleteVideo(${index})">Delete</button>
        </div>
      `;
      tbody.appendChild(row);
    });
  }

  async addVideo(url, customDescription = '') {
    const videoId = this.extractVideoId(url);
    if (!videoId) {
      this.showNotification('Invalid YouTube URL!', 'error');
      return;
    }

    if (this.data.videos.some(v => v.id === videoId)) {
      this.showNotification('Video already exists!', 'error');
      return;
    }

    try {
      const videoInfo = await this.fetchVideoInfo(videoId);
      if (!videoInfo) {
        this.showNotification('Could not fetch video information!', 'error');
        return;
      }

      const video = {
        id: videoId,
        title: videoInfo.title,
        description: customDescription || videoInfo.description || 'Script showcase and gameplay demonstration.',
        thumbnail: videoInfo.thumbnail,
        url: url,
        publishedAt: new Date().toISOString(),
        duration: videoInfo.duration || 'N/A',
        views: videoInfo.views || 'N/A',
        viewCount: videoInfo.viewCount || 0,
        channel: videoInfo.channel || 'Unknown',
        dateDisplay: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      };

      this.data.videos.unshift(video);
      
      const saved = await this.saveDataToServer();
      if (saved) {
        this.renderVideosTable();
        this.showNotification('Video added and website updated!', 'success');
      }
    } catch (error) {
      this.showNotification('Error adding video: ' + error.message, 'error');
    }
  }

  async deleteVideo(index) {
    const video = this.data.videos[index];
    if (!video) return;

    if (confirm(`Are you sure you want to delete "${video.title}"?`)) {
      this.data.videos.splice(index, 1);
      
      const saved = await this.saveDataToServer();
      if (saved) {
        this.renderVideosTable();
        this.showNotification('Video deleted and website updated!', 'success');
      }
    }
  }

  // Developers Management
  renderDevelopersTable() {
    const tbody = document.getElementById('developersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    Object.entries(this.data.developers).forEach(([devId, dev]) => {
      const row = document.createElement('div');
      row.className = 'table-row';
      row.innerHTML = `
        <div class="game-name-cell">
          <img src="${dev.avatar}" alt="${dev.name}" class="preview-image" style="border-radius: 50%;">
          <div class="game-info">
            <div class="game-title">${dev.name}</div>
            <div class="game-id">${dev.role}</div>
          </div>
        </div>
        <div>${dev.role}</div>
        <div>${dev.skills.slice(0, 2).join(', ')}${dev.skills.length > 2 ? '...' : ''}</div>
        <div class="table-actions">
          <button class="btn btn-secondary btn-small" onclick="editDeveloper('${devId}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteDeveloper('${devId}')">Delete</button>
        </div>
      `;
      tbody.appendChild(row);
    });
  }

  async addDeveloper(devData) {
    const devId = this.generateDeveloperId(devData.name);
    this.data.developers[devId] = {
      name: devData.name,
      role: devData.role,
      description: devData.description,
      avatar: devData.avatar,
      skills: devData.skills || []
    };
    
    const saved = await this.saveDataToServer();
    if (saved) {
      this.renderDevelopersTable();
      this.showNotification('Developer added and website updated!', 'success');
    }
  }

  editDeveloper(devId) {
    const dev = this.data.developers[devId];
    if (!dev) return;

    this.currentEditId = devId;
    
    document.getElementById('developerModalTitle').textContent = 'Edit Developer';
    document.getElementById('developerName').value = dev.name;
    document.getElementById('developerRole').value = dev.role;
    document.getElementById('developerAvatar').value = dev.avatar;
    document.getElementById('developerBio').value = dev.description;
    document.getElementById('developerSkills').value = dev.skills.join(', ');
    
    this.showModal('developerModal');
  }

  async deleteDeveloper(devId) {
    const dev = this.data.developers[devId];
    if (!dev) return;

    if (confirm(`Are you sure you want to delete "${dev.name}"?`)) {
      delete this.data.developers[devId];
      
      const saved = await this.saveDataToServer();
      if (saved) {
        this.renderDevelopersTable();
        this.showNotification('Developer deleted and website updated!', 'success');
      }
    }
  }

  // Utility Functions
  generateGameId(name) {
    let baseId = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    let counter = 1;
    let gameId = baseId;
    
    while (this.data.games[gameId]) {
      gameId = `${baseId}-${counter}`;
      counter++;
    }
    
    return gameId;
  }

  generateDeveloperId(name) {
    let baseId = name.toLowerCase().replace('@', '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    let counter = 1;
    let devId = baseId;
    
    while (this.data.developers[devId]) {
      devId = `${baseId}-${counter}`;
      counter++;
    }
    
    return devId;
  }

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
  }

  async fetchVideoInfo(videoId) {
    // Mock video info since we can't use YouTube API directly
    return {
      title: `Video ${videoId}`,
      description: 'Script showcase and gameplay demonstration.',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: 'N/A',
      views: 'N/A',
      viewCount: 0,
      channel: 'Unknown'
    };
  }

  // Modal Management
  showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
    
    if (modalId === 'gameModal' && !this.currentEditId) {
      document.getElementById('gameModalTitle').textContent = 'Add New Game';
      document.querySelector('#gameModal form').reset();
    }
    if (modalId === 'developerModal' && !this.currentEditId) {
      document.getElementById('developerModalTitle').textContent = 'Add New Developer';
      document.querySelector('#developerModal form').reset();
    }
    
    this.currentEditId = null;
  }

  // Notifications
  showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);
  }

  // Export/Import
  exportData() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `nobulem-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    this.showNotification('Data exported successfully!', 'success');
  }

  async importData() {
    const importText = document.getElementById('importData').value.trim();
    if (!importText) {
      this.showNotification('Please paste JSON data to import!', 'error');
      return;
    }

    try {
      const importedData = JSON.parse(importText);
      
      if (!importedData.games || !importedData.videos || !importedData.developers) {
        throw new Error('Invalid data format');
      }

      this.data = importedData;
      
      const saved = await this.saveDataToServer();
      if (saved) {
        this.refreshSection('overview');
        this.hideModal('importModal');
        this.showNotification('Data imported and website updated!', 'success');
      }
    } catch (error) {
      this.showNotification('Error importing data: Invalid JSON format', 'error');
    }
  }

  // Website Updates
  async updateWebsiteIcon() {
    const newIcon = document.getElementById('websiteIcon').value.trim();
    if (!newIcon) {
      this.showNotification('Please enter a valid icon URL!', 'error');
      return;
    }

    await this.updateWebsiteIconOnServer(newIcon);
  }

  async syncHomepage() {
    await this.updateHomepageOnServer();
  }

  async syncFeaturedContent() {
    await this.updateFeaturedContent();
  }

  async confirmReset() {
    if (confirm('Are you sure you want to reset ALL data? This cannot be undone!')) {
      if (confirm('This will delete all games, videos, and developers. Are you absolutely sure?')) {
        this.data = { games: {}, videos: [], developers: {}, featured: { games: [], showcases: [], developers: [] } };
        
        const saved = await this.saveDataToServer();
        if (saved) {
          this.refreshSection('overview');
          this.showNotification('All data has been reset and website updated!', 'success');
        }
      }
    }
  }

  openVideo(url) {
    window.open(url, '_blank');
  }
}

// Global admin instance
const admin = new AdminPanel();

// Event Handlers
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (admin.login(username, password)) {
    document.getElementById('currentUser').textContent = username;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    admin.updateStats();
    admin.renderGamesTable();
  } else {
    document.getElementById('loginError').style.display = 'block';
    setTimeout(() => {
      document.getElementById('loginError').style.display = 'none';
    }, 3000);
  }
}

function logout() {
  admin.logout();
}

function showSection(sectionId) {
  admin.showSection(sectionId);
}

function showModal(modalId) {
  admin.showModal(modalId);
}

function hideModal(modalId) {
  admin.hideModal(modalId);
}

async function saveGame(event) {
  event.preventDefault();
  
  const gameData = {
    name: document.getElementById('gameName').value.trim(),
    gameId: document.getElementById('gameId').value.trim(),
    thumbnail: document.getElementById('gameThumbnail').value.trim(),
    description: document.getElementById('gameDescription').value.trim(),
    status: document.getElementById('gameStatus').value,
    features: document.getElementById('gameFeatures').value.split(',').map(f => f.trim()).filter(f => f)
  };

  if (admin.currentEditId) {
    admin.data.games[admin.currentEditId] = gameData;
    const saved = await admin.saveDataToServer();
    if (saved) {
      admin.renderGamesTable();
      admin.showNotification('Game updated and website updated!', 'success');
    }
  } else {
    await admin.addGame(gameData);
  }
  
  admin.hideModal('gameModal');
}

async function saveVideo(event) {
  event.preventDefault();
  
  const url = document.getElementById('videoUrl').value.trim();
  const description = document.getElementById('videoDescription').value.trim();
  
  await admin.addVideo(url, description);
  admin.hideModal('videoModal');
}

async function saveDeveloper(event) {
  event.preventDefault();
  
  const devData = {
    name: document.getElementById('developerName').value.trim(),
    role: document.getElementById('developerRole').value.trim(),
    avatar: document.getElementById('developerAvatar').value.trim(),
    description: document.getElementById('developerBio').value.trim(),
    skills: document.getElementById('developerSkills').value.split(',').map(s => s.trim()).filter(s => s)
  };

  if (admin.currentEditId) {
    admin.data.developers[admin.currentEditId] = devData;
    const saved = await admin.saveDataToServer();
    if (saved) {
      admin.renderDevelopersTable();
      admin.showNotification('Developer updated and website updated!', 'success');
    }
  } else {
    await admin.addDeveloper(devData);
  }
  
  admin.hideModal('developerModal');
}

function editGame(gameId) {
  admin.editGame(gameId);
}

function deleteGame(gameId) {
  admin.deleteGame(gameId);
}

function editDeveloper(devId) {
  admin.editDeveloper(devId);
}

function deleteDeveloper(devId) {
  admin.deleteDeveloper(devId);
}

function deleteVideo(index) {
  admin.deleteVideo(index);
}

function openVideo(url) {
  admin.openVideo(url);
}

function exportData() {
  admin.exportData();
}

function importData() {
  admin.importData();
}

function updateWebsiteIcon() {
  admin.updateWebsiteIcon();
}

function syncHomepage() {
  admin.syncHomepage();
}

function syncFeaturedContent() {
  admin.syncFeaturedContent();
}

function confirmReset() {
  admin.confirmReset();
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    const modalId = e.target.id;
    admin.hideModal(modalId);
  }
});

// Check for existing login on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('adminUser');
  if (savedUser) {
    admin.currentUser = savedUser;
    document.getElementById('currentUser').textContent = savedUser;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    admin.updateStats();
    admin.renderGamesTable();
  }
});
