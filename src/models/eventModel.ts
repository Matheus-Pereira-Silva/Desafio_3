import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  description: string;
  dayOfWeek: string;
  userId: string;
}

const eventSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', eventSchema);
