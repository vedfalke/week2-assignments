const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

function validateEmployee(data) {
    const { name, department, role, salary, joinDate } = data;

    if (!name || !name.trim()) return "Name is required";
    if (!department || !department.trim()) return "Department is required";
    if (!role || !role.trim()) return "Role is required";
    if (salary === undefined || salary === "" || Number(salary) < 0 ||
        !Number.isFinite(Number(salary))) {
        return "Enter a valid salary (zero or more)";
    }
    if (!joinDate || Number.isNaN(Date.parse(joinDate))) {
        return "Enter a valid join date";
    }

    return null;
}

router.post("/", async (req, res) => {
    try {
        const error = validateEmployee(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const employee = await Employee.create({
            name: req.body.name.trim(),
            department: req.body.department.trim(),
            role: req.body.role.trim(),
            salary: Number(req.body.salary),
            joinDate: new Date(req.body.joinDate)
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Could not add employee" });
    }
});

router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find().sort({ name: 1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Could not get employees" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const error = validateEmployee(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name.trim(),
                department: req.body.department.trim(),
                role: req.body.role.trim(),
                salary: Number(req.body.salary),
                joinDate: new Date(req.body.joinDate)
            },
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        res.status(500).json({ message: "Could not update employee" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid employee ID" });
        }
        res.status(500).json({ message: "Could not delete employee" });
    }
});

module.exports = router;