const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashedPassword, role });
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(400).json({ error: 'User already exists!' });
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found!' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials!' });
  
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });

  module.exports = router;
