import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Extend Express Request type to include user property
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload | string;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token.' });
            return;
        }

        if (!decoded || typeof decoded === 'string') {
            res.status(403).json({ message: 'Invalid token payload.' });
            return;
        }

        req.user = decoded as JwtPayload;
        next();
    });
};
