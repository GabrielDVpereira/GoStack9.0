// conexão com db e carregar model
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // Vai fazer a conexão com o db e carregar os models
  init() {
    this.connection = new Sequelize(databaseConfig); // realizando a conexão do sequelize com o database
    models.forEach((model) => model.init(this.connection)); // informando ao model qual conexão criamos e passamos para seu médoto init
  }
}

export default new Database();
