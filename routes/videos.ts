import express from 'express';
import { Video } from '../models/Video.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({ isApproved: true }).populate('creator', 'name');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const video = new Video({ ...req.body, creator: (req as any).user.id });
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
