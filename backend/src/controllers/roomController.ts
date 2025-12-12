import { Request, Response, NextFunction } from 'express';
import Room from '../models/Room';
import { TypedRequest, TypedResponse, RoomQuery, CreateRoomBody, ApiResponse } from '../types';
import { AppError } from '../middleware/errorHandler';

// Get all rooms with pagination
export const getRooms = async (
    req: TypedRequest<any, RoomQuery>,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '10', 10);
        const skip = (page - 1) * limit;

        // Build filter
        const filter: Record<string, any> = {};
        if (req.query.type) {
            filter.type = req.query.type;
        }
        if (req.query.available !== undefined) {
            filter.available = req.query.available === 'true';
        }

        const [rooms, total] = await Promise.all([
            Room.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
            Room.countDocuments(filter),
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
    } catch (error) {
        next(error);
    }
};

// Get single room by ID
export const getRoomById = async (
    req: Request,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            throw new AppError('Room not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Room retrieved successfully',
            data: room,
        });
    } catch (error) {
        next(error);
    }
};

// Create a new room
export const createRoom = async (
    req: TypedRequest<CreateRoomBody>,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const { roomNo, type, beds, pricePerNight, description, available } = req.body;

        const room = await Room.create({
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
    } catch (error) {
        next(error);
    }
};

// Update a room
export const updateRoom = async (
    req: TypedRequest<Partial<CreateRoomBody>>,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!room) {
            throw new AppError('Room not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: room,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a room
export const deleteRoom = async (
    req: Request,
    res: TypedResponse,
    next: NextFunction
): Promise<void> => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            throw new AppError('Room not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully',
            data: room,
        });
    } catch (error) {
        next(error);
    }
};
