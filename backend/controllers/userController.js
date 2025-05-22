const { AppDataSource } = require('../config/data-source');

const userRepo = AppDataSource.getRepository('User');

const getUsers = async (req, res) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = userRepo.create(req.body);
    const result = await userRepo.save(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

module.exports = { getUsers, createUser };
