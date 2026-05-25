import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing authorization token." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  return next();
};

export {
  verifyUser,
  verifyAdmin,
};
