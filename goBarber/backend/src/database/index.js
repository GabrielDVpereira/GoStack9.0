// conexão com db e carregar model
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointments from '../app/models/Appointments';
import mongoose from 'mongoose';

const models = [User, File, Appointments];

class Database {
  constructor() {
    this.init();
    this.mongo();
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

  mongo() {
    this.mongoConnection = mongoose
      .connect('mongodb://localhost:27017/gobarber', {
        useNewUrlParser: true,
        useFindAndModify: true,
      })
      .then(() => console.log('mongo connected!'));
  }
}

export default new Database();
