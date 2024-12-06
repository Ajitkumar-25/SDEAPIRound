const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "No token provided!" });

  const tokenWithoutBearer = token;

  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
