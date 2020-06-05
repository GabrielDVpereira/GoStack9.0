import jwt from 'jsonwebtoken';

export default async function auth(req, res, next) {
  try {
    const token = req.headers['x-auth-token'];
    if (!token) throw new Error('No token found');

    await jwt.verify(token, process.env.PRIVATE_KEY);
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message || error });
  }
}
