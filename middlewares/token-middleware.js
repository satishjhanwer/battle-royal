import { verifyJWT } from '../utils/token-generator';

const tokenMiddleware = (req, res, next) => {
  if (!req.headers['x-access-token']) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  next();
};

const verifyJWTMiddleware = (req, res, next) => {
  verifyJWT(req.headers['x-access-token'], (err, decoded) => {
    if (err) {
      res.status(500).json({ status: 'error', message: err.message });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
};

module.exports = {
  tokenMiddleware,
  verifyJWTMiddleware
};
