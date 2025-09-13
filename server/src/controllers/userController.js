const User = require('../models/User');

async function listUsers(req, res) {
  const users = await User.find().select('-passwordHash').lean();
  res.json(users);
}

async function getUser(req, res) {
  const u = await User.findById(req.params.id).select('-passwordHash');
  if (!u) return res.status(404).json({ message: 'User not found' });
  res.json(u);
}

async function createUser(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email exists' });
  const user = new User({ name, email, role });
  user.password = password;
  await user.save();
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.password = updates.password;
    delete updates.password;
    Object.assign(user, updates);
    await user.save();
    return res.json({ message: 'Updated' });
  }
  await User.findByIdAndUpdate(id, updates);
  res.json({ message: 'Updated' });
}

async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
