import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar"
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from "./config";


const StudentProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage

                const response = await axios.get(`${baseUrl}/studentProfile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error(error.message)
            }
        };

        fetchUserProfile();
    }, []);
 
    return (
        <div className="profile-container">

            <Navbar />
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <div className="profile-image">
                        <img src={user.profilePicture} alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Class:</strong> {user.class}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Parent/Guardian Name:</strong> {user.parentOrGuardianName}</p>
                        <p><strong>Parent/Guardian Number:</strong> {user.parentOrGuardianNumber}</p>
                        <p><strong>Emergency Contact:</strong> {user.emergencyContact}</p>
                        <p><strong>Admission Year:</strong> {user.admissionYear}</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            <Toaster position='top-center' />

        </div>
    );
};

export default StudentProfile;