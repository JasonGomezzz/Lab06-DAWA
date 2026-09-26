import User from '../models/User.js';

class UserRepository {
  create(data) { return User.create(data); }
  findAll() { return User.find().sort({ createdAt: -1 }); }
  findById(id) { return User.findById(id); }
}

export default new UserRepository();
