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

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async update() {

  }

  async destroy() {

  }
}

export default new RecipientsController();
