import { Request, Response } from 'express';
import Event from '../models/eventModel';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { description, dayOfWeek } = req.body;

    if (!description || !dayOfWeek) {
      return res.status(400).json({
        type: 'Validation Error',
        errors: [{ resource: 'event', message: 'Missing required fields' }]
      });
    }

    const userId = req.userId; // Extraído do middleware de autenticação

    const newEvent = new Event({
      description,
      dayOfWeek,
      userId,
    });

    await newEvent.save();

    res.status(201).json({
      _id: newEvent._id,
      description: newEvent.description,
      dayOfWeek: newEvent.dayOfWeek,
      userId: newEvent.userId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

export const getAllEvents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { description, dayOfWeek } = req.query;

    const filter: any = {};
    if (description) filter.description = description;
    if (dayOfWeek) filter.dayOfWeek = dayOfWeek;

    const events = await Event.find(filter).select('_id description dayOfWeek userId');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error });
  }
};

export const getEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).select('_id description dayOfWeek userId');

    if (!event) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not found'
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving event', error });
  }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    const event = await Event.findByIdAndUpdate(eventId, updates, { new: true }).select('_id description dayOfWeek userId');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      _id: event._id,
      description: event.description,
      dayOfWeek: event.dayOfWeek,
      userId: event.userId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByIdAndDelete(eventId).select('_id description dayOfWeek userId');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      _id: event._id,
      description: event.description,
      dayOfWeek: event.dayOfWeek,
      userId: event.userId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

export const deleteEventsByDay = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dayOfWeek } = req.query;

    if (!dayOfWeek) {
      return res.status(400).json({
        type: 'Validation Error',
        errors: [{ resource: 'event', message: 'Day of week is required' }]
      });
    }

    const result = await Event.deleteMany({ dayOfWeek });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No events found for the given day' });
    }

    res.status(200).json({ message: 'Events deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting events', error });
  }
};
