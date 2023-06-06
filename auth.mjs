/*import jwt from 'jsonwebtoken';

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    userId: user.id,
    // Include any additional data you want to store in the token
  };

  const token = jwt.sign(payload, '1234@0000', {
    expiresIn: '1h', // Token expiration time
  });

  return token;
}

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, '1234@0000', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId; // Store the user ID in the request object
    next();
  });
}

export { generateToken, verifyToken };
*/

import jwt from 'jsonwebtoken';
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

//module.exports = verifyToken;
export {verifyToken};

export default jwt;
export {config};