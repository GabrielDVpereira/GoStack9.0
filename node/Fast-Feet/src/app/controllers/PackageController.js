import Package from '../models/Package';

class PackageController {
  async create(req, res) {
    const pack = await Package.create(req.body);
    return res.json(pack);
  }
}

export default new PackageController();
