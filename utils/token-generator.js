import jwt from 'jsonwebtoken';

const TOKEN_SECRET =
  process.env.TOKEN_SECRET ||
  'vNXScU2FWj6Y42vA94DA2ndYY7JWnNnVF837EVSunsEnNHF3vBAcgc9LNepayLDw';
const createJWT = (obj) => jwt.sign(obj, TOKEN_SECRET, { expiresIn: 86400 });

const verifyJWT = (token, callback) =>
  jwt.verify(token, TOKEN_SECRET, callback);

module.exports = {
  createJWT,
  verifyJWT
};
