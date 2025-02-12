const request = require('supertest');
const express = require('express');
const commentRoutes = require('../src/routes/commentRoutes');  // Adjust path as needed

const app = express();
app.use(express.json());  // Parse JSON body
app.use('/comments', commentRoutes);  // Use the routes

describe('Comment Routes', () => {
  test('should fetch comments for an article', async () => {
    const response = await request(app)
      .get('/comments/123')
      .expect(200);
  }, 10000);  // Increase timeout to 10 seconds
  

  test('should add a new comment', async () => {
    const commentData = {
      articleId: '123',
      userId: 'user1',
      userName: 'User 1',
      content: 'Great article!',
    };

    const response = await request(app)
      .post('/comments')
      .send(commentData)
      .expect(201);
    
    expect(response.body).toHaveProperty('articleId', '123');
    expect(response.body).toHaveProperty('content', 'Great article!');
  });

  test('should return error if articleId or content is missing', async () => {
    const commentData = {
      userId: 'user1',
      userName: 'User 1',
    };

    const response = await request(app)
      .post('/comments')
      .send(commentData)
      .expect(400);
    
    expect(response.body).toHaveProperty('message', 'Article ID and content are required');
  });
});
