import { useState } from 'react';
import type { Room } from '../types';
import { useDeleteRoomMutation } from '../store/api/roomsApi';
import toast from 'react-hot-toast';
import EditRoomModal from './EditRoomModal';
import BookingModal from './BookingModal';

interface RoomCardProps {
    room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
    const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteRoom(room._id).unwrap();
            toast.success('Room deleted successfully!');
            setShowDeleteConfirm(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete room');
        }
    };

    const typeColors = {
        Single: 'bg-green-100 text-green-800',
        Double: 'bg-blue-100 text-blue-800',
        Suite: 'bg-purple-100 text-purple-800',
        Deluxe: 'bg-amber-100 text-amber-800',
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                {/* Room Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Room {room.roomNo}</h3>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[room.type]}`}
                        >
                            {room.type}
                        </span>
                    </div>
                </div>

                {/* Room Details */}
                <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">🛏️ Beds:</span>
                            <span className="font-medium text-gray-800">{room.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">💰 Price:</span>
                            <span className="font-medium text-gray-800">${room.pricePerNight}/night</span>
                        </div>
                    </div>

                    {room.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
                    )}

                    {/* Availability Badge */}
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${room.available
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${room.available ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            ></span>
                            {room.available ? 'Available' : 'Booked'}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={isDeleting}
                        className="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                        🗑️ Delete
                    </button>
                    <button
                        onClick={() => setShowBookingModal(true)}
                        disabled={!room.available}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${room.available
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        📅 Book
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Room?</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete Room {room.roomNo}? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <EditRoomModal room={room} onClose={() => setShowEditModal(false)} />
            )}

            {/* Booking Modal */}
            {showBookingModal && (
                <BookingModal room={room} onClose={() => setShowBookingModal(false)} />
            )}
        </>
    );
};

export default RoomCard;
