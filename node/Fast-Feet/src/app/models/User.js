import Sequelize, { Model } from 'sequelize';
import { compare } from 'bcrypt';

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
    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
