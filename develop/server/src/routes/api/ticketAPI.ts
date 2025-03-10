import express from 'express';

const router = express.Router();

// Dummy Route for tickets
router.get('/', (_req, res) => { // Fix unused variable warning by using _req
    res.json({ message: 'Tickets API working' });
});

export default router;
