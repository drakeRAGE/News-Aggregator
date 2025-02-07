import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId] = useState(`anonymous_${Date.now()}`); // Temporary user ID for demo

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/comments/${articleId}`
      );
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        articleId,
        content: newComment,
        userId,
        userName: 'Anonymous User',
      });

      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment');
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${commentId}/like`,
        {
          userId,
        }
      );
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? response.data : comment
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const hasUserLiked = (comment) => {
    return comment.likes.some((like) => like.userId === userId);
  };

  return (
    <div className="mt-6 border-t border-gray-700 pt-4">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
          rows="3"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-400 text-center py-4">
            Loading comments...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-4">{error}</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-400 text-center py-4 bg-gray-800/30 rounded-lg">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-800/30 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-gray-200 font-medium">
                    {comment.userName}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleLike(comment._id)}
                  className={`flex items-center transition-colors duration-300 ${
                    hasUserLiked(comment)
                      ? 'text-blue-400'
                      : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {comment.likeCount}
                </button>
              </div>
              <p className="mt-2 text-gray-300">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
