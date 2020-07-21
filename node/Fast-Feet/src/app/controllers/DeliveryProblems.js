import DeliveryProblems from '../models/DeliveryProblems';
import Package from '../models/Package';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblems.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json({ deliveries });
  }

  async indexByDelivery(req, res) {
    const { delivery_id } = req.params;
    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblems.findAll({
      where: { id: delivery_id },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveries);
  }

  async create(req, res) {
    const { package_id } = req.params;
    const problem = await DeliveryProblems.create({ package_id, ...req.body });
    return res.json(problem);
  }

  async cancelPackageByDeliveryProblem(req, res) {
    const { delivery_problem_id } = req.params;

    const problems = await DeliveryProblems.findByPk(delivery_problem_id, {
      include: [
        {
          model: Package,
          as: 'package',
          attributes: ['id', 'canceled_at'],
        },
      ],
    });

    /**
     * Cancel package
     * Send email
     */
    return res.json(problems);
  }
}


export default new DeliveryProblemsController();
