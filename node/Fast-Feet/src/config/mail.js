import 'dotenv/config';

export default {
  host: process.env.MAIL_HOST,
  post: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: false,
  default: {
    from: 'Fast feet team <noreply@fastfeet.com> ',
  },
};
