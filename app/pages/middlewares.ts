import jwt from 'jsonwebtoken';

const requireAuth = async (header: any) => {
  const authorization = header.get('Authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return false;
  }

  const token = authorization?.replace('Bearer ', '');
  try {
    if (!token) {
      return false;
    }

    const userId = jwt.decode(token)?.sub;
    const response = {
      isAuthorized: true,
      userId: userId
    }

    return response;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return false;
    }
  }
  return false;
}

export default requireAuth;