import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExists) throw 'This user alredy exits';

      const { id, name, email, provider } = await User.create(req.body);

      return res.json({ id, name, email, provider });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async update(req, res) {
    return res.status(201).send();
  }
}
export default new UserController();
