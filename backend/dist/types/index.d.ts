import { Request, Response } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface PaginationQuery {
    page?: string;
    limit?: string;
}
export interface RoomQuery extends PaginationQuery {
    type?: string;
    available?: string;
}
export interface CreateRoomBody {
    roomNo: string;
    type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
    beds: number;
    pricePerNight: number;
    description?: string;
    available?: boolean;
}
export interface CreateBookingBody {
    roomId: string;
    guestName: string;
    nights: number;
    checkInDate: string;
}
export type TypedRequest<T = any, Q = any> = Request<any, any, T, Q>;
export type TypedResponse<T = any> = Response<ApiResponse<T>>;
//# sourceMappingURL=index.d.ts.map