const express = require('express');
const Appointment = require('../models/Appointment');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Book an appointment
router.post('/', authenticate, async (req, res) => {
    const { date, amount } = req.body;
    try {
      const appointment = await Appointment.create({ userId: req.user.id, date, amount });
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create appointment' });
    }
  });

  // View all appointments
router.get('/', authenticate, async (req, res) => {
    const appointments = await Appointment.findAll({ where: { userId: req.user.id } });
    res.json(appointments);
  });