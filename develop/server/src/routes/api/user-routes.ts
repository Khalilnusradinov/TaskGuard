import express from 'express';
import bcrypt from 'bcrypt';
import { sequelize } from '../../config/db'; 
import { authenticateToken } from '../../middleware/auth';
import { QueryTypes } from 'sequelize';

const router = express.Router();

// GET /users - Get all users (Protected Route)
router.get('/', authenticateToken, async (_req, res) => {
    try {
        const users = await sequelize.query(
            'SELECT id, username FROM users',
            { type: QueryTypes.SELECT }
        );
        return res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET /users/:id - Get a user by ID (Protected Route)
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const users = await sequelize.query(
            'SELECT id, username FROM users WHERE id = :id',
            { 
                type: QueryTypes.SELECT, 
                replacements: { id: Number(id) } // Ensure id is treated as a number
            }
        );
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(users[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router; // Export as default