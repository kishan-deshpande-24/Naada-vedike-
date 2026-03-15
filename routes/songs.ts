import express from 'express';
import { Song } from '../models/Song.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
