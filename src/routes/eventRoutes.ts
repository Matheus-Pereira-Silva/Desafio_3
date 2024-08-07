import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  deleteEventsByDay
} from '../controllers/eventController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/events', authenticate, createEvent);  
router.get('/events', getAllEvents); 
router.get('/events/:id', authenticate, getEvent); 
router.put('/events/:id', authenticate, updateEvent);
router.delete('/events/:id', authenticate, deleteEvent);
router.delete('/events', authenticate, deleteEventsByDay); 

export default router;
