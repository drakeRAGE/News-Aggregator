import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Search = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions] = useState([
    'International Relations',
    'Global Politics',
    'Climate Change',
    'Economic Policy',
    'Diplomacy',
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/news/search?q=${searchTerm}`
      );
      onSearchResults(response.data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = async (term) => {
    setSearchTerm(term);
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/news/search?q=${term}`
      );
      onSearchResults(response.data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-20">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        {!searchTerm && (
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
  );
};

export default Search;
