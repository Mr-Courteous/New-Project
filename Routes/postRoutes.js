const express = require('express');
const Admin = require('../Models/adminSchema');
const Teacher = require('../Models/TeacherSchema');
const Student = require("../Models/studentSchema")
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Counter = require('../Models/CounterSchema'); // Import your Counter model
require('dotenv').config();
const { specialAuthMiddleware, specialAuthMiddlewareForAdmins, authMiddleware } = require('../protection')


const router = express.Router();

router.post('/adminLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
            userId: admin._id, email: admin.email, role: admin.position, name: admin.name, class: admin.class
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.position
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Function to generate the unique ID
async function generateRegistrationNumber(schoolName, className) {
    const counterId = `${schoolName}-${className}`; // Unique counter ID

    // Ensure the counter exists
    const counter = await Counter.findOneAndUpdate(
        { _id: counterId },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const seqNumber = counter.seq.toString().padStart(3, '0'); // Pad with leading zeros

    return `${schoolName}/${className}/${seqNumber}`;
}

router.post('/addStudent', async (req, res) => {
    try {
        const { name, class: studentClass, dateOfBirth, phoneNumber, email, address, password, schoolName } = req.body;

        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email has been registered. Try registering with a new email" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        const registrationNumber = await generateRegistrationNumber(schoolName, studentClass);

        const newStudent = new Student({
            name,
            class: studentClass,
            phoneNumber,
            email,
            address,
            password: hashedPassword,
            dateOfBirth,
            schoolName: "MySchool",

            registrationNumber: registrationNumber, // Use the generated ID
        });

        await newStudent.save();

        console.log('Student registered successfully:', newStudent);
        res.status(200).json({ success: true, message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ success: false, message: 'Error registering student', error: error.message });
    }
});


// router.post('/addTeacher', async (req, res) => {
//     try {
//         const { name, email, password, class: teacherClass, position, phoneNumber, address } = req.body;

//         const existingUser = await Teacher.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({
//                 message: 'This user is already a teacher. Try registering with a new email'
//             });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcryptjs.hash(password, saltRounds);
//         const newTeacher = new Teacher({
//             name, email, position, phoneNumber, address, class: teacherClass, password: hashedPassword
//         });

//         await newTeacher.save();

//         res.status(201).json({
//             message: 'Teacher has been registered successfully'
//         });
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error inserting data',
//             error: error.message
//         });
//     }
// });

router.post('/addNewAdmin', specialAuthMiddlewareForAdmins, async (req, res) => {
    try {
        const { name, email, password, position, phoneNumber, address } = req.body;

        // Check if user already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            console.log("admin exists")

            return res.status(400).json({ message: "This user is already an admin. Try registerning with a new  email" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        const newUser = new Admin({
            name, email, position: "Admin", phoneNumber, address, password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Admin has been registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;




