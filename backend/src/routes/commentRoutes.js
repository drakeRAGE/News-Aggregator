const express = require('express');
const router = express.Router();
const commentService = require('../services/commentService');

// Get comments for an article
router.get('/:articleId', async (req, res) => {
  try {
    console.log('Fetching comments for article:', req.params.articleId);
    const comments = await commentService.getComments(req.params.articleId);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

// Add a new comment
router.post('/', async (req, res) => {
  try {
    console.log('Received comment data:', req.body);
    const { articleId, userId, userName, content } = req.body;

    if (!articleId || !content) {
      return res
        .status(400)
        .json({ message: 'Article ID and content are required' });
    }

    const comment = await commentService.addComment({
      articleId,
      userId: userId || `anonymous_${Date.now()}`,
      userName: userName || 'Anonymous User',
      content,
    });

    console.log('Comment created:', comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Like/Unlike a comment
router.post('/:commentId/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await commentService.likeComment(
      req.params.commentId,
      userId || `anonymous_${Date.now()}`
    );
    res.json(comment);
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ message: 'Failed to like comment' });
  }
});

// Get user's liked comments
router.get('/likes/:userId/:articleId', async (req, res) => {
  try {
    const likedComments = await commentService.getUserLikes(
      req.params.userId,
      req.params.articleId
    );
    res.json(likedComments);
  } catch (error) {
    console.error('Error fetching user likes:', error);
    res.status(500).json({ message: 'Failed to fetch user likes' });
  }
});

module.exports = router;
