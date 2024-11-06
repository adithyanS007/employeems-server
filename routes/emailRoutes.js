import express from 'express'
// import authMiddleware from '../middleware/authMiddleware.js'
import { sendEmail } from '../controllers/emailController.js'

const router = express.Router();

// POST route for sending emails
router.post("/send-email", sendEmail);

export default router;