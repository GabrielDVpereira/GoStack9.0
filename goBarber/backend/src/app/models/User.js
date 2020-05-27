import Sequelize, { Model } from 'sequelize';

class User extends Model {
  // método estático chamado automaticamente pelo sequelize
  static init(sequelize) {
    // init do 'Model'
    super.init(
      {
        // envia as colunas que serão inseridas pelo usuário
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
  }
}

export default User;
