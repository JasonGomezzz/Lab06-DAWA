import postService from '../services/postService.js';
import userRepository from '../repositories/userRepository.js';

async function formData(post = {}, error = null, authorId = null) {
  const users = await userRepository.findAll();
  const selected = users.find(user => String(user._id) === String(authorId || post.user?._id || post.user));
  return {
    post,
    users,
    error,
    authorName: post.authorName || (selected ? `${selected.name} ${selected.lastName}` : '')
  };
}

async function authorIdFor(name) {
  const normalized = String(name || '').trim().replace(/\s+/g, ' ').toLowerCase();
  const users = await userRepository.findAll();
  const matches = users.filter(user => `${user.name} ${user.lastName}`.toLowerCase() === normalized || user.email === normalized);
  if (matches.length !== 1) {
    const error = new Error(matches.length ? 'Hay varios autores con ese nombre; escribe tu correo registrado.' : 'Autor no registrado. Usa “Registrar autor” antes de guardar.');
    error.status = 400;
    throw error;
  }
  return matches[0]._id;
}

class PostController {
  async getAll(req, res) {
    res.render('posts', { posts: await postService.getPosts() });
  }
  async newForm(req, res) {
    res.render('post-form', await formData({}, null, req.query.authorId));
  }
  async create(req, res) {
    try {
      const user = await authorIdFor(req.body.authorName);
      await postService.createPost({ ...req.body, user });
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
      const user = await authorIdFor(req.body.authorName);
      const post = await postService.updatePost(req.params.id, { ...req.body, user });
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
