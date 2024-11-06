import nodemailer from 'nodemailer'

const sendEmail = async (req, res) => {
    const { from, to_email, subject, message } = req.body;

    try {
        // Setup transporter with SMTP server details
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // Admin email
                pass: process.env.EMAIL_PASS, // Admin email password
            },
        }); 

        // Email options
        const mailOptions = {
            from: `"${from}" <${process.env.EMAIL_USER}>`, // Sender name and email
            to: to_email, // Recipient email
            subject: subject, // Email subject
            text: message, // Email message
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email", error.message);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
};

export { sendEmail };
