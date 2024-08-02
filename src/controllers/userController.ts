import { Request, Response } from 'express';
import User from '../models/userModel';
import { hashPassword, comparePasswords } from '../utils/jwtUtils';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const createUser = async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      type: 'Validation Error',
      errors: error.details.map(detail => ({
        resource: detail.path[0],
        message: detail.message
      }))
    });
  }

  try {
    const { firstName, lastName, birthDate, city, country, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      type: 'Validation Error',
      errors: error.details.map(detail => ({
        resource: detail.path[0],
        message: detail.message
      }))
    });
  }

  try {
    const { firstName, lastName, birthDate, city, country, email, password } = req.body;
    const updatedData: any = { firstName, lastName, birthDate, city, country, email };
    if (password) {
      updatedData.password = await hashPassword(password);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
};
