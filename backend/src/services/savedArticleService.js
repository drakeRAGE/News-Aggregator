const SavedArticle = require('../models/SavedArticle');

class SavedArticleService {
  async saveArticle(articleData) {
    try {
      const existingSave = await SavedArticle.findOne({
        userId: articleData.userId,
        articleId: articleData.articleId,
      });

      if (existingSave) {
        await SavedArticle.deleteOne({
          userId: articleData.userId,
          articleId: articleData.articleId,
        });
        return { saved: false };
      }

      const savedArticle = new SavedArticle(articleData);
      await savedArticle.save();
      return { saved: true };
    } catch (error) {
      console.error('Error saving article:', error);
      throw error;
    }
  }

  async getSavedArticles(userId) {
    try {
      return await SavedArticle.find({ userId }).sort({ savedAt: -1 }).lean();
    } catch (error) {
      console.error('Error getting saved articles:', error);
      throw error;
    }
  }

  async isArticleSaved(userId, articleId) {
    try {
      const saved = await SavedArticle.findOne({ userId, articleId });
      return !!saved;
    } catch (error) {
      console.error('Error checking saved status:', error);
      throw error;
    }
  }
}

module.exports = new SavedArticleService();
