const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.NEWSDATA_API_KEY;
const BACKUP_ARTICLES = [
  {
    article_id: '1',
    title: 'US and China Relations: New Developments',
    description:
      'Recent diplomatic meetings between US and China show promising signs for international cooperation.',
    content: 'Detailed analysis of recent diplomatic developments...',
    pubDate: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/400x200?text=US-China+Relations',
    link: 'https://example.com/article1',
    source_name: 'International Affairs Daily',
    likes: 45,
    comments: [],
  },
  {
    article_id: '2',
    title: 'UN Security Council Addresses Global Climate Policy',
    description:
      'United Nations Security Council meets to discuss international climate change policies.',
    content: 'The United Nations Security Council gathered today...',
    pubDate: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/400x200?text=UN+Climate+Policy',
    link: 'https://example.com/article2',
    source_name: 'Global Policy Review',
    likes: 32,
    comments: [],
  },
  {
    article_id: '3',
    title: 'NATO Expansion: New Members Consider Joining',
    description:
      'Several European nations are in talks about potential NATO membership.',
    content: 'NATO officials confirmed today that discussions are ongoing...',
    pubDate: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/400x200?text=NATO+Expansion',
    link: 'https://example.com/article3',
    source_name: 'Defense Weekly',
    likes: 28,
    comments: [],
  },
  {
    article_id: '4',
    title: 'Global Trade Agreement: Asia-Pacific Partnership Formed',
    description:
      'New trade agreement signed between major Asia-Pacific economies.',
    content: 'Representatives from fifteen Asia-Pacific nations gathered...',
    pubDate: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/400x200?text=Trade+Agreement',
    link: 'https://example.com/article4',
    source_name: 'Economic Times',
    likes: 56,
    comments: [],
  },
  {
    article_id: '5',
    title: 'Middle East Peace Talks Resume',
    description:
      'Regional leaders meet to discuss new peace initiatives in the Middle East.',
    content: 'Peace talks resumed today as regional leaders...',
    pubDate: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/400x200?text=Peace+Talks',
    link: 'https://example.com/article5',
    source_name: 'Middle East Monitor',
    likes: 41,
    comments: [],
  },
  {
    article_id: '6',
    title: 'African Union Announces New Economic Partnership',
    description:
      'African Union members agree on new continental free trade agreement.',
    content: 'The African Union announced today a groundbreaking agreement...',
    pubDate: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/400x200?text=African+Union',
    link: 'https://example.com/article6',
    source_name: 'Africa Today',
    likes: 37,
    comments: [],
  },
];

router.get('/', async (req, res) => {
  try {
    let articles;

    if (API_KEY) {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=politics&language=en`
        );

        if (response.data && response.data.results) {
          articles = response.data.results.map((article) => ({
            article_id: article.article_id || `${article.title}-${Date.now()}`,
            title: article.title,
            description: article.description || 'No description available',
            content: article.content || article.description,
            pubDate: article.pubDate || new Date().toISOString(),
            image_url:
              article.image_url ||
              'https://via.placeholder.com/400x200?text=News',
            link: article.link || '#',
            source_name: article.source_name || 'News Source',
            likes: 0,
            comments: [],
          }));
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        articles = null;
      }
    }

    // If no articles from API or no API key, use backup articles
    if (!articles || articles.length === 0) {
      console.log('Using backup articles');
      articles = BACKUP_ARTICLES;
    }

    res.json(articles);
  } catch (error) {
    console.error('Server Error:', error);
    res
      .status(500)
      .json({ message: 'Failed to fetch news', error: error.message });
  }
});

module.exports = router;
