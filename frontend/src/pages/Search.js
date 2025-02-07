import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsApi } from '../services/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions] = useState([
    'International Relations',
    'Global Politics',
    'Climate Change',
    'Economic Policy',
    'Diplomacy',
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await newsApi.searchNews(query);
      setResults(data);
    } catch (error) {
      setError('Failed to search news');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = async (term) => {
    setQuery(term);
    try {
      setLoading(true);
      setError(null);
      const data = await newsApi.searchNews(term);
      setResults(data);
    } catch (error) {
      setError('Failed to search news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-4xl mx-auto relative z-20">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for global news and analysis..."
            className="w-full px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </form>

        {/* Search Suggestions */}
        <AnimatePresence>
          {!query && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 flex flex-wrap gap-2 justify-center"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm text-white transition-all duration-300 hover:scale-105"
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mt-8 bg-red-100/20 backdrop-blur-lg border border-red-400/20 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((article) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={article.article_id}
            className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/400x200?text=No+Image';
                }}
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {article.title}
              </h2>
              <p className="text-white/70 mb-4">{article.description}</p>
              {article.link && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-400 transition-colors"
                >
                  Read more →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Search;
