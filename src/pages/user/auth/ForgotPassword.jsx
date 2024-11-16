import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SpinnerColors } from '../components/Spinner.jsx';
import { MdOutlineErrorOutline } from "react-icons/md";
import AuthService from '@/services/apiService.js';
import ResetPassword from '../components/ResetPasswordComponent.jsx';

export default function ForgotPassword() {
    const emailRef = useRef(null);
    const [error, setError] = useState(false);
    const [pwdResetState, setPwdResetState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Function for send reset token for email -------------------------

    const handleReset = async (e) => {
        e.preventDefault();

        const email = { email: emailRef.current.value };
        try{
            setError(false);
            setIsLoading(true);
            console.log(emailRef.current.value);
            const response = await AuthService.forgetPwd(email);
            setIsLoading(false);
            console.log('Server Response:', response);
            setPwdResetState(true);
            
        }
        catch(error){
            setIsLoading(false);
            setError(true);
            console.error('Error:', error);
        }
    }
    return (
        <>
        {isLoading && <SpinnerColors/>}
        {!pwdResetState &&
            <section className=" font-poppins">
                <div className="max-w-6xl px-0 mx-auto lg:px-6">
                    <div className="flex flex-col items-center h-full md:flex-row">
                        <div
                            className="flex items-center justify-center h-screen max-w-full px-0 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
                            <div className="z-10 w-full p-10 bg-gray-100 dark:bg-gray-900 h-100">
                                <h2 className="text-xl font-bold leading-tight mb-7 md:text-3xl dark:text-gray-300">
                                    Forgot your password?</h2>
                                <p className="text-xs leading-tight mb-8 md:text-base dark:text-gray-300">
                                    Enter your email to reset the password</p>
                                <form action="" className="mt-6">
                                    <div className='mt-12'>
                                        <label className="block text-gray-700 dark:text-gray-300">Email:</label>
                                        <input type="email"
                                            className="w-full px-4 py-3 mt-4 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                                            placeholder="Enter your email" ref={emailRef}/>
                                    </div>
                                    {error &&
                                        <div className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                            <MdOutlineErrorOutline size={20}/> &nbsp; Email is invalid
                                        </div>
                                    }
                                    <button
                                        className="w-full px-4 py-3 mt-16 font-semibold text-gray-200 bg-primary rounded-lg hover:text-gray-700 hover:bg-green-300 "
                                        onClick={handleReset}>RESET</button>
                                    
                                    <p className='mt-6 text-center'>
                                        <Link className="font-semibold text-primary hover:text-green-800" to={"/login"}> Back to Login</Link>
                                    </p>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        }

        {/* Render ResetPassword when user click Reset */}

        {pwdResetState &&
            <ResetPassword/>
        }   
        </>
    )
}
