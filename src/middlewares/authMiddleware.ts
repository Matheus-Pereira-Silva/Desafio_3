import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    if (typeof decoded === 'object' && decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
