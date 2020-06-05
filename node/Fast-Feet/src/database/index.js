import Sequelize from 'sequelize';
import databaseConfig from '../config/database.json';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';


const models = [User, Recipient];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database();