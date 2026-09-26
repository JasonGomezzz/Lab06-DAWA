import userRepository from '../repositories/userRepository.js';
import postService from '../services/postService.js';

export async function createUser(req, res) {
  const user = await userRepository.create(req.body);
  const data = user.toObject();
  delete data.password;
  res.status(201).json(data);
}

export async function getUsers(req, res) {
  res.json(await userRepository.findAll());
}

export async function createPost(req, res) {
  res.status(201).json(await postService.createPost(req.body));
}

export async function getPosts(req, res) {
  res.json(await postService.getPosts());
}

export async function updatePost(req, res) {
  const post = await postService.updatePost(req.params.id, req.body);
  if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
  res.json(post);
}

export async function deletePost(req, res) {
  const post = await postService.deletePost(req.params.id);
  if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
  res.status(204).end();
}
