import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBooking extends Document {
    roomId: Types.ObjectId;
    guestName: string;
    nights: number;
    checkInDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: [true, 'Room ID is required'],
        },
        guestName: {
            type: String,
            required: [true, 'Guest name is required'],
            trim: true,
            minlength: [2, 'Guest name must be at least 2 characters'],
            maxlength: [100, 'Guest name cannot exceed 100 characters'],
        },
        nights: {
            type: Number,
            required: [true, 'Number of nights is required'],
            min: [1, 'At least 1 night is required'],
            max: [365, 'Maximum 365 nights allowed'],
        },
        checkInDate: {
            type: Date,
            required: [true, 'Check-in date is required'],
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
