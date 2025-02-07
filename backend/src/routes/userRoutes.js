const express = require('express');
const router = express.Router();

// Placeholder user routes
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile route' });
});

router.post('/favorites', (req, res) => {
  res.json({ message: 'Add to favorites route' });
});

router.get('/favorites', (req, res) => {
  res.json({ message: 'Get favorites route' });
});

module.exports = router;
