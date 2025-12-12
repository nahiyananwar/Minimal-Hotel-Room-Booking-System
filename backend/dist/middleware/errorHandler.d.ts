import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
interface CustomError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: Record<string, any>;
    errors?: Record<string, {
        message: string;
    }>;
}
export declare const errorHandler: (err: CustomError, req: Request, res: Response<ApiResponse>, next: NextFunction) => void;
export declare class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export {};
//# sourceMappingURL=errorHandler.d.ts.map