import mongoose from 'mongoose';
import postRepository from '../repositories/postRepository.js';
import userRepository from '../repositories/userRepository.js';

function postFields(input) {
  const hashtags = Array.isArray(input.hashtags)
    ? input.hashtags
    : String(input.hashtags || '').split(',');
  return {
    title: input.title,
    content: input.content,
    user: input.user,
    hashtags: hashtags.map(tag => tag.trim().replace(/^#/, '')).filter(Boolean),
    imageUrl: input.imageUrl || ''
  };
}

class PostService {
  async createPost(input) {
    const data = postFields(input);
    if (!mongoose.isValidObjectId(data.user) || !await userRepository.findById(data.user)) {
      const error = new Error('Usuario no encontrado');
      error.status = 400;
      throw error;
    }
    return postRepository.create(data);
  }
  getPosts() { return postRepository.findAll(); }
  getPost(id) { return postRepository.findById(id); }
  getPostsByUser(userId) { return postRepository.findByUser(userId); }
  async updatePost(id, input) {
    const data = postFields(input);
    if (!mongoose.isValidObjectId(data.user) || !await userRepository.findById(data.user)) {
      const error = new Error('Usuario no encontrado');
      error.status = 400;
      throw error;
    }
    return postRepository.update(id, data);
  }
  deletePost(id) { return postRepository.delete(id); }
}

export default new PostService();
