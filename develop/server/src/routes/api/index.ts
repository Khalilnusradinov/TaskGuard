import express from 'express';
import authRoutes from '../auth-routes'; // Adjusted path
import userRoutes from './userAPI'; // Adjusted path
import { authenticateToken } from '../../middleware/auth'; // Adjusted path

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', authenticateToken, userRoutes);

export default router;
