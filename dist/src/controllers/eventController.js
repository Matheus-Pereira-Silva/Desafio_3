"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventsByDay = exports.deleteEvent = exports.updateEvent = exports.getEvent = exports.getAllEvents = exports.createEvent = void 0;
const eventModel_1 = __importDefault(require("../models/eventModel"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, dayOfWeek } = req.body;
        if (!description || !dayOfWeek) {
            return res.status(400).json({
                type: 'Validation Error',
                errors: [{ resource: 'event', message: 'Missing required fields' }]
            });
        }
        const userId = req.userId; // Extraído do middleware de autenticação
        const newEvent = new eventModel_1.default({
            description,
            dayOfWeek,
            userId,
        });
        yield newEvent.save();
        res.status(201).json({
            _id: newEvent._id,
            description: newEvent.description,
            dayOfWeek: newEvent.dayOfWeek,
            userId: newEvent.userId
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, dayOfWeek } = req.query;
        const filter = {};
        if (description)
            filter.description = description;
        if (dayOfWeek)
            filter.dayOfWeek = dayOfWeek;
        const events = yield eventModel_1.default.find(filter).select('_id description dayOfWeek userId');
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
});
exports.getAllEvents = getAllEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield eventModel_1.default.findById(eventId).select('_id description dayOfWeek userId');
        if (!event) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not found'
            });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
});
exports.getEvent = getEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const updates = req.body;
        const event = yield eventModel_1.default.findByIdAndUpdate(eventId, updates, { new: true }).select('_id description dayOfWeek userId');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({
            _id: event._id,
            description: event.description,
            dayOfWeek: event.dayOfWeek,
            userId: event.userId
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield eventModel_1.default.findByIdAndDelete(eventId).select('_id description dayOfWeek userId');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({
            _id: event._id,
            description: event.description,
            dayOfWeek: event.dayOfWeek,
            userId: event.userId
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
});
exports.deleteEvent = deleteEvent;
const deleteEventsByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dayOfWeek } = req.query;
        if (!dayOfWeek) {
            return res.status(400).json({
                type: 'Validation Error',
                errors: [{ resource: 'event', message: 'Day of week is required' }]
            });
        }
        const result = yield eventModel_1.default.deleteMany({ dayOfWeek });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No events found for the given day' });
        }
        res.status(200).json({ message: 'Events deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting events', error });
    }
});
exports.deleteEventsByDay = deleteEventsByDay;
