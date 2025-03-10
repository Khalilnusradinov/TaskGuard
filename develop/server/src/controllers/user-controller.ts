import { Request, Response } from 'express';
import User from '../models/user';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); // ✅ Now it works
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id); // ✅ Fixing this
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create user
export const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password }); // ✅ Fixing this
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
