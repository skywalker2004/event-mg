const express = require('express');
const { Op } = require('sequelize');
const Appointment = require('../models/Appointment');
const authenticate = require('../middleware/auth');

const router = express.Router();