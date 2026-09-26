import { Router } from 'express';
import { createUser, getUsers, createPost, getPosts, updatePost, deletePost } from '../controllers/apiController.js';

const router = Router();
router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/posts', createPost);
router.get('/posts', getPosts);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
export default router;
