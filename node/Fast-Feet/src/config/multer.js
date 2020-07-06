import { extname, resolve } from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(16).toString('hex');
      const filename = hash + extname(file.originalname);
      callback(null, filename);
    },
  }),
};
