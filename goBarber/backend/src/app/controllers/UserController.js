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
    const { userId } = req;
    const { email, oldPassword } = req.body;
    try {
      const user = await User.findByPk(userId); // find by primaryKey

      if (email && email !== user.email) {
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists)
          throw new Error('This email is being used by another user');
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        throw new Error("Password doesn't match");
      }

      const { id, name, provider } = await user.update(req.body);

      return res.json({ id, name, email, provider });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}
export default new UserController();
