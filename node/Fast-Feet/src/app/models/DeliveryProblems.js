import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(connetion) {
    super.init({
      package_id: Sequelize.NUMBER,
      description: Sequelize.STRING,
    },
    { sequelize: connetion });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Package, { foreignKey: 'package_id', as: 'package' });
  }
}

export default DeliveryProblem;
