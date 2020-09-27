import User from '../models/User';
import hash from '../../utils/hash';

class UserController {
  async crete(req, res) {
    const { name, email, password } = req.body;

    const hashed_pass = await hash(password);
    const user = await User.create({ email, password_hash: hashed_pass, name });
    return res.json(user);
  }

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
}


export default new UserController();
