/**
 * api.js — API fetch wrapper with authentication
 * All API calls go through this module for consistent error handling and auth headers
 */
const API_BASE = '/api';

// --- Token Management ---
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

function setTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
}

function clearAuth() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch { return null; }
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// --- Core Fetch ---
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  
  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { ...options, headers };

  try {
    let res = await fetch(url, config);

    // Try refresh if 401
    if (res.status === 401 && getRefreshToken()) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${getAccessToken()}`;
        res = await fetch(url, { ...config, headers });
      } else {
        clearAuth();
        window.location.href = 'login.html';
        return null;
      }
    }

    const data = await res.json();
    if (!res.ok) {
      throw { status: res.status, message: data.error || 'Unknown error', data };
    }
    return data;
  } catch (err) {
    if (err.status) throw err;
    console.error('API error:', err);
    throw { status: 0, message: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ / Cannot connect to server' };
  }
}

async function refreshAccessToken() {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: getRefreshToken() }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    setTokens(data.accessToken);
    return true;
  } catch { return false; }
}

// --- Auth API ---
const AuthAPI = {
  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setTokens(data.accessToken, data.refreshToken);
    setCurrentUser(data.user);
    return data;
  },

  async register(email, password, fullName, interests) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName, interests }),
    });
    setTokens(data.accessToken, data.refreshToken);
    setCurrentUser(data.user);
    return data;
  },

  async logout() {
    try { await apiFetch('/auth/logout', { method: 'POST' }); } catch {}
    clearAuth();
  },

  isLoggedIn() {
    return !!getAccessToken() && !!getCurrentUser();
  },

  getUser() {
    return getCurrentUser();
  },
};

// --- Places API ---
const PlacesAPI = {
  async getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/places${query ? '?' + query : ''}`);
  },

  async getBySlug(slug) {
    return apiFetch(`/places/${slug}`);
  },

  async create(placeData) {
    return apiFetch('/places', {
      method: 'POST',
      body: JSON.stringify(placeData),
    });
  },

  async update(id, placeData) {
    return apiFetch(`/places/${id}`, {
      method: 'PUT',
      body: JSON.stringify(placeData),
    });
  },

  async delete(id) {
    return apiFetch(`/places/${id}`, { method: 'DELETE' });
  },
};

// --- Reviews API ---
const ReviewsAPI = {
  async getForPlace(placeId) {
    return apiFetch(`/places/${placeId}/reviews`);
  },

  async create(placeId, rating, comment) {
    return apiFetch(`/places/${placeId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    });
  },

  // Admin endpoints
  async getAdminReviews(status) {
    const query = status ? `?status=${status}` : '';
    return apiFetch(`/admin/reviews${query}`);
  },

  async moderate(id, status) {
    return apiFetch(`/admin/reviews/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async delete(id) {
    return apiFetch(`/admin/reviews/${id}`, { method: 'DELETE' });
  },
};

// --- Bookmarks API ---
const BookmarksAPI = {
  async getAll() {
    return apiFetch('/bookmarks');
  },

  async add(placeId) {
    return apiFetch('/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ placeId }),
    });
  },

  async remove(placeId) {
    return apiFetch(`/bookmarks/${placeId}`, { method: 'DELETE' });
  },

  async check(placeId) {
    return apiFetch(`/bookmarks/check/${placeId}`);
  },
};

// --- Profile API ---
const ProfileAPI = {
  async get() {
    return apiFetch('/profile');
  },

  async update(data) {
    return apiFetch('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// --- Admin Users API ---
const UsersAPI = {
  async getAll() {
    return apiFetch('/admin/users');
  },

  async update(id, data) {
    return apiFetch(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(id) {
    return apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
  },
};

// --- Stats API ---
const StatsAPI = {
  async getTrending() {
    return apiFetch('/stats/trending');
  },

  async getCategories() {
    return apiFetch('/stats/categories');
  },

  async getOverview() {
    return apiFetch('/admin/overview');
  },
};

// --- Upload API ---
const UploadAPI = {
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAccessToken();
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw { status: res.status, message: data.error || 'Upload failed' };
    }
    return data;
  },
};
