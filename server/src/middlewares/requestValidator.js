function requireFields(fields = []) {
    return (req, res, next) => {
      const missing = fields.filter(f => req.body[f] === undefined || req.body[f] === null);//If the field is not present in the request body (undefined or null), it adds it to the missing array.

      if (missing.length) {
        return res.status(400).json({ message: 'Missing required fields', missing });
      }
      next();
    };
  }
  
  module.exports = { requireFields };
  