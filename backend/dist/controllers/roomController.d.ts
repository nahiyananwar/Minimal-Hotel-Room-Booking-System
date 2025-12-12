import { Request, NextFunction } from 'express';
import { TypedRequest, TypedResponse, RoomQuery, CreateRoomBody } from '../types';
export declare const getRooms: (req: TypedRequest<any, RoomQuery>, res: TypedResponse, next: NextFunction) => Promise<void>;
export declare const getRoomById: (req: Request, res: TypedResponse, next: NextFunction) => Promise<void>;
export declare const createRoom: (req: TypedRequest<CreateRoomBody>, res: TypedResponse, next: NextFunction) => Promise<void>;
export declare const updateRoom: (req: TypedRequest<Partial<CreateRoomBody>>, res: TypedResponse, next: NextFunction) => Promise<void>;
export declare const deleteRoom: (req: Request, res: TypedResponse, next: NextFunction) => Promise<void>;
//# sourceMappingURL=roomController.d.ts.map