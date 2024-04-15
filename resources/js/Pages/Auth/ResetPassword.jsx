import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import './style.css';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
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

        post(route('password.store'));
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
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
<h1>RESET YOUR PASSWORD</h1>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">

                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput

                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">

                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput

                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4"   disabled={processing}>
                        <p style={{ textAlign: 'center', color:'black' , margin:'auto'}}>
                        Reset Password
                        </p>
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
