import express from 'express';
const router = express.Router();
// Dummy Route for tickets
router.get('/', (_req, res) => {
    res.json({ message: 'Tickets API working' });
});
export default router;
