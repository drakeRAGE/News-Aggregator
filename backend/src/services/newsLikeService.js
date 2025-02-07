const NewsLike = require('../models/NewsLike');

class NewsLikeService {
  async getLikes(articleId) {
    try {
      const count = await NewsLike.countDocuments({ articleId });
      return count;
    } catch (error) {
      console.error('Error getting likes:', error);
      throw error;
    }
  }

  async hasUserLiked(articleId, userId) {
    try {
      const like = await NewsLike.findOne({ articleId, userId });
      return !!like;
    } catch (error) {
      console.error('Error checking user like:', error);
      throw error;
    }
  }

  async toggleLike(articleId, userId) {
    try {
      const existingLike = await NewsLike.findOne({ articleId, userId });

      if (existingLike) {
        await NewsLike.deleteOne({ articleId, userId });
        return {
          liked: false,
          count: await this.getLikes(articleId),
        };
      } else {
        await NewsLike.create({ articleId, userId });
        return {
          liked: true,
          count: await this.getLikes(articleId),
        };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }
}

module.exports = new NewsLikeService();
