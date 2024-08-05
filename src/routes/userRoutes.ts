import { Router } from 'express';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  signUp,
  getAllUsers // Certifique-se de que essa função está exportada em userController.ts
} from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
import validate from '../middlewares/validateMiddleware';
import { signUpSchema, loginSchema } from '../validations/userValadation'; // Certifique-se de que o loginSchema está definido

const router = Router();

router.post('/sign-up', validate(signUpSchema), signUp);
router.post('/login', validate(loginSchema), loginUser); // Adicione validação se necessário
router.get('/users', authenticate, getAllUsers);
router.get('/users/:id', authenticate, getUser); // Para buscar um usuário por ID
router.put('/users/:id', authenticate, validate(signUpSchema), updateUser); // Para atualizar um usuário
router.delete('/users/:id', authenticate, deleteUser); // Para deletar um usuário

export default router;
