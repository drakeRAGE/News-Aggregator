const express = require('express');
const router = express.Router();
const savedArticleService = require('../services/savedArticleService');

router.post('/save', async (req, res) => {
  try {
    const result = await savedArticleService.saveArticle(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save article' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const savedArticles = await savedArticleService.getSavedArticles(
      req.params.userId
    );
    res.json(savedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get saved articles' });
  }
});

router.get('/check/:userId/:articleId', async (req, res) => {
  try {
    const isSaved = await savedArticleService.isArticleSaved(
      req.params.userId,
      req.params.articleId
    );
    res.json({ isSaved });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check saved status' });
  }
});

module.exports = router;
