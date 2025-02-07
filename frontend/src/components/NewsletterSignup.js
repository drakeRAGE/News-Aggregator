import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
      <p className="text-gray-300 mb-4">
        Get the latest international relations news delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
            disabled={status === 'loading' || status === 'success'}
          />
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute right-2 top-2 text-green-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          type="submit"
          disabled={!email || status !== 'idle'}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            status === 'loading'
              ? 'bg-gray-600 text-gray-400 cursor-wait'
              : status === 'success'
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414l.707.707a1 1 0 011.414 0l2 2a1 1 0 01.707.707zM2 12a1 1 0 011-1h2a1 1 0 100-2H3a1 1 0 011-1z"
                />
              </svg>
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
