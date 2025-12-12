import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
    roomNo: string;
    type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
    beds: number;
    pricePerNight: number;
    description: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
    {
        roomNo: {
            type: String,
            required: [true, 'Room number is required'],
            unique: true,
            trim: true,
        },
        type: {
            type: String,
            required: [true, 'Room type is required'],
            enum: ['Single', 'Double', 'Suite', 'Deluxe'],
        },
        beds: {
            type: Number,
            required: [true, 'Number of beds is required'],
            min: [1, 'At least 1 bed is required'],
            max: [6, 'Maximum 6 beds allowed'],
        },
        pricePerNight: {
            type: Number,
            required: [true, 'Price per night is required'],
            min: [0, 'Price cannot be negative'],
        },
        description: {
            type: String,
            default: '',
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;
