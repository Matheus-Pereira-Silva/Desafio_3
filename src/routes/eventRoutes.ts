import { Router } from 'express';
import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  deleteEventsByDay
} from '../controllers/eventController';
import { authenticate } from '../middlewares/authMiddleware';
import validate from '../middlewares/validateMiddleware';
import { eventSchema } from '../validations/eventValidation';

const router = Router();

router.post('/events', authenticate, validate(eventSchema), createEvent);
router.get('/events', authenticate, getAllEvents);
router.get('/events/:id', authenticate, getEvent);
router.put('/events/:id', authenticate, validate(eventSchema), updateEvent);
router.delete('/events/:id', authenticate, deleteEvent);
router.delete('/events', authenticate, deleteEventsByDay);

export default router;
