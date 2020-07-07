import Sequelize from 'sequelize';
import databaseConfig from '../config/database.json';
import File from '../app/models/File';
import User from '../app/models/User';
import Recipients from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Package from '../app/models/Package';


const models = [User, Recipients, Deliveryman, File, Package];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection)).map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
