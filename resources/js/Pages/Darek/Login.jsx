import React, { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia

import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import './style.css'; // Import your custom CSS styles

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const { email } = data;
        const response1 = post(route('login'));
        // if(response1.status){
        // const response = await Inertia.post('/getDarek', { email });}
    };
        // await post(route('getDarek'), { email });
       
        
        
        
        // const response = await Inertia.post('/getDarek', { email });

        // const response = await fetch('/Darek/Profile', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email }),
        // });
    
        // Handle the response as needed


        // const encodedEmail = encodeURIComponent(email);

        // window.location.href = `/getDarek?query=${encodedEmail}`;
   
        
    



    return (
        <div className='cont'>
            <div className="background">
                <div className="shape">
                    <div className='theshape'>
                        <svg className='house-shape1' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.08182 3.86595C10.8254 2.61272 13.1746 2.61272 14.9182 3.86595L18.9182 6.74095C20.2252 7.68034 21 9.19147 21 10.801V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V10.801C3 9.19147 3.77484 7.68034 5.08182 6.74095L9.08182 3.86595ZM8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18C16 18.5523 15.5523 19 15 19H9C8.44771 19 8 18.5523 8 18Z" fill="#ffffff"></path> </g></svg>
                    </div>
                </div>
                <div className="shape">
                    <div className="theshape">
                        <svg className='house-shape2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.08182 3.86595C10.8254 2.61272 13.1746 2.61272 14.9182 3.86595L18.9182 6.74095C20.2252 7.68034 21 9.19147 21 10.801V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V10.801C3 9.19147 3.77484 7.68034 5.08182 6.74095L9.08182 3.86595ZM8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18C16 18.5523 15.5523 19 15 19H9C8.44771 19 8 18.5523 8 18Z" fill="#ffffff"></path> </g></svg>
                    </div>
                </div>
            </div>

            <Head title="Log in" />
            {status && <div className="status-message">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email" value="Email" />

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="text-input"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="error-message" />
                </div>

                <div>
                    <label htmlFor="password" value="Password" />

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="text-input"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="error-message" />
                </div>

                {/* <div>
                    <label className="checkbox-label">
                        <input type="checkbox"
                        className='checkbox'
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="checkbox-text">Remember me</span>
                    </label>
                </div> */}

                <div>
                    {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="reset-password-link"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                    <button disabled={processing}>
                        Log in
                    </button>
                    <a href="/forgot-password">Forgot Password?</a><br/>
                <a id='register' href="/register">You don't have an account?</a>

                </div>
            </form>
        </div>
    );
}
