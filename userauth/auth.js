const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthenticated = (req, res, next) => {
  const token = req.session.token;
  if (!token)
    return res
      .status(403)
      .json({ msg: "user is not authorized to access this route" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error) {
      res.status(401).json({ msg: "invalid session token" });
      console.error(error);
    }
  }
};

exports.role = (isRequired) => {
  return (req, res, next) => {
    if (req.user.role !== isRequired) {
      res.status(403).json({ msg: "user not authorized for this role." });
    }
    next();
  };
};
