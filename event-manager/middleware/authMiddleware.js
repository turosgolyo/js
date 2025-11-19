import jwt from 'jsonwebtoken';

export function authenticateUser(req, res, next) {
  try {
    const accessToken = req.cookies && req.cookies.jwt;
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = jwt.verify(accessToken, 'secret-key');
    if (!payload || !payload.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
