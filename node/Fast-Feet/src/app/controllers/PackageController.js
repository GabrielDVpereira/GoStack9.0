import moment from 'moment-timezone';
import { Op } from 'sequelize';
import Package from '../models/Package';
import Deliveryamn from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import NewPackageJob from '../Jobs/NewPackage';
import Queue from '../ExternalServices/Queue';
import File from '../models/File';


class PackageController {
  async create(req, res) {
    const { deliveryman_id, recipient_id } = req.body;

    const deliveryman = await Deliveryamn.findByPk(deliveryman_id);
    if (!deliveryman) return res.status(400).json({ message: "there's no deliveryman registered for this id" });

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) return res.status(400).json({ message: "There's no recipient for this email address" });

    const pack = await Package.create(req.body);


    await Queue.add(NewPackageJob.jobKey, { deliveryman, recipient });

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
    const finalTimePermited = moment().format('YYYY-MM-DDT18:00:00');
    const initialTimePermited = moment().format('YYYY-MM-DDT08:00:00');

    if (start_date < initialTimePermited && start_date > finalTimePermited) {
      res.status(400).json({ message: 'Packages can be deliveryed only from 8:00 to 18:00' });
    }

    const { deliveryman_id } = pack;
    const deliverymanPackages = await Package.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [initialTimePermited, finalTimePermited],
        },
      },
    });
    if (deliverymanPackages.length >= 5) {
      return res.status(400).json({ message: 'You can only delivery 5 packages a day' });
    }


    await pack.update({ start_date });
    return res.status(201).send();
  }

  async concludeDelivery(req, res) {
    const { id } = req.params;
    const { signature_id } = req.body;

    const signature = await File.findByPk(signature_id);
    if (!signature) return res.status(404).json({ message: 'No signature with this id found' });

    const pack = await Package.findByPk(id);
    if (!pack) return res.status(404).json({ message: 'A package with this id doesnt exist' });

    const end_date = moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm');
    await pack.update({ end_date, ...req.body });
    return res.status(201).send();
  }
}

export default new PackageController();
