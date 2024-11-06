import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const attendanceSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    date: { type: String, required: true }, // Store date as YYYY-MM-DD
    checkInTime: { type: Date, default: null },
    checkInStatus: { type: String, default: 'Pending' }, // Checked In, Late, etc.
    inStatus: { type: String, default: 'Pending' }, // New field for early, on-time, or late check-in status
    checkOutTime: { type: Date, default: null },
    checkOutStatus: { type: String, default: 'Pending' }, // Checked Out, Early, etc.
    outStatus: { type: String, default: 'Pending' }, // New field for early, on-time, or overtime checkout status
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
