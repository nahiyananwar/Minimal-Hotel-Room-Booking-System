import { Request, NextFunction } from 'express';
import { TypedRequest, TypedResponse, CreateBookingBody } from '../types';
export declare const createBooking: (req: TypedRequest<CreateBookingBody>, res: TypedResponse, next: NextFunction) => Promise<void>;
export declare const getBookings: (req: Request, res: TypedResponse, next: NextFunction) => Promise<void>;
export declare const getBookingSummary: (req: Request, res: TypedResponse, next: NextFunction) => Promise<void>;
//# sourceMappingURL=bookingController.d.ts.map