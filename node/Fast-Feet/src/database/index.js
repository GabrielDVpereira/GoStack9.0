import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import File from '../app/models/File';
import User from '../app/models/User';
import Recipients from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Package from '../app/models/Package';
import DeliveryProblems from '../app/models/DeliveryProblems';


const models = [User, Recipients, Deliveryman, File, Package, DeliveryProblems];
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
