import moment from 'moment-timezone';
import Package from '../models/Package';
import Deliveryamn from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class PackageController {
  async create(req, res) {
    const pack = await Package.create(req.body);
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
    const { id } = req.params;

    const pack = await Package.findByPk(id);
    if (!pack) return res.status(404).json({ message: 'A package with this id doesnt exist' });

    const start_date = moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm');
    const finalTimePermited = moment(start_date).format('YYYY-MM-DDT18:00');
    const initialTimePermited = moment().format('YYYY-MM-DDT8:00');

    if (start_date < initialTimePermited || start_date > finalTimePermited) {
      res.status(400).json({ message: 'Packages can be deliveryed only from 8:00 to 18:00 ' });
    }

    await pack.update({ start_date });
    return res.status(201).send();
  }

  async concludeDelivery(req, res) {
    const { id } = req.params;

    const pack = await Package.findByPk(id);
    if (!pack) return res.status(404).json({ message: 'A package with this id doesnt exist' });

    const end_date = moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm');
    await pack.update({ end_date });
    return res.status(201).send();
  }
}

export default new PackageController();
