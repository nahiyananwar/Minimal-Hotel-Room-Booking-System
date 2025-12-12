import { Router } from 'express';
import {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../controllers/roomController';

const router = Router();

// GET /api/rooms - Get all rooms with pagination
router.get('/', getRooms);

// GET /api/rooms/:id - Get single room
router.get('/:id', getRoomById);

// POST /api/rooms - Create new room
router.post('/', createRoom);

// PUT /api/rooms/:id - Update room
router.put('/:id', updateRoom);

// DELETE /api/rooms/:id - Delete room
router.delete('/:id', deleteRoom);

export default router;
