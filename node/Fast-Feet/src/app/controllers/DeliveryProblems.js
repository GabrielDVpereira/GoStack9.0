import moment from 'moment-timezone';
import DeliveryProblems from '../models/DeliveryProblems';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Queue from '../ExternalServices/Queue';
import CancelPackageJob from '../Jobs/CancelPackage';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblems.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json({ deliveries });
  }

  async indexByPackage(req, res) {
    const { package_id } = req.params;
    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblems.findAll({
      where: { package_id },
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
    const { package: pack } = problems;

    if (pack.canceled_at) {
      res.status(400).json({ message: 'This package has alredy been canceled' });
    }

    const packToCancel = await Package.findByPk(pack.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });
    const cancelDate = moment().tz('America/Sao_Paulo').format();

    await packToCancel.update({ canceled_at: cancelDate });

    await Queue.add(CancelPackageJob.jobKey, { pack: packToCancel });

    return res.json({ packToCancel });
  }
}


export default new DeliveryProblemsController();
