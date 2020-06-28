import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // método estático chamado pela clase de database em '../database/init' para iniciar a model com nossa tabela
  static init(connection) {
    // init do 'Model'
    super.init(
      {
        // envia as colunas que serão inseridas pelo usuário
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      { sequelize: connection }
    );

    // hooks são trechos de código executado a cada interação com nosso model (create, find ...);
    return this;
  }
}

export default File;
