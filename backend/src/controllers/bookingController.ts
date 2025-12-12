import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import Room from '../models/Room';
import { TypedRequest, TypedResponse, CreateBookingBody } from '../types';
import { AppError } from '../middleware/errorHandler';

// Create a new booking
export const createBooking = async (
    req: TypedRequest<CreateBookingBody>,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const { roomId, guestName, nights, checkInDate } = req.body;

        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            throw new AppError('Room not found', 404);
        }

        // Check if room is available
        if (!room.available) {
            throw new AppError('Room is not available for booking', 400);
        }

        // Create the booking
        const booking = await Booking.create({
            roomId,
            guestName,
            nights,
            checkInDate: new Date(checkInDate),
        });

        // Mark room as unavailable
        await Room.findByIdAndUpdate(roomId, { available: false });

        // Populate room details in response
        const populatedBooking = await Booking.findById(booking._id).populate('roomId');

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: populatedBooking,
        });
    } catch (error) {
        next(error);
    }
};

// Get all bookings
export const getBookings = async (
    req: Request,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const bookings = await Booking.find()
            .populate('roomId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        next(error);
    }
};

// Get booking summary - aggregated data
export const getBookingSummary = async (
    req: Request,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const summary = await Booking.aggregate([
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'roomId',
                    foreignField: '_id',
                    as: 'room',
                },
            },
            {
                $unwind: '$room',
            },
            {
                $group: {
                    _id: '$roomId',
                    roomNo: { $first: '$room.roomNo' },
                    type: { $first: '$room.type' },
                    totalNightsBooked: { $sum: '$nights' },
                    totalBookings: { $sum: 1 },
                    totalRevenue: { $sum: { $multiply: ['$nights', '$room.pricePerNight'] } },
                },
            },
            {
                $project: {
                    _id: 1,
                    roomNo: 1,
                    type: 1,
                    totalNightsBooked: 1,
                    totalBookings: 1,
                    totalRevenue: 1,
                },
            },
            {
                $sort: { roomNo: 1 },
            },
        ]);

        res.status(200).json({
            success: true,
            message: 'Booking summary retrieved successfully',
            data: summary,
        });
    } catch (error) {
        next(error);
    }
};
