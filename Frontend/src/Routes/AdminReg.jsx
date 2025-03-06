
import React, { useState } from 'react';
import NavBarSection from '../Components/Navbar';
import baseUrl from './config';


const AdminReg = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: '',
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

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch(`${baseUrl}/addNewAdmin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });


                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        // Handle specific error message from backend
                        alert(errorData.message);
                    } else {
                        console.error('Registration failed:', errorData);
                        alert('An unexpected error occurred.');
                    }
                    return;
                }

                const data = await response.json();
                console.log('Admin created successfully:', data);
                // Handle successful form submission 

            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while processing your request.');
            }
        }
    };

    return (


        <>
            <NavBarSection />


            <div className="form-container">
                <h2>Admin Registration</h2>
                <form onSubmit={handleSubmit}>      <div className="input-container">
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

                    {/* <div className="input-container">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="input-field"
          />
          {errors.position && (
            <span className="error-message">{errors.position}</span>
          )}
        </div> */}

                    <button type="submit" className="submit-button">Submit</button>
                </form>

                {serverErrorMessage && (
                    <span className="error-message">{serverErrorMessage}</span>
                )}
            </div>

        </>
    );
};


export default AdminReg;