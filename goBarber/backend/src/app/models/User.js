import Sequelize, { Model } from 'sequelize';

class User extends Model {
  // método estático chamado pela clase de database em '../database/init' para iniciar a model com nossa tabela
  static init(connection) {
    // init do 'Model'
    super.init(
      {
        // envia as colunas que serão inseridas pelo usuário
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      { sequelize: connection }
    );
  }
}

export default User;
