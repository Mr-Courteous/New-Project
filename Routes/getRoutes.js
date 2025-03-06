const express = require('express');
const Teacher = require('../Models/TeacherSchema');
const Admin = require('../Models/adminSchema')
const Student = require("../Models/studentSchema")
const { specialAuthMiddleware, specialAuthMiddlewareForAdmins, authMiddleware } = require('../protection')

const router = express.Router();


router.get('/students', async (req, res) => {
    try {
        const GetStudents = await Student.find({}, 'name class'); // Select only 'name' and 'class' fields
        console.log("These are your students:", GetStudents);
        console.log(req.userClass); // Access user's class
        console.log(req.userRole);
        res.status(200).json({ GetStudents })
    } catch (error) {
        console.error('error getting your students', error)
        res.status(500).json({
            success: false,
            message: "error getting your students' data",
            error: error.message
        })
    }
})



router.get('/students/class/:class', async (req, res) => {
    try {
        const { class: studentClass } = req.params;
        const students = await Student.find({ class: studentClass });
        res.json(students);
    } catch (error) {
        console.error('Error fetching students by class:', error);
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.message
        })
    }
});

router.get('/students/search', async (req, res) => {
    try {
        const { name, class: studentClass } = req.query;
        let query = {};

        if (name) {
            query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
        }

        if (studentClass) {
            query.class = studentClass;
        }

        const students = await Student.find(query);
        res.json(students);
    } catch (error) {
        console.error('Error searching students:', error);
        res.status(500).json({
            success: false,
            message: "error getting your students' data",
            error: error.message
        })
    }
});


router.get('/studentsbyreg/search', async (req, res) => {
    try {
        const { class: studentClass, registrationNumber } = req.query;
        let query = {};

        if (studentClass) {
            query.class = studentClass;
        }

        if (registrationNumber) {
            query.registrationNumber = { $regex: new RegExp(registrationNumber, 'i') }; // Case-insensitive search
        }

        const students = await Student.find(query);
        res.json(students);
    } catch (error) {
        console.error('Error searching students:', error);
        res.status(500).json({
            success: false,
            message: "error getting your students' data",
            error: error.message
        });
    }
});


// router.get('/students/search', async (req, res) => {
//     try {
//         const { registrationNumber } = req.query;

//         if (!registrationNumber) {
//             return res.status(400).json({ message: "Registration number is required" });
//         }

//         const student = await Student.findOne({ registrationNumber: { $regex: new RegExp(`^${registrationNumber}$`, 'i') } });

//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         res.json([student]); // Return as an array for consistency
//     } catch (error) {
//         console.error('Error searching student:', error);
//         res.status(500).json({
//             success: false,
//             message: "Error getting student data",
//             error: error.message
//         });
//     }
// });
router.get('/getTeachers', async (req, res) => {
    try {
        const allTecahers = await Teacher.find({});



        console.log('Data retrieved successfully:', allTecahers);
        res.status(200).json({ allTecahers });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ success: false, message: 'Error retrieving data', error: error.message });
    }
});


router.get('/getAdmins', async (req, res) => {
    try {
        const allAdmins = await Admin.find({});



        console.log('Data retrieved successfully:', allAdmins);
        res.status(200).json({ allAdmins });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ success: false, message: 'Error retrieving data', error: error.message });
    }
});


router.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Student.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/teachers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Teacher.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;