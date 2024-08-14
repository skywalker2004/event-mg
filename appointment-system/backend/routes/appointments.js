const express = require('express');
const Appointment = require('../models/Appointment');
const authenticate = require('../middleware/auth');

const router = express.Router();