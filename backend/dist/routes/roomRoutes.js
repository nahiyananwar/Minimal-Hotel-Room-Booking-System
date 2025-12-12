"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomController_1 = require("../controllers/roomController");
const router = (0, express_1.Router)();
// GET /api/rooms - Get all rooms with pagination
router.get('/', roomController_1.getRooms);
// GET /api/rooms/:id - Get single room
router.get('/:id', roomController_1.getRoomById);
// POST /api/rooms - Create new room
router.post('/', roomController_1.createRoom);
// PUT /api/rooms/:id - Update room
router.put('/:id', roomController_1.updateRoom);
// DELETE /api/rooms/:id - Delete room
router.delete('/:id', roomController_1.deleteRoom);
exports.default = router;
//# sourceMappingURL=roomRoutes.js.map