import express from 'express';
import userRouter from './user-routes'; // Import as default export

const router = express.Router();

router.use('/', userRouter);

export default router;