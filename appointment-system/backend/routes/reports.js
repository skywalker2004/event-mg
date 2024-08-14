const express = require('express');
const { Op } = require('sequelize');
const Appointment = require('../models/Appointment');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/income', authenticate, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
  
    const totalIncome = await Appointment.sum('amount', {
      where: {
        date: { [Op.between]: [startDate, endDate] },
      },
    });
  
    res.json({ month, year, totalIncome });
  });

  module.exports = router;