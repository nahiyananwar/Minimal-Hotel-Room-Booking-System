"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingSummary = exports.getBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Room_1 = __importDefault(require("../models/Room"));
const errorHandler_1 = require("../middleware/errorHandler");
// Create a new booking
const createBooking = async (req, res, next) => {
    try {
        const { roomId, guestName, nights, checkInDate } = req.body;
        // Check if room exists
        const room = await Room_1.default.findById(roomId);
        if (!room) {
            throw new errorHandler_1.AppError('Room not found', 404);
        }
        // Check if room is available
        if (!room.available) {
            throw new errorHandler_1.AppError('Room is not available for booking', 400);
        }
        // Create the booking
        const booking = await Booking_1.default.create({
            roomId,
            guestName,
            nights,
            checkInDate: new Date(checkInDate),
        });
        // Mark room as unavailable
        await Room_1.default.findByIdAndUpdate(roomId, { available: false });
        // Populate room details in response
        const populatedBooking = await Booking_1.default.findById(booking._id).populate('roomId');
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: populatedBooking,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBooking = createBooking;
// Get all bookings
const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking_1.default.find()
            .populate('roomId')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: bookings,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBookings = getBookings;
// Get booking summary - aggregated data
const getBookingSummary = async (req, res, next) => {
    try {
        const summary = await Booking_1.default.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.getBookingSummary = getBookingSummary;
//# sourceMappingURL=bookingController.js.map