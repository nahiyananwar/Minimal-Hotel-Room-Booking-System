import { Router } from 'express';
import {
    createBooking,
    getBookings,
    getBookingSummary,
} from '../controllers/bookingController';

const router = Router();

// GET /api/bookings/summary - Get booking summary (must be before /:id)
router.get('/summary', getBookingSummary);

// GET /api/bookings - Get all bookings
router.get('/', getBookings);

// POST /api/bookings - Create new booking
router.post('/', createBooking);

export default router;
