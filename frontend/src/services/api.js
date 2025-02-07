import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL);

export const newsApi = {
  getNews: async () => {
    try {
      console.log('Fetching news from:', `${API_BASE_URL}/api/news`);

      const response = await axios.get(`${API_BASE_URL}/api/news`);
      console.log('Raw API Response:', response.data);

      // Check if response has the expected structure
      if (!response.data || !response.data.results) {
        console.warn('Invalid response format:', response.data);
        return [];
      }

      // Map and validate each article
      return response.data.results.map((article) => ({
        article_id: article.article_id || String(Math.random()),
        title: article.title || 'No title available',
        description: article.description || 'No description available',
        image_url:
          article.image_url ||
          'https://via.placeholder.com/400x200?text=No+Image',
        link: article.link || '#',
        source_name: article.source_name || 'Unknown Source',
        pubDate: article.pubDate || new Date().toISOString(),
        category: article.category || 'General',
      }));
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch news');
    }
  },

  searchNews: async (query) => {
    try {
      console.log('Searching news with query:', query);

      const response = await axios.get(`${API_BASE_URL}/api/news/search`, {
        params: { query },
      });

      if (!response.data || !response.data.results) {
        return [];
      }

      return response.data.results.map((article) => ({
        article_id: article.article_id || String(Math.random()),
        title: article.title || 'No title available',
        description: article.description || 'No description available',
        image_url:
          article.image_url ||
          'https://via.placeholder.com/400x200?text=No+Image',
        link: article.link || '#',
        source_name: article.source_name || 'Unknown Source',
        pubDate: article.pubDate || new Date().toISOString(),
        category: article.category || 'General',
      }));
    } catch (error) {
      console.error('Search Error:', error.response?.data || error.message);
      throw new Error('Failed to search news');
    }
  },
};
