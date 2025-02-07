const express = require('express');
const router = express.Router();
const newsLikeService = require('../services/newsLikeService');

router.get('/:articleId', async (req, res) => {
  try {
    const count = await newsLikeService.getLikes(req.params.articleId);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get likes' });
  }
});

router.get('/:articleId/:userId', async (req, res) => {
  try {
    const hasLiked = await newsLikeService.hasUserLiked(
      req.params.articleId,
      req.params.userId
    );
    res.json({ hasLiked });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check like status' });
  }
});

router.post('/:articleId/toggle', async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await newsLikeService.toggleLike(
      req.params.articleId,
      userId
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle like' });
  }
});

module.exports = router;
