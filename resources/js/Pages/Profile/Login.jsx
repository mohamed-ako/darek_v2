// resources/js/Pages/Login.js
import './style.css';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/login', formData).then((response) => {
            if (response.errors && response.errors.email) {
                setErrorMessage(response.errors.email[0]);
            } else {
                // Redirect to the desired page on successful login
                Inertia.visit('Darek/Profile');
            }
        });
    };

    return (
        <div className='cont'>
            <h1>Login</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                {/* Include the CSRF token as a hidden input */}
                <input type="hidden" name="_token" value={window.csrfToken} />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
