const { Router } = require('express');
const LogEntry = require('../models/LogEntry');
//const RateLimit = require('express-rate-limit');
//const MongoStore = require('rate-limit-mongo');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = await LogEntry.create(req.body);
    console.log(req.body);
    res.json(logEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
