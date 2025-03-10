import express from 'express';
import authRoutes from './auth-routes';
import ticketRoutes from './api/ticketAPI';
import userRoutes from './api/userAPI';
import { authenticateToken } from '../middleware/auth';
const router = express.Router();
// Public route
router.use('/auth', authRoutes);
// Protected routes (require authentication)
router.use('/api/tickets', authenticateToken, ticketRoutes);
router.use('/api/users', authenticateToken, userRoutes);
export default router;
