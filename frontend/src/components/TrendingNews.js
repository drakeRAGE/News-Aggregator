import React from 'react';
import { motion } from 'framer-motion';

const TrendingNews = ({ articles }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        Trending Now
      </h2>
      <div className="space-y-4">
        {articles.slice(0, 5).map((article, index) => (
          <motion.div
            key={article.article_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-16 h-16 relative">
              <span className="absolute -left-2 -top-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                {index + 1}
              </span>
              <img
                src={
                  article.image_url ||
                  'https://via.placeholder.com/64?text=News'
                }
                alt={article.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-gray-200 font-medium line-clamp-2 hover:text-blue-400 transition-colors duration-300">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {Math.floor(Math.random() * 1000 + 500)}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {Math.floor(Math.random() * 50 + 10)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
