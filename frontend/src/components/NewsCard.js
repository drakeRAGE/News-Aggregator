import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';
import ShareModal from './ShareModal';
import ReadingTime from './ReadingTime';

const NewsCard = ({ article }) => {
  console.log('NewsCard received article:', article);

  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userId] = useState(`anonymous_${Date.now()}`); // Temporary user ID for demo
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
    fetchSavedStatus();
  }, [article.article_id]);

  const fetchLikeStatus = async () => {
    try {
      const [likesResponse, userLikeResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/news-likes/${article.article_id}`),
        axios.get(
          `http://localhost:5000/api/news-likes/${article.article_id}/${userId}`
        ),
      ]);
      setLikeCount(likesResponse.data.count);
      setIsLiked(userLikeResponse.data.hasLiked);
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  const fetchSavedStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/saved-articles/check/${userId}/${article.article_id}`
      );
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.error('Error fetching saved status:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/news-likes/${article.article_id}/toggle`,
        { userId }
      );
      setIsLiked(response.data.liked);
      setLikeCount(response.data.count);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/saved-articles/save',
        {
          userId,
          articleId: article.article_id,
          title: article.title,
          description: article.description,
          imageUrl: article.image_url,
          sourceUrl: article.link,
          sourceName: article.source_name,
          publishedAt: article.pubDate,
        }
      );
      setIsSaved(response.data.saved);
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = article.link;
    const shareText = `Check out this article: ${article.title}`;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`
        );
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/90 via-gray-800/95 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 h-full flex flex-col border border-gray-700/30 hover:border-blue-500/30">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {/* Multiple gradient overlays for better visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-transparent z-10" />

        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000 ease-in-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x200?text=News';
          }}
        />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => setShowShareModal(true)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-black/50 border border-white/10"
            title="Share Article"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button
            onClick={handleLike}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-black/50 border ${
              isLiked
                ? 'bg-red-500/90 hover:bg-red-600 border-red-400/50'
                : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/10'
            }`}
            title={isLiked ? 'Unlike Article' : 'Like Article'}
          >
            <svg
              className="w-5 h-5 text-white"
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={handleSave}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-black/50 border ${
              isSaved
                ? 'bg-green-500/90 hover:bg-green-600 border-green-400/50'
                : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/10'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Article'}
          >
            <svg
              className="w-5 h-5 text-white"
              fill={isSaved ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative flex-grow flex flex-col p-6 pt-8">
        {/* Source Badge */}
        <div className="absolute top-5 left-6">
          <span className="px-4 py-1.5 bg-blue-500/20 backdrop-blur-md text-blue-300 text-sm font-medium rounded-full border border-blue-500/20 shadow-lg shadow-black/50">
            {article.source_name}
          </span>
        </div>

        {/* Title & Description */}
        <div className="flex-grow pt-6">
          <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {article.title}
          </h2>

          <p className="text-gray-300/90 mb-6 line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Metadata Section */}
        <div className="border-t border-gray-700/30 pt-4 mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-400/90 mb-4">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 group/likes">
                <svg
                  className="w-4 h-4 group-hover/likes:text-red-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span className="group-hover/likes:text-red-400 transition-colors">
                  {likeCount}
                </span>
              </span>
              <ReadingTime content={article.description} />
            </div>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {new Date(article.pubDate).toLocaleDateString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center px-5 py-2.5 rounded-full bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 transition-all duration-300 hover:shadow-lg shadow-black/50"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              Comments
            </button>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all duration-300 hover:shadow-lg shadow-black/50 group/read"
            >
              <span>Read Full Article</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover/read:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 border-t border-gray-700/30 pt-6">
            <CommentSection articleId={article.article_id} />
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
        />
      )}
    </div>
  );
};

export default NewsCard;
