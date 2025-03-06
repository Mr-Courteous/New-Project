import NavBarSection from "../Components/Navbar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from "./config";


function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/studentLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Successful login: Store token in local storage
                localStorage.setItem('token', data.token); // Assuming the backend sends a token in the response
                console.log('Login successful!', data);
                toast.success(data.message);

                // Navigate to a protected route or dashboard after successful login
                navigate('/studentProfile'); // Replace with your desired route

            } else {
                const responseM = await response.json();
                toast.error(responseM.message); // Display login error message
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error(error.message); // Display network or unexpected error message
        }
    };

    return (
        <>
            <NavBarSection />
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <Toaster position="top-center" />
        </>
    );
}

export default StudentLogin;