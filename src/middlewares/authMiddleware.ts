import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
