import moment from 'moment-timezone';
import Mail from '../ExternalServices/Mail';

class NewPackage {
  get jobKey() {
    return 'NewPackage';
  }

  async jobAction(packageInfo) {
    const { deliveryman, recipient } = packageInfo;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'New package',
      template: 'newPackage',
      context: {
        daliveryman: deliveryman.name,
        recipient: recipient.name,
        recipient_address: `number ${recipient.number} ${recipient.street}, ${recipient.city}-${recipient.state}`,
        recipient_cep: recipient.cep,
        date: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:mm'),
      },
    });
  }
}

export default new NewPackage();
