
import React, { useState } from 'react';
import NavBarSection from '../Components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from "./config";




const StudentReg = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        dateOfBirth: '',
        class: '',
        password:'',
    });

    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }

        if (!formData.address) {
            newErrors.address = 'Address is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (!formData.class) {
            newErrors.class = 'Class is required';
        }


        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(formData)
            try {
                const response = await fetch(`${baseUrl}/addStudent`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        toast.error(errorData.message);
                    } else {
                        console.error('Registration failed:', errorData);
                        toast.error('An unexpected error occurred.');
                    }
                    return;
                }

                const data = await response.json();
                toast.success("Your account has been created.");
                console.log('Admin created successfully:', data);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert(error.message);
            }
        }
    };

    const classOptions = [
        "JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"
    ];

    return (


        <>
            <NavBarSection />


            <div className="form-container">
                <h2>Students' Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="input-container">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className="input-field"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                        {errors.dateOfBirth && (
                            <span className="error-message">{errors.dateOfBirth}</span>
                        )}
                    </div>

                    <div className="input-container">
                        <label htmlFor="class">Class:</label>
                        <select
                            id="class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="">Select Class</option>
                            {classOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {errors.class && (
                            <span className="error-message">{errors.class}</span>
                        )}
                    </div>

                    <div className="input-container">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.phoneNumber && (
                            <span className="error-message">{errors.phoneNumber}</span>
                        )}
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {/* 
                    <div className="input-container">
                        <label htmlFor="parentOrGuardianName">Parent/Guardian Name:</label>
                        <input
                            type="text"
                            id="parentOrGuardianName"
                            name="parentOrGuardianName"
                            value={formData.parentOrGuardianName}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                        {errors.parentOrGuardianName && (
                            <span className="error-message">{errors.parentOrGuardianName}</span>
                        )}
                    </div>

                    <div className="input-container">
                        <label htmlFor="parentOrGuardianNumber">Parent/Guardian Number:</label>
                        <input
                            type="tel" // Use tel input type for phone numbers
                            id="parentOrGuardianNumber"
                            name="parentOrGuardianNumber"
                            value={formData.parentOrGuardianNumber}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                        {errors.parentOrGuardianNumber && (
                            <span className="error-message">{errors.parentOrGuardianNumber}</span>
                        )}
                    </div>

                    <div className="input-container">
                        <label htmlFor="emergencyContact">Emergency Contact:</label>
                        <input
                            type="tel" // Use tel input type for phone numbers
                            id="emergencyContact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                        {errors.emergencyContact && (
                            <span className="error-message">{errors.emergencyContact}</span>
                        )}
                    </div>
 */}
                    {/* <div className="input-container">
                        <label htmlFor="admissionYear">Admission Year:</label>
                        <input
                            type="number" // Use number input type for years
                            id="admissionYear"
                            name="admissionYear"
                            value={formData.admissionYear}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                        {errors.admissionYear && (
                            <span className="error-message">{errors.admissionYear}</span>
                        )}
                    </div> */}

                    {/* <div className="input-container">
                        <label htmlFor="profilePicture">Profile Picture:</label>
                        <input
                            type="file" // Use file input type for profile picture
                            id="profilePicture"
                            name="profilePicture"
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.profilePicture && (
                            <span className="error-message">{errors.profilePicture}</span>
                        )}
                    </div> */}



                    <button type="submit" className="submit-button">Submit</button>
                </form>

                {serverErrorMessage && (
                    <span className="error-message">{serverErrorMessage}</span>
                )}
            </div>
            <Toaster position='top-center' />

        </>
    );
};



export default StudentReg