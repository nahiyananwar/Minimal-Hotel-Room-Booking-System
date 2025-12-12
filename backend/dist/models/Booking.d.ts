import mongoose, { Document, Types } from 'mongoose';
export interface IBooking extends Document {
    roomId: Types.ObjectId;
    guestName: string;
    nights: number;
    checkInDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Booking: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Booking;
//# sourceMappingURL=Booking.d.ts.map