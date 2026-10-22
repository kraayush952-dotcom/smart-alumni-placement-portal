const requireStudentRole = (req, res, next) => {
  if (!req.user || req.user.id === undefined || req.user.id === null) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Student access required",
    });
  }

  next();
};

module.exports = requireStudentRole;
