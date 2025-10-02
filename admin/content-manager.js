import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Global state
let currentGameId = null;
let currentShowcaseId = null;
let gameFeatures = [];

// Tab Management
window.switchTab = function(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(`${tab}-tab`).classList.add('active');

  if (tab === 'games') {
    loadGames();
  } else if (tab === 'showcases') {
    loadShowcases();
  }
};

// Alert Functions
function showAlert(message, type = 'success') {
  const container = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  container.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// === GAMES MANAGEMENT ===

async function loadGames() {
  const listElement = document.getElementById('games-list');
  listElement.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading games...</p></div>';

  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data.length === 0) {
      listElement.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎮</div>
          <h3 class="empty-state-title">No games yet</h3>
          <p>Add your first game to get started</p>
        </div>
      `;
      return;
    }

    listElement.innerHTML = data.map(game => `
      <div class="content-item">
        <div class="content-info">
          <div class="content-title">${game.name}</div>
          <div class="content-meta">
            ID: ${game.game_id} • Status: ${game.status} • ${game.features?.length || 0} features
          </div>
        </div>
        <div class="content-actions">
          <button class="btn btn-secondary" onclick="editGame('${game.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteGame('${game.id}', '${game.name}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading games:', error);
    showAlert('Failed to load games: ' + error.message, 'error');
    listElement.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <h3 class="empty-state-title">Error loading games</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

window.openAddGameModal = function() {
  currentGameId = null;
  gameFeatures = [];
  document.getElementById('game-modal-title').textContent = 'Add New Game';
  document.getElementById('game-form').reset();
  document.getElementById('features-list').innerHTML = '';
  document.getElementById('game-modal').classList.add('active');
};

window.closeGameModal = function() {
  document.getElementById('game-modal').classList.remove('active');
  currentGameId = null;
  gameFeatures = [];
};

window.editGame = async function(id) {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Game not found');

    currentGameId = id;
    gameFeatures = data.features || [];

    document.getElementById('game-modal-title').textContent = 'Edit Game';
    document.getElementById('game-id').value = id;
    document.getElementById('game-name').value = data.name;
    document.getElementById('game-roblox-id').value = data.game_id;
    document.getElementById('game-thumbnail').value = data.thumbnail;
    document.getElementById('game-description').value = data.description;
    document.getElementById('game-status').value = data.status;

    renderFeatures();
    document.getElementById('game-modal').classList.add('active');
  } catch (error) {
    console.error('Error loading game:', error);
    showAlert('Failed to load game: ' + error.message, 'error');
  }
};

window.deleteGame = async function(id, name) {
  if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

  try {
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id);

    if (error) throw error;

    showAlert('Game deleted successfully');
    loadGames();
  } catch (error) {
    console.error('Error deleting game:', error);
    showAlert('Failed to delete game: ' + error.message, 'error');
  }
};

window.addFeature = function() {
  const input = document.getElementById('feature-input');
  const feature = input.value.trim();

  if (feature && !gameFeatures.includes(feature)) {
    gameFeatures.push(feature);
    input.value = '';
    renderFeatures();
  }
};

function renderFeatures() {
  const container = document.getElementById('features-list');
  container.innerHTML = gameFeatures.map((feature, index) => `
    <span class="feature-tag">
      ${feature}
      <button type="button" onclick="removeFeature(${index})">×</button>
    </span>
  `).join('');
}

window.removeFeature = function(index) {
  gameFeatures.splice(index, 1);
  renderFeatures();
};

document.getElementById('game-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const gameData = {
    name: document.getElementById('game-name').value,
    game_id: document.getElementById('game-roblox-id').value,
    thumbnail: document.getElementById('game-thumbnail').value,
    description: document.getElementById('game-description').value,
    status: document.getElementById('game-status').value,
    features: gameFeatures
  };

  try {
    let error;

    if (currentGameId) {
      ({ error } = await supabase
        .from('games')
        .update(gameData)
        .eq('id', currentGameId));
    } else {
      ({ error } = await supabase
        .from('games')
        .insert([gameData]));
    }

    if (error) throw error;

    showAlert(currentGameId ? 'Game updated successfully' : 'Game added successfully');
    closeGameModal();
    loadGames();
  } catch (error) {
    console.error('Error saving game:', error);
    showAlert('Failed to save game: ' + error.message, 'error');
  }
});

// === SHOWCASES MANAGEMENT ===

async function loadShowcases() {
  const listElement = document.getElementById('showcases-list');
  listElement.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading showcases...</p></div>';

  try {
    const { data, error } = await supabase
      .from('showcases')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    if (data.length === 0) {
      listElement.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎬</div>
          <h3 class="empty-state-title">No showcases yet</h3>
          <p>Add your first showcase to get started</p>
        </div>
      `;
      return;
    }

    listElement.innerHTML = data.map(showcase => `
      <div class="content-item">
        <div class="content-info">
          <div class="content-title">${showcase.title}</div>
          <div class="content-meta">
            ${new Date(showcase.date).toLocaleDateString()} • ${showcase.duration} • ${showcase.views || 0} views
          </div>
        </div>
        <div class="content-actions">
          <button class="btn btn-secondary" onclick="editShowcase('${showcase.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteShowcase('${showcase.id}', '${showcase.title}')">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading showcases:', error);
    showAlert('Failed to load showcases: ' + error.message, 'error');
    listElement.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <h3 class="empty-state-title">Error loading showcases</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

window.openAddShowcaseModal = function() {
  currentShowcaseId = null;
  document.getElementById('showcase-modal-title').textContent = 'Add New Showcase';
  document.getElementById('showcase-form').reset();
  document.getElementById('showcase-date').valueAsDate = new Date();
  document.getElementById('showcase-modal').classList.add('active');
};

window.closeShowcaseModal = function() {
  document.getElementById('showcase-modal').classList.remove('active');
  currentShowcaseId = null;
};

window.editShowcase = async function(id) {
  try {
    const { data, error } = await supabase
      .from('showcases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Showcase not found');

    currentShowcaseId = id;

    document.getElementById('showcase-modal-title').textContent = 'Edit Showcase';
    document.getElementById('showcase-id').value = id;
    document.getElementById('showcase-title').value = data.title;
    document.getElementById('showcase-url').value = data.url;
    document.getElementById('showcase-description').value = data.description;
    document.getElementById('showcase-duration').value = data.duration;
    document.getElementById('showcase-views').value = data.views || 0;
    document.getElementById('showcase-channel').value = data.channel || '';
    document.getElementById('showcase-date').valueAsDate = new Date(data.date);

    document.getElementById('showcase-modal').classList.add('active');
  } catch (error) {
    console.error('Error loading showcase:', error);
    showAlert('Failed to load showcase: ' + error.message, 'error');
  }
};

window.deleteShowcase = async function(id, title) {
  if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

  try {
    const { error } = await supabase
      .from('showcases')
      .delete()
      .eq('id', id);

    if (error) throw error;

    showAlert('Showcase deleted successfully');
    loadShowcases();
  } catch (error) {
    console.error('Error deleting showcase:', error);
    showAlert('Failed to delete showcase: ' + error.message, 'error');
  }
};

document.getElementById('showcase-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = document.getElementById('showcase-url').value;
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    showAlert('Invalid YouTube URL', 'error');
    return;
  }

  const showcaseData = {
    title: document.getElementById('showcase-title').value,
    url: url,
    video_id: videoId,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    description: document.getElementById('showcase-description').value,
    duration: document.getElementById('showcase-duration').value,
    views: parseInt(document.getElementById('showcase-views').value) || 0,
    channel: document.getElementById('showcase-channel').value || 'YokaiScripts',
    date: document.getElementById('showcase-date').value
  };

  try {
    let error;

    if (currentShowcaseId) {
      ({ error } = await supabase
        .from('showcases')
        .update(showcaseData)
        .eq('id', currentShowcaseId));
    } else {
      ({ error } = await supabase
        .from('showcases')
        .insert([showcaseData]));
    }

    if (error) throw error;

    showAlert(currentShowcaseId ? 'Showcase updated successfully' : 'Showcase added successfully');
    closeShowcaseModal();
    loadShowcases();
  } catch (error) {
    console.error('Error saving showcase:', error);
    showAlert('Failed to save showcase: ' + error.message, 'error');
  }
});

function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Initialize
loadGames();
