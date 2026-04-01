import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // If no token, return 401 Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.sendStatus(403); // If token is invalid, return 403 Forbidden
    }
    req.user = user; // Attach user info to the request object
    next(); // Proceed to the next middleware/route handler
  });
};

export { authenticateToken };