import jwt from 'jsonwebtoken';

export const generateTokenByOpenId = (openId) => {
  return jwt.sign({openId: openId}, 'secret', { expiresIn: '30 days'});
}

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'secret');
    return true;
  } catch(err) {
    return false;
  }
}
