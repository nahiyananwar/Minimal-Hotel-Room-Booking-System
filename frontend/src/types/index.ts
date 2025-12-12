// Room types
export interface Room {
    _id: string;
    roomNo: string;
    type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
    beds: number;
    pricePerNight: number;
    description: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRoomData {
    roomNo: string;
    type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
    beds: number;
    pricePerNight: number;
    description?: string;
    available?: boolean;
}

export interface UpdateRoomData extends Partial<CreateRoomData> { }

// Booking types
export interface Booking {
    _id: string;
    roomId: Room;
    guestName: string;
    nights: number;
    checkInDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingData {
    roomId: string;
    guestName: string;
    nights: number;
    checkInDate: string;
}

// Booking Summary
export interface BookingSummary {
    _id: string;
    roomNo: string;
    type: string;
    totalNightsBooked: number;
    totalBookings: number;
    totalRevenue: number;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
