import Deliveryman from '../models/Deliveryman';
import Package from '../models/Package';
import File from '../models/File';

class DeliveryController {
  async create(req, res) {
    const { email } = req.body;
    const emailUsed = await Deliveryman.findOne({ where: { email } });
    if (emailUsed) return res.status(400).json({ message: 'This email is alredy in use' });

    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async index(req, res) {
    const deliverymen = await Deliveryman.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverymen);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) return res.status(404).json({ message: 'this deliveryman is not registered' });

    await deliveryman.destroy();

    return res.status(201).send();
  }

  async update(req, res) {
    const { email } = req.body;
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (email && email !== deliveryman.email) {
      const emailUsed = await Deliveryman.findOne({ where: { email } });
      if (emailUsed) return res.status(400).json({ message: 'This email is alredy in use' });
    }

    await deliveryman.update(req.body);
    return res.status(201).send();
  }

  async deliverymanPackages(req, res) {
    const { id } = req.params;
    const { status } = req.query;
    let packages = await Package.findAll({ where: { deliveryman_id: id } });

    if (status === 'finish') {
      packages = packages.filter((pack) => pack.end_date !== null);
    } else {
      packages = packages.filter((pack) => !(pack.canceled_at && pack.end_date));
    }

    return res.json(packages);
  }
}

export default new DeliveryController();
