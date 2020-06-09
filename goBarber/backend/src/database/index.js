// conexão com db e carregar model
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointmens from '../app/models/Appointmens';

const models = [User, File, Appointmens];

class Database {
  constructor() {
    this.init();
  }

  // Vai fazer a conexão com o db e carregar os models
  init() {
    this.connection = new Sequelize(databaseConfig); // realizando a conexão do sequelize com o database
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      ); // informando ao model qual conexão criamos e passamos para seu médoto init
  }
}

export default new Database();
