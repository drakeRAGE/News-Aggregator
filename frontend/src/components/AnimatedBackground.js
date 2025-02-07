import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900"></div>

      {/* Animated blobs */}
      <div className="relative w-full h-full">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 left-50 w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;
