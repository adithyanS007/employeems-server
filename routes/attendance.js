import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { checkInAttendance, checkOutAttendance, getAttendanceStatus, getAttendances,  } from '../controllers/attendanceController.js'

const router = express.Router()

router.post('/checkin', authMiddleware, checkInAttendance);
router.post('/checkout', authMiddleware, checkOutAttendance);
router.get('/:id', authMiddleware, getAttendances);
router.get('/status/:id', authMiddleware, getAttendanceStatus);


export default router