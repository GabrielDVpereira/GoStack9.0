import Sequelize, { Model } from 'sequelize';
import { compare } from 'bcrypt';
import hashPass from '../../utils/hash';

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize: connection },
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await hashPass(user.password);
      }
    });
    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
