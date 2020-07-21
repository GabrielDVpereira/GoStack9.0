import moment from 'moment-timezone';
import Mail from '../ExternalServices/Mail';

class CancelPackage {
  get jobKey() {
    return 'CancelPackage';
  }

  async jobAction({ data: packageInfo }) {
    const { pack } = packageInfo;
    const { deliveryman } = pack;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Package cancelation',
      template: 'cancelPackage',
      context: {
        deliveryman: deliveryman.name,
        packageId: pack.id,
        date: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:mm'),
      },
    });
  }
}

export default new CancelPackage();
