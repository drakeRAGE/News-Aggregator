import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import NewsCard from '../components/NewsCard';
import NewsletterSignup from '../components/NewsletterSignup';
import Search from '../pages/Search';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/news');
      const articlesData = response.data.results || [];

      if (articlesData.length > 0) {
        setFeaturedArticle(articlesData[0]);
        setArticles(articlesData.slice(1));
        setFilteredArticles(articlesData.slice(1));
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setIsSearching(true);
    setFilteredArticles(results);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-[500px] bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-96 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section with Search */}
      <div className="relative min-h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 text-center leading-tight"
          >
            Global News & Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-12 text-center max-w-2xl"
          >
            Stay informed with the latest international relations news and
            insights
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-4xl"
          >
            <Search onSearchResults={handleSearchResults} />
          </motion.div>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[600px] rounded-3xl overflow-hidden group"
        >
          <img
            src={featuredArticle.image_url}
            alt={featuredArticle.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/1200x600?text=Featured+News';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
              >
                <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm rounded-full mb-6">
                  Featured Story
                </span>
                <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-200 text-xl mb-8 line-clamp-3">
                  {featuredArticle.description}
                </p>
                <a
                  href={featuredArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Read Full Story
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Articles Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.article_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-8 sticky top-24">
          <NewsletterSignup />

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">
              Trending Topics
            </h3>
            <div className="space-y-3">
              {[
                'Global Politics',
                'Economic Policy',
                'Climate Action',
                'Diplomacy',
              ].map((category) => (
                <button
                  key={category}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:translate-x-2 hover:text-white"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-400 text-xl mb-4">
            No articles found matching your search.
          </p>
          <button
            onClick={() => {
              setIsSearching(false);
              setFilteredArticles(articles);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            View All Articles
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
