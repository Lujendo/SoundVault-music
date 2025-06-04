const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Artists API
  async getArtists(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/artists${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getArtist(id) {
    return this.request(`/artists/${id}`);
  }

  async createArtist(artistData) {
    return this.request('/artists', {
      method: 'POST',
      body: JSON.stringify(artistData),
    });
  }

  async updateArtist(id, artistData) {
    return this.request(`/artists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(artistData),
    });
  }

  async deleteArtist(id) {
    return this.request(`/artists/${id}`, {
      method: 'DELETE',
    });
  }

  // Publishers API
  async getPublishers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/publishers${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getPublisher(id) {
    return this.request(`/publishers/${id}`);
  }

  async createPublisher(publisherData) {
    return this.request('/publishers', {
      method: 'POST',
      body: JSON.stringify(publisherData),
    });
  }

  async updatePublisher(id, publisherData) {
    return this.request(`/publishers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(publisherData),
    });
  }

  async deletePublisher(id) {
    return this.request(`/publishers/${id}`, {
      method: 'DELETE',
    });
  }

  // Labels API
  async getLabels(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/labels${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getLabel(id) {
    return this.request(`/labels/${id}`);
  }

  async createLabel(labelData) {
    return this.request('/labels', {
      method: 'POST',
      body: JSON.stringify(labelData),
    });
  }

  async updateLabel(id, labelData) {
    return this.request(`/labels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(labelData),
    });
  }

  async deleteLabel(id) {
    return this.request(`/labels/${id}`, {
      method: 'DELETE',
    });
  }

  // Recordings API
  async getRecordings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/recordings${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getRecording(id) {
    return this.request(`/recordings/${id}`);
  }

  async createRecording(recordingData) {
    return this.request('/recordings', {
      method: 'POST',
      body: JSON.stringify(recordingData),
    });
  }

  async updateRecording(id, recordingData) {
    return this.request(`/recordings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recordingData),
    });
  }

  async deleteRecording(id) {
    return this.request(`/recordings/${id}`, {
      method: 'DELETE',
    });
  }

  // Releases API
  async getReleases(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/releases${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getRelease(id) {
    return this.request(`/releases/${id}`);
  }

  async createRelease(releaseData) {
    return this.request('/releases', {
      method: 'POST',
      body: JSON.stringify(releaseData),
    });
  }

  async updateRelease(id, releaseData) {
    return this.request(`/releases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(releaseData),
    });
  }

  async deleteRelease(id) {
    return this.request(`/releases/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
