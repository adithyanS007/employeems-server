import Attendance from '../models/attendance.js';
import Employee from '../models/employee.js';
import User from '../models/User.js';

export const checkInAttendance = async (req, res) => {
    const employeeId = req.user._id;
    const officeStartTime = new Date();
    officeStartTime.setHours(9, 0, 0); // Set office start time to 9 AM

    try {
        const attendance = await Attendance.findOne({ employeeId, checkOutTime: null });

        if (attendance) {
            return res.status(400).json({ success: false, error: 'Already checked in!' });
        }

        const checkInTime = new Date();
        let inStatus;

        // Determine if the employee is early, on-time, or late
        if (checkInTime < officeStartTime) {
            inStatus = "Early";
        } else if (checkInTime.getTime() === officeStartTime.getTime()) {
            inStatus = "On Time";
        } else {
            inStatus = "Late";
        }

        const newAttendance = new Attendance({
            employeeId,
            date: checkInTime.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            checkInTime,
            checkInStatus: 'Checked In',
            inStatus
        });

        await newAttendance.save();
        return res.status(200).json({ success: true, message: 'Checked in successfully!', inStatus });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};



export const checkOutAttendance = async (req, res) => {
    const employeeId = req.user._id;
    const officeEndTime = new Date();
    officeEndTime.setHours(17, 0, 0); // Set office end time to 5 PM

    try {
        const attendance = await Attendance.findOne({ employeeId, checkOutTime: null });

        if (!attendance) {
            return res.status(400).json({ success: false, error: 'You need to check in first!' });
        }

        const checkOutTime = new Date();
        let outStatus;

        // Determine if the employee checked out early, on-time, or overtime
        if (checkOutTime < officeEndTime) {
            outStatus = "Early";
        } else if (checkOutTime.getTime() === officeEndTime.getTime()) {
            outStatus = "On Time";
        } else {
            outStatus = "Overtime";
        }

        attendance.checkOutTime = checkOutTime;
        attendance.checkOutStatus = 'Checked Out';
        attendance.outStatus = outStatus; // Add outStatus to the record

        await attendance.save();
        return res.status(200).json({ success: true, message: 'Checked out successfully!', outStatus });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};


export const getAttendanceStatus = async (req, res) => {
    const employeeId = req.user._id; // Get employee ID from JWT
    try {
        // Check if the employee has an ongoing attendance (checked in but not checked out)
        const attendance = await Attendance.findOne({ employeeId, checkOutTime: null });

        // Return whether the employee is checked in or not
        return res.status(200).json({ isCheckedIn: !!attendance, empId: employeeId });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const getAttendances = async (req, res) => {
    try {
        const {id} = req.params;
        let attendances = await Attendance.find({employeeId: id})
        if(!attendances || attendances.length < 1){
            const employee = await Employee.findOne({userId: id})
            attendances = await Attendance.find({employeeId: employee._id})
        }
        return res.status(200).json({success: true, attendances})
    } catch (error) {
        return res.status(500).json({success: false, error: "get attendances server error"})
    }

}
