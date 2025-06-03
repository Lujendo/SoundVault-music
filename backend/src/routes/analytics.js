import express from 'express';

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
  res.json({ success: true, data: [], message: 'Analytics endpoint - coming soon' });
});

router.get('/dashboard', (req, res) => {
  res.json({ success: true, data: {}, message: 'Dashboard analytics endpoint - coming soon' });
});

export default router;
