import React, { useState } from 'react';
import type { Room } from '../types';
import { useCreateBookingMutation } from '../store/api/bookingsApi';
import { roomsApi } from '../store/api/roomsApi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

interface BookingModalProps {
    room: Room;
    onClose: () => void;
}

const BookingModal = ({ room, onClose }: BookingModalProps) => {
    const dispatch = useDispatch();
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const [formData, setFormData] = useState({
        guestName: '',
        nights: 1,
        checkInDate: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!room.available) {
            toast.error('This room is not available for booking');
            return;
        }

        try {
            await createBooking({
                roomId: room._id,
                ...formData,
            }).unwrap();

            // Invalidate rooms cache to update availability
            dispatch(roomsApi.util.invalidateTags([{ type: 'Room', id: 'LIST' }]));

            toast.success('Booking created successfully!');
            onClose();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to create booking');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    // Calculate total price
    const totalPrice = formData.nights * room.pricePerNight;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Book Room {room.roomNo}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Room Info */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Room Type:</span>
                        <span className="font-medium text-gray-800">{room.type}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">Price per Night:</span>
                        <span className="font-medium text-gray-800">${room.pricePerNight}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Guest Name
                        </label>
                        <input
                            type="text"
                            name="guestName"
                            value={formData.guestName}
                            onChange={handleChange}
                            placeholder="Enter guest name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                            minLength={2}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Nights
                            </label>
                            <input
                                type="number"
                                name="nights"
                                value={formData.nights}
                                onChange={handleChange}
                                min="1"
                                max="365"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Check-in Date
                            </label>
                            <input
                                type="date"
                                name="checkInDate"
                                value={formData.checkInDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Total Price */}
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                        <span className="text-sm text-gray-600">Total Amount</span>
                        <p className="text-2xl font-bold text-green-600">${totalPrice}</p>
                        <span className="text-xs text-gray-500">for {formData.nights} night(s)</span>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium disabled:opacity-50"
                        >
                            {isLoading ? 'Booking...' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
