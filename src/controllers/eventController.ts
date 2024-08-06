import { Request, Response } from 'express';
import Event from '../models/eventModel';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { description, dayOfWeek } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ statusCode: 401, error: 'Unauthorized', message: 'User ID is missing' });
    }

    const newEvent = new Event({
      description,
      dayOfWeek,
      userId
    });

    await newEvent.save();
    res.status(200).json(newEvent);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const { dayOfWeek, description } = req.query;

    const filters: any = {};
    if (dayOfWeek) filters.dayOfWeek = dayOfWeek;
    if (description) filters.description = { $regex: description, $options: 'i' };

    const events = await Event.find(filters);
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const { description, dayOfWeek } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Event not found' });
    }

    event.description = description || event.description;
    event.dayOfWeek = dayOfWeek || event.dayOfWeek;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Event not found' });
    }

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const deleteEventsByDay = async (req: Request, res: Response) => {
  try {
    const { dayOfWeek } = req.query;

    if (!dayOfWeek) {
      return res
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: 'dayOfWeek is required' });
    }

    const deletedEvents = await Event.deleteMany({ dayOfWeek });
    res.status(200).json({ deletedEvents });
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};
