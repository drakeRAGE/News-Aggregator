import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NewsCard from '../components/NewsCard';

const SavedArticles = () => {
  // Dummy saved articles data
  const [savedArticles] = useState([
    {
      article_id: 'saved-1',
      title: 'The Future of International Relations in a Digital Age',
      description:
        'How technology is reshaping diplomatic relations and international policy-making in the modern era.',
      image_url:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
      link: '#',
      source_name: 'Global Affairs Today',
      pubDate: '2024-02-15',
      likes: 245,
      comments: [],
    },
    {
      article_id: 'saved-2',
      title: 'Climate Change: A New Security Challenge',
      description:
        'Examining how climate change is becoming a critical factor in international security and policy decisions.',
      image_url:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80',
      link: '#',
      source_name: 'Environmental Policy Review',
      pubDate: '2024-02-14',
      likes: 189,
      comments: [],
    },
    {
      article_id: 'saved-3',
      title: 'Economic Integration in Southeast Asia',
      description:
        'Analysis of growing economic cooperation and integration among ASEAN nations.',
      image_url:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '#',
      source_name: 'Asian Economic Review',
      pubDate: '2024-02-13',
      likes: 167,
      comments: [],
    },
    {
      article_id: 'saved-4',
      title: 'Cybersecurity and International Law',
      description:
        'How nations are adapting international law to address growing cybersecurity challenges.',
      image_url:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '#',
      source_name: 'Digital Policy Institute',
      pubDate: '2024-02-12',
      likes: 203,
      comments: [],
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Saved Articles
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedArticles.map((article, index) => (
          <motion.div
            key={article.article_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsCard article={article} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SavedArticles;
