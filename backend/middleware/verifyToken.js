import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // attach decoded user info
    next(); // move to next middleware`
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
