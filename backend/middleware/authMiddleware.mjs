import jwt from 'jsonwebtoken';

const PLACEHOLDER_TOKENS = new Set([
  'placeholder-token',
  'mock-token',
  'fake-token',
  'dummy-token',
  'undefined',
  'null',
]);

const normalizeToken = (token) => {
  if (typeof token !== 'string') {
    return null;
  }

  const normalizedToken = token.trim();

  if (!normalizedToken) {
    return null;
  }

  if (PLACEHOLDER_TOKENS.has(normalizedToken.toLowerCase())) {
    return null;
  }

  return normalizedToken;
};

const getRequestToken = (req) => {
  const authHeader = req.header('Authorization');
  const headerToken = req.header('x-auth-token');
  const bearerToken = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;

  return normalizeToken(bearerToken || headerToken);
};

const extractUserFromTokenPayload = (decoded) => {
  if (decoded?.user?.id) {
    return {
      ...decoded.user,
      id: String(decoded.user.id),
    };
  }

  const candidateId = decoded?.id || decoded?.sub || decoded?._id;

  if (!candidateId) {
    return null;
  }

  return {
    id: String(candidateId),
    email: decoded?.email ?? decoded?.user?.email,
    username: decoded?.username ?? decoded?.name ?? decoded?.user?.username,
  };
};

export default function(req, res, next) {
  const token = getRequestToken(req);

  if (!token) {
    return res.status(401).json({ msg: 'No valid token provided, authorization denied' });
  }

  const jwtSecret = process.env.JWT_SECRET?.trim();

  if (!jwtSecret) {
    return res.status(500).json({ msg: 'Authentication is not configured correctly' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = extractUserFromTokenPayload(decoded);

    if (!user?.id) {
      return res.status(401).json({ msg: 'Token payload is not valid' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'Token has expired' });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    return res.status(401).json({ msg: 'Authentication failed' });
  }
}