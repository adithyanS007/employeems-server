import multer from "multer";
import Employee from "../models/employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import express from "express";

const app = express();

// Middleware to handle large requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Multer storage and file size limit configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
}) // Assuming you're sending the file as 'profileImage'

const addEmployee = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, error: err.message }); // Multer errors
        } else if (err) {
            return res.status(500).json({ success: false, error: "server error in uploading file" });
        }

        try {
            const {
                name,
                email,
                employeeId,
                dob,
                gender,
                maritalStatus,
                designation,
                department,
                salary,
                password,
                role,
            } = req.body;

            // Check if the user already exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ success: false, error: "User already registered in employee" });
            }

            // Hash password
            const hashPassword = await bcrypt.hash(password, 10);

            // Save user
            const newUser = new User({
                name,
                email,
                password: hashPassword,
                role,
                profileImage: req.file ? req.file.filename : "",
            });

            const savedUser = await newUser.save();

            // Save employee details
            const newEmployee = new Employee({
                userId: savedUser._id,
                employeeId,
                dob,
                gender,
                maritalStatus,
                designation,
                department,
                salary,
            });

            await newEmployee.save();

            return res.status(200).json({ success: true, message: "Employee created" });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Server error in adding employee" });
        }
    });
};


const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate('department')
        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employees server error"})
    }
}

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        let employee;
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate('department')
        if (!employee) {
           employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate('department')
            // return res.status(200).json({ success: true, employee: null, message: "Employee not found" });
        }
        return res.status(200).json({success: true, employee})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employee server error"})
    } 
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const { 
            name, 
            maritalStatus, 
            designation, 
            department, 
            salary, 
        } = req.body;

        let employee = await Employee.findById(id);  // Corrected

        if (!employee) {
            return res.status(404).json({success: false, error: "employee not found"});
        }

        const user = await User.findById(employee.userId);  // Corrected
        if (!user) {
            return res.status(404).json({success: false, error: "user not found"});
        }

        const updateUser = await User.findByIdAndUpdate(employee.userId, {name});
        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            maritalStatus,
            designation,
            salary,
            department
        });

        if (!updateEmployee || !updateUser) {
            return res.status(404).json({success: false, error: "document not found"});
        }

        return res.status(200).json({success: true, message: "employee updated"});
    } catch (error) {
        return res.status(500).json({success: false, error: "update employee server error"});
    }
};


const fetchEmployeesByDepId = async (req, res) => {
    const {id} = req.params;
    try {
        const employees = await Employee.find({department: id })
        return res.status(200).json({success: true, employees })
    } catch (error) {
        return res.status(500).json({success: false, error: "get employeesByDepId server error"})
    }
}


export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };
