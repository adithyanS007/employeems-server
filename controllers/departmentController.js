import Department from "../models/department.js";
import Employee from "../models/employee.js";
import User from '../models/User.js'

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch (error) {
        return res.status(500).json({success: false, error: "get department server error"})
    }
}

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

const getDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({success: true, department})
    } catch (error) {
        return res.status(500).json({success: false, error: "get department server error"})
    }
}

const updateDepartment =async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDepartment = await Department.findByIdAndUpdate({_id: id}, {
            dep_name,
            description
        })
        return res.status(200).json({success: true, updateDepartment})
    } catch (error) {
        return res.status(500).json({success: false, error: "edit department server error"})
    }
}


const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteDepartment = await Department.findById(id);

        if (!deleteDepartment) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        // Find employees associated with the department
        const employees = await Employee.find({ department: id });

        if (employees.length > 0) {
            const employeeUserIds = employees.map(emp => emp.userId); // Extract user IDs

            // Delete corresponding users
            await User.deleteMany({ _id: { $in: employeeUserIds } });

            // Delete the employees
            await Employee.deleteMany({ department: id });
        }

        // Finally, delete the department
        await deleteDepartment.deleteOne();

        return res.status(200).json({ success: true, message: "Department, associated employees, and users deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while deleting department" });
    }
};


export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}