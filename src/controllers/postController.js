import postService from '../services/postService.js';
import userRepository from '../repositories/userRepository.js';

async function formData(post = {}, error = null) {
  return { post, users: await userRepository.findAll(), error };
}

class PostController {
  async getAll(req, res) {
    res.render('posts', { posts: await postService.getPosts() });
  }
  async newForm(req, res) {
    res.render('post-form', await formData());
  }
  async create(req, res) {
    try {
      await postService.createPost(req.body);
      res.redirect('/posts');
    } catch (error) {
      res.status(400).render('post-form', await formData(req.body, error.message));
    }
  }
  async editForm(req, res) {
    const post = await postService.getPost(req.params.id);
    if (!post) return res.status(404).send('Publicación no encontrada');
    res.render('post-form', await formData(post));
  }
  async update(req, res) {
    try {
      const post = await postService.updatePost(req.params.id, req.body);
      if (!post) return res.status(404).send('Publicación no encontrada');
      res.redirect('/posts');
    } catch (error) {
      res.status(400).render('post-form', await formData({ ...req.body, _id: req.params.id }, error.message));
    }
  }
  async delete(req, res) {
    await postService.deletePost(req.params.id);
    res.redirect('/posts');
  }
}

export default new PostController();
