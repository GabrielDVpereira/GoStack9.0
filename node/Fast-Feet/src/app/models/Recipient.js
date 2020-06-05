import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        number: Sequelize.INTEGER,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      { sequelize: connection },
    );
    return this;
  }
}

export default Recipients;
