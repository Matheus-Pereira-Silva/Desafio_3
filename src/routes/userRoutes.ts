import { Router } from 'express';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
} from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/users', createUser);
router.get('/users/:id', authenticate, getUser);
router.put('/users/:id', authenticate, updateUser);
router.delete('/users/:id', authenticate, deleteUser);
router.post('/login', loginUser);

export default router;
