import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const Trending = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingArticles();
  }, []);

  const fetchTrendingArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/news');
      const articlesData = response.data.results || [];

      // Sort by some criteria (e.g., date) and take top articles
      const trendingArticles = articlesData
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 9); // Show top 9 articles

      setArticles(trendingArticles);
    } catch (error) {
      console.error('Error fetching trending articles:', error);
      setError('Failed to load trending articles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800/50 h-96 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchTrendingArticles}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Trending News
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.article_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsCard article={article} featured={index === 0} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
