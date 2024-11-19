const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = {userAuth};