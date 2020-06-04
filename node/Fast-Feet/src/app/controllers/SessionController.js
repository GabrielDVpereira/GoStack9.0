import _ from 'lodash';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error('no user found for this email');

      if (!await user.checkPassword(password)) throw new Error('wrong password');

      const { id } = user;
      return res.json({
        token: jwt.sign({ id, email }, process.env.PRIVATE_KEY),
      });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}

export default new SessionController();
