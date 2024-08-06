import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  description: string;
  dayOfWeek: string;
  userId: string;
}

const eventSchema: Schema = new Schema({
  description: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  userId: { type: String, required: true }
});

export default mongoose.model<IEvent>('Event', eventSchema);
