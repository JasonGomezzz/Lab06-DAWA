import userRepository from '../repositories/userRepository.js';

class UserController {
  newForm(req, res) {
    res.render('user-form', { user: {}, error: null });
  }

  async create(req, res) {
    try {
      const user = await userRepository.create(req.body);
      res.redirect(`/posts/new?authorId=${user._id}`);
    } catch (error) {
      const message = error.code === 11000 ? 'Ese correo ya está registrado.' : error.message;
      res.status(400).render('user-form', {
        user: { name: req.body.name, lastName: req.body.lastName, email: req.body.email, age: req.body.age, phoneNumber: req.body.phoneNumber },
        error: message
      });
    }
  }
}

export default new UserController();
