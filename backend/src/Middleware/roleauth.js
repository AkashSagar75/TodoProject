 module.exports = function roleauth(roles = []) {
  
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    try {
       
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }

      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Not Authorized" });
      }

       
      next();
    } catch (err) {
      console.error("RoleAuth Error:", err.message);
      return res.status(500).json({ message: "Server Error in roleAuth" });
    }
  };
};
