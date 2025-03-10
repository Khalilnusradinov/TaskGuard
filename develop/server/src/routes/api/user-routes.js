import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../../config/db';
import { authenticateToken } from '../../middleware/auth';
const router = express.Router();
// GET /users - Get all users (Protected Route)
router.get('/', authenticateToken, async (_req, res) => {
    try {
        const result = await pool.query('SELECT id, username FROM users');
        return res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// GET /users/:id - Get a user by ID (Protected Route)
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// POST /users - Create a new user (Register)
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [username, hashedPassword]);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
export { router as userRouter };
