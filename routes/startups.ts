import express from 'express';
import { Startup } from '../models/Startup.ts';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
