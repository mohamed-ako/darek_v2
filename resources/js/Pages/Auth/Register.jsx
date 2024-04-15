import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import './style.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '', // Corrected field name
        last_name: '', // Corrected field name
        email: '',
        username: '', // Added username field
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <div className='cont'>
                        <div className="background">
                <div className="shape">
                    <div className='theshape'>
                    <svg class='house-shape1' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.08182 3.86595C10.8254 2.61272 13.1746 2.61272 14.9182 3.86595L18.9182 6.74095C20.2252 7.68034 21 9.19147 21 10.801V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V10.801C3 9.19147 3.77484 7.68034 5.08182 6.74095L9.08182 3.86595ZM8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18C16 18.5523 15.5523 19 15 19H9C8.44771 19 8 18.5523 8 18Z" fill="#ffffff"></path> </g></svg>
                    </div>
                </div>
                <div className="shape">
                    <div className="theshape">
                    <svg class='house-shape2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.08182 3.86595C10.8254 2.61272 13.1746 2.61272 14.9182 3.86595L18.9182 6.74095C20.2252 7.68034 21 9.19147 21 10.801V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V10.801C3 9.19147 3.77484 7.68034 5.08182 6.74095L9.08182 3.86595ZM8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18C16 18.5523 15.5523 19 15 19H9C8.44771 19 8 18.5523 8 18Z" fill="#ffffff"></path> </g></svg>
                    </div>
                </div>
            </div>
        <Head title="Register" />

        <form onSubmit={submit}>
            <div>
                <h2>SGINUP NOW</h2>
                {/* <InputLabel htmlFor="first_name" value="First Name" />  */}
                <TextInput
                placeholder="First Name"
                    id="first_name"
                    name="first_name"
                    value={data.first_name} 
                    className="mt-1 block w-full"
                    autoComplete="first_name"
                    isFocused={true}
                    onChange={(e) => setData('first_name', e.target.value)} 
                    required
                />
                <InputError message={errors.first_name} className="mt-2" /> 
            </div>
            
            <div className="mt-4">
                {/* <InputLabel htmlFor="last_name" value="Last Name" />  */}
                <TextInput
                placeholder='Last Name'
                    id="last_name"
                    name="last_name"
                    value={data.last_name} 
                    className="mt-1 block w-full"
                    autoComplete="last_name"
                    isFocused={true}
                    onChange={(e) => setData('last_name', e.target.value)} 
                    required
                />
                <InputError message={errors.last_name} className="mt-2" /> 
            </div>

            <div className="mt-4">
                {/* <InputLabel htmlFor="email" value="Email" /> */}
                <TextInput
                placeholder="Email"
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="email"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                {/* <InputLabel htmlFor="username" value="Username" /> Added label */}
                <TextInput
                placeholder='Username'
                    id="username"
                    type="text"
                    name="username"
                    value={data.username}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData('username', e.target.value)} 
                    required
                />
                <InputError message={errors.username} className="mt-2" /> 
            </div>

            <div className="mt-4">
                {/* <InputLabel htmlFor="password" value="Password" /> */}
                <TextInput
                placeholder="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                {/* <InputLabel htmlFor="password_confirmation" value="Confirm Password" /> */}
                <TextInput
                placeholder='Confirm Password'
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="flex flex-col items-center justify-center ">
                <Link
                style={{margin:0 }}
                    href={route('dareklogin')}
                    // className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <PrimaryButton 
                className=" m-0" 
                disabled={processing}>
                    
                    <p style={{ textAlign: 'center', color:'black' , margin:'auto'}}>
                        Register
                        </p>
                </PrimaryButton>
            </div>
        </form>
    </div>
);
}
