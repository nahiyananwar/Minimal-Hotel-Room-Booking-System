"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getRooms = void 0;
const Room_1 = __importDefault(require("../models/Room"));
const errorHandler_1 = require("../middleware/errorHandler");
// Get all rooms with pagination
const getRooms = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '10', 10);
        const skip = (page - 1) * limit;
        // Build filter
        const filter = {};
        if (req.query.type) {
            filter.type = req.query.type;
        }
        if (req.query.available !== undefined) {
            filter.available = req.query.available === 'true';
        }
        const [rooms, total] = await Promise.all([
            Room_1.default.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
            Room_1.default.countDocuments(filter),
        ]);
        res.status(200).json({
            success: true,
            message: 'Rooms retrieved successfully',
            data: rooms,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getRooms = getRooms;
// Get single room by ID
const getRoomById = async (req, res, next) => {
    try {
        const room = await Room_1.default.findById(req.params.id);
        if (!room) {
            throw new errorHandler_1.AppError('Room not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Room retrieved successfully',
            data: room,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getRoomById = getRoomById;
// Create a new room
const createRoom = async (req, res, next) => {
    try {
        const { roomNo, type, beds, pricePerNight, description, available } = req.body;
        const room = await Room_1.default.create({
            roomNo,
            type,
            beds,
            pricePerNight,
            description: description || '',
            available: available !== undefined ? available : true,
        });
        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: room,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createRoom = createRoom;
// Update a room
const updateRoom = async (req, res, next) => {
    try {
        const room = await Room_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        if (!room) {
            throw new errorHandler_1.AppError('Room not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: room,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateRoom = updateRoom;
// Delete a room
const deleteRoom = async (req, res, next) => {
    try {
        const room = await Room_1.default.findByIdAndDelete(req.params.id);
        if (!room) {
            throw new errorHandler_1.AppError('Room not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Room deleted successfully',
            data: room,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRoom = deleteRoom;
//# sourceMappingURL=roomController.js.map