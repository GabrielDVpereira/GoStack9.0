import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // método estático chamado pela clase de database em '../database/init' para iniciar a model com nossa tabela
  static init(connection) {
    // init do 'Model'
    super.init(
      {
        // envia as colunas que serão inseridas pelo usuário
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Campo n existe na base de dados, só em código
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      { sequelize: connection }
    );

    // hooks são trechos de código executado a cada interação com nosso model (create, find ...);
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
