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