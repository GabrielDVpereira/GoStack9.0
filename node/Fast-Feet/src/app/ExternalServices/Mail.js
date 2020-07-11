import nodemailer from 'nodemailer';
import mailConfig from '../../config/mail';

class Mail {
  constructor() {
    this.init();
  }

  async init() {
    const {
      host, port, secure, auth,
    } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(emailInformation) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...emailInformation,
    });
  }
}

export default new Mail();
