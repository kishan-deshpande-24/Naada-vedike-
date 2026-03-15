import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { User } from '../models/User.ts';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY || 'test',
  key_secret: process.env.RAZORPAY_SECRET || 'test',
});

router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { planName, amount } = req.body;
    
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        planName,
        userId: (req as any).user.id
      }
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay Order Error:', err);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
});

router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName } = req.body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || 'test')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const user = await User.findById((req as any).user.id);
      if (user) {
        user.isPremium = true;
        // In a real app, you'd store the plan name and expiry too
        await user.save();
        return res.json({ success: true, message: "Payment verified successfully" });
      }
    }
    
    res.status(400).json({ message: "Invalid signature sent!" });
  } catch (err) {
    console.error('Verification Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
