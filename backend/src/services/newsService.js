const axios = require('axios');
require('dotenv').config();

class NewsService {
  constructor() {
    this.apiKey = process.env.NEWSDATA_API_KEY;
    this.baseUrl = 'https://newsdata.io/api/1';
    this.cache = {
      news: {
        data: null,
        timestamp: null,
      },
      searches: new Map(),
    };
    this.CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  }

  // Fallback data in case of API failure
  getFallbackNews() {
    return {
      status: 'success',
      results: [
        {
          article_id: '1',
          title: 'Global Diplomatic Relations Strengthen in Asia-Pacific',
          description:
            'Recent diplomatic meetings highlight growing cooperation between nations in the Asia-Pacific region.',
          image_url: 'https://via.placeholder.com/400x200?text=Diplomacy',
          link: 'https://example.com/news/1',
          source_name: 'International News',
          pubDate: new Date().toISOString(),
          category: 'Politics',
        },
        {
          article_id: '2',
          title: 'UN Security Council Addresses Global Security Challenges',
          description:
            'United Nations meeting focuses on international security and peacekeeping efforts.',
          image_url: 'https://via.placeholder.com/400x200?text=UN',
          link: 'https://example.com/news/2',
          source_name: 'Global Politics',
          pubDate: new Date().toISOString(),
          category: 'Politics',
        },
        {
          article_id: '3',
          title: 'Economic Summit Promotes International Cooperation',
          description:
            'World leaders gather to discuss global economic challenges and opportunities.',
          image_url: 'https://via.placeholder.com/400x200?text=Economy',
          link: 'https://example.com/news/3',
          source_name: 'World Economics',
          pubDate: new Date().toISOString(),
          category: 'Politics',
        },
      ],
    };
  }

  isCacheValid(timestamp) {
    return timestamp && Date.now() - timestamp < this.CACHE_DURATION;
  }

  async getLatestNews() {
    try {
      // Check cache first
      if (
        this.cache.news.data &&
        this.isCacheValid(this.cache.news.timestamp)
      ) {
        console.log('Returning cached news data');
        return this.cache.news.data;
      }

      console.log('Fetching fresh news data...');
      const response = await axios.get(`${this.baseUrl}/news`, {
        params: {
          apikey: this.apiKey,
          language: 'en',
          category: 'politics',
          q: 'international relations OR diplomacy OR foreign policy',
        },
      });

      const newsData = {
        status: 'success',
        results: response.data.results.map((article) => ({
          article_id: article.article_id || String(Date.now()),
          title: article.title,
          description:
            article.description ||
            article.content ||
            'No description available',
          image_url:
            article.image_url ||
            'https://via.placeholder.com/400x200?text=IR+News',
          link: article.link,
          source_name: article.source_name || 'Unknown Source',
          pubDate: article.pubDate,
          category: article.category?.[0] || 'Politics',
        })),
      };

      // Update cache
      this.cache.news = {
        data: newsData,
        timestamp: Date.now(),
      };

      return newsData;
    } catch (error) {
      console.error('Error fetching news:', error.message);

      // If cache exists but is expired, use it anyway as a fallback
      if (this.cache.news.data) {
        console.log('Using expired cache as fallback');
        return this.cache.news.data;
      }

      // If no cache, use fallback data
      console.log('Using fallback news data');
      return this.getFallbackNews();
    }
  }

  async searchNews(query) {
    try {
      // Check cache for this specific query
      const cacheKey = query.toLowerCase();
      const cachedData = this.cache.searches.get(cacheKey);

      if (cachedData && this.isCacheValid(cachedData.timestamp)) {
        console.log('Returning cached search results');
        return cachedData.data;
      }

      console.log('Searching news with query:', query);
      const response = await axios.get(`${this.baseUrl}/news`, {
        params: {
          apikey: this.apiKey,
          language: 'en',
          category: 'politics',
          q: `${query} AND (international relations OR diplomacy OR foreign policy)`,
        },
      });

      const searchData = {
        status: 'success',
        results: response.data.results.map((article) => ({
          article_id: article.article_id || String(Date.now()),
          title: article.title,
          description:
            article.description ||
            article.content ||
            'No description available',
          image_url:
            article.image_url ||
            'https://via.placeholder.com/400x200?text=IR+News',
          link: article.link,
          source_name: article.source_name || 'Unknown Source',
          pubDate: article.pubDate,
          category: article.category?.[0] || 'Politics',
        })),
      };

      // Update cache
      this.cache.searches.set(cacheKey, {
        data: searchData,
        timestamp: Date.now(),
      });

      return searchData;
    } catch (error) {
      console.error('Error searching news:', error.message);
      return {
        status: 'success',
        results: [],
      };
    }
  }
}

module.exports = new NewsService();
