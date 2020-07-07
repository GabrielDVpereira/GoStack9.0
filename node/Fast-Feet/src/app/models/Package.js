import Sequelize, { Model } from 'sequelize';

class Package extends Model {
  static init(connection) {
    super.init({
      product: Sequelize.STRING,
      recipient_id: Sequelize.STRING,
      deliveryman_id: Sequelize.STRING,
      signature_id: Sequelize.INTEGER,
      canceled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,

    },
    {
      sequelize: connection,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
    this.belongsTo(models.Recipients, { foreignKey: 'recipient_id', as: 'recipient' });
  }
}

export default Package;
