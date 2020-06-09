import Sequelize, { Model } from 'sequelize';

class Appointments extends Model {
  // método estático chamado pela clase de database em '../database/init' para iniciar a model com nossa tabela
  static init(connection) {
    // init do 'Model'
    super.init(
      {
        // envia as colunas que serão inseridas pelo usuário
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      { sequelize: connection }
    );

    // hooks são trechos de código executado a cada interação com nosso model (create, find ...);
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointments;
