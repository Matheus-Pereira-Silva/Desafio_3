import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, birthDate, city, country, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, birthDate, city, country, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.birthDate = birthDate || user.birthDate;
    user.city = city || user.city;
    user.country = country || user.country;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, birthDate, city, country, email, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
