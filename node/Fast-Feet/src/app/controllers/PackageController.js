import Package from '../models/Package';
import Deliveryamn from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import generateRandomId from '../../utils/generateRandomId';

class PackageController {
  async create(req, res) {
    const package_id = generateRandomId();
    const pack = await Package.create({ id: package_id, ...req.body });
    return res.json(pack);
  }

  async index(req, res) {
    const packages = await Package.findAll({
      include: [
        {
          model: Deliveryamn,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'complement', 'number', 'state', 'city', 'cep'],
        },
      ],
    });
    return res.json(packages);
  }

  async update(req, res) {

  }

  async delete() {

  }

  async delivery(req, res) {

  }

  async concludeDelivery() {

  }
}

export default new PackageController();
