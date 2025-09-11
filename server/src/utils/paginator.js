function paginate(query, { page = 1, limit = 20 } = {}) {
    const p = parseInt(page, 10) || 1;
    const l = parseInt(limit, 10) || 20;
    const skip = (p - 1) * l;
    return query.skip(skip).limit(l);
  }
  
  module.exports = { paginate };
  