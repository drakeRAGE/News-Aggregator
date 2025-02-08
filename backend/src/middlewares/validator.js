const { body, validationResult } = require('express-validator');

// Common input validation for comments
const validateCommentInput = [
  body('articleId').notEmpty().withMessage('Article ID is required'),
  body('content').notEmpty().withMessage('Content is required'),
];

const validateNewsLikeInput = [
  body('userId').notEmpty().withMessage('User ID is required'),
];

const validateSavedArticleInput = [
  body('articleId').notEmpty().withMessage('Article ID is required'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCommentInput,
  validateNewsLikeInput,
  validateSavedArticleInput,
  validateRequest,
};
