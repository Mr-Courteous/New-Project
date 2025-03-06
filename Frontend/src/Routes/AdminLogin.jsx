import NavBarSection from "../Components/Navbar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from './config';




function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/adminLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful login
                const data = await response.json();
                // Handle successful login, e.g., store token in local storage
                localStorage.setItem('teacherToken', data.token);
                console.log('Login successful!', data);
                toast.success(response.message)

            } else {
                console.error('Login failed:', response.status);
                // Handle login errors, e.g., display an error message to the user
                // alert('Invalid email or password.');

                const responseM = await response.json();
                toast.error(responseM.message)


            }

        } catch (error) {
            console.error('Error during login:', error);
            // Handle network errors or other unexpected issues
            toast.error(error.message)
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
            <Toaster position='top-center' />


        </>

    )
}


export default AdminLogin;