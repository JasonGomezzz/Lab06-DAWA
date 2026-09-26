import Post from '../models/Post.js';

class PostRepository {
  create(data) { return Post.create(data); }
  findAll() { return Post.find().populate('user').sort({ createdAt: -1 }); }
  findById(id) { return Post.findById(id).populate('user'); }
  findByUser(userId) { return Post.find({ user: userId }).populate('user'); }
  update(id, data) {
    return Post.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true, runValidators: true }).populate('user');
  }
  delete(id) { return Post.findByIdAndDelete(id); }
}

export default new PostRepository();
