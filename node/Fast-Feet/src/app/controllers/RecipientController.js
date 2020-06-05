import Recipient from '../models/Recipient';
import generateRandomId from '../../utils/generateRandomId';

class RecipientsController {
  async index(req, res) {
    try {
      const recipients = await Recipient.findAll();
      if (!recipients.length) throw new Error('No recipients found');
      return res.json(recipients);
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async create(req, res) {
    try {
      const {
        name, street, complement, number, state, city, cep,
      } = req.body;

      const id = generateRandomId();
      await Recipient.create({
        id, name, street, complement, number, state, city, cep,
      });

      return res.status(201).json({
        id, name, street, complement, number, state, city, cep,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      await Recipient.update(req.body, { where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      await Recipient.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send();
    }
  }
}

export default new RecipientsController();
