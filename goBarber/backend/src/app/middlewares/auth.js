const jwt = require('jsonwebtoken');

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) throw new Error('token not provided');
    const [, token] = authHeader.split(' ');

    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
    req.userId = id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message || error });
  }
};
