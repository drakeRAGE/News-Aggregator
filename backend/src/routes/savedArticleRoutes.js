// const express = require('express');
// const router = express.Router();
// const savedArticleService = require('../services/savedArticleService');

// router.post('/save', async (req, res) => {
//   try {
//     const result = await savedArticleService.saveArticle(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to save article' });
//   }
// });

// router.get('/user/:userId', async (req, res) => {
//   try {
//     const savedArticles = await savedArticleService.getSavedArticles(
//       req.params.userId
//     );
//     res.json(savedArticles);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to get saved articles' });
//   }
// });

// router.get('/check/:userId/:articleId', async (req, res) => {
//   try {
//     const isSaved = await savedArticleService.isArticleSaved(
//       req.params.userId,
//       req.params.articleId
//     );
//     res.json({ isSaved });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to check saved status' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const savedArticleService = require('../services/savedArticleService');
const { validateSavedArticleInput, validateRequest } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');

// Apply rate limiter for saved article routes
router.use(createLimiter(15 * 60 * 1000, 50));

router.post(
  '/save',
  authenticate,
  validateSavedArticleInput,
  validateRequest,
  async (req, res) => {
    try {
      const result = await savedArticleService.saveArticle(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to save article' });
    }
  }
);

router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const savedArticles = await savedArticleService.getSavedArticles(req.params.userId);
    res.json(savedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get saved articles' });
  }
});

router.get('/check/:userId/:articleId', authenticate, async (req, res) => {
  try {
    const isSaved = await savedArticleService.isArticleSaved(req.params.userId, req.params.articleId);
    res.json({ isSaved });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check saved status' });
  }
});

module.exports = router;
