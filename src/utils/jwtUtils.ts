import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: any): string => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1h'
  });
};
