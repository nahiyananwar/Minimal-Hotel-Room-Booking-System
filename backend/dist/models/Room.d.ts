import mongoose, { Document } from 'mongoose';
export interface IRoom extends Document {
    roomNo: string;
    type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
    beds: number;
    pricePerNight: number;
    description: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Room: mongoose.Model<IRoom, {}, {}, {}, mongoose.Document<unknown, {}, IRoom, {}, {}> & IRoom & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Room;
//# sourceMappingURL=Room.d.ts.map