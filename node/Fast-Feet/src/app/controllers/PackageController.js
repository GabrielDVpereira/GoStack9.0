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
    const { id } = req.params;

    const pack = await Package.findByPk(id);

    if (!pack) return res.status(404).json({ message: 'A package with this id doesnt exist' });

    await pack.update(req.body);

    return res.status(201).send();
  }

  async delete(req, res) {
    const { id } = req.params;

    const pack = await Package.findByPk(id);
    if (!pack) return res.status(404).json({ message: 'A package with this id doesnt exist' });

    await pack.destroy();

    return res.status(201).send();
  }

  async delivery(req, res) {

  }

  async concludeDelivery() {

  }
}

export default new PackageController();
