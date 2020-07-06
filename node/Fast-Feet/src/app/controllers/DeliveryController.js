import Deliveryman from '../models/Deliveryman';
import generateId from '../../utils/generateRandomId';

class DeliveryController {
  async create(req, res) {
    const { email } = req.body;
    const isEmailAvailable = await Deliveryman.findOne({ where: { email } });


    if (isEmailAvailable === false) return res.status(400).json({ message: 'This email is alredy in use' });

    const id = generateId();
    const deliveryman = await Deliveryman.create({ id, ...req.body });
    return res.json(deliveryman);
  }

  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();
    return res.json(deliverymen);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (deliveryman === false) return res.status(404).json({ message: 'this deliveryman is not registered' });

    await deliveryman.destroy();

    return res.status(201).send();
  }

  async update(req, res) {
    const { email } = req.body;
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (email && email !== deliveryman.email) {
      const isEmailAvailable = await Deliveryman.findOne({ where: { email } });
      if (isEmailAvailable) return res.status(400).json({ message: 'This email is alredy in use' });
    }

    await deliveryman.update(req.body);
    return res.status(201).send();
  }
}

export default new DeliveryController();
