import crypto from 'crypto';

const generateUniqueId = () => crypto.randomBytes(6).toString('HEX');

export default generateUniqueId();
