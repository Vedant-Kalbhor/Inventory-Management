function roleMiddleware(allowedRoles = []) {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
      
      if (!allowedRoles.length) return next(); // no role specified,allow all authenticated
      
      if (allowedRoles.includes(req.user.role)) return next();//user role is allowed
      
      return res.status(403).json({ message: 'Forbidden - insufficient role' });
    };
  }
  
  module.exports = { roleMiddleware };
  