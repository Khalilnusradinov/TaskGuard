import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export const authenticateToken = (req, res, next) => {
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
        req.user = decoded;
        next();
    });
};
