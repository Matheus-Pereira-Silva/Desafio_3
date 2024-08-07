import { Router } from 'express';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  signUp,
  getAllUsers
} from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
import validate from '../middlewares/validateMiddleware';
import { signUpSchema, loginSchema } from '../validations/userValadation';
import { generateUploadURL } from '../controllers/uploadController';
const router = Router();

router.post('/sign-up', validate(signUpSchema), signUp);
router.post('/sign-in', validate(loginSchema), loginUser);
router.get('/users', getAllUsers);
router.get('/users/:id', authenticate, getUser);
router.put('/users/:id', authenticate, validate(signUpSchema), updateUser);
router.delete('/users/:id', authenticate, deleteUser);
router.get('/generate-upload-url', authenticate, generateUploadURL);

export default router;
