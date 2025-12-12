"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const router = (0, express_1.Router)();
// GET /api/bookings/summary - Get booking summary (must be before /:id)
router.get('/summary', bookingController_1.getBookingSummary);
// GET /api/bookings - Get all bookings
router.get('/', bookingController_1.getBookings);
// POST /api/bookings - Create new booking
router.post('/', bookingController_1.createBooking);
exports.default = router;
//# sourceMappingURL=bookingRoutes.js.map