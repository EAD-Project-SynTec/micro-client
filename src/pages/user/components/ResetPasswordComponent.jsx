import React, { useRef, useState } from 'react';
import { MdOutlineErrorOutline } from "react-icons/md";
import AuthService from '@/services/apiService';
import ConfirmAlert from './ConfirmAlert';
import { SpinnerColors } from '../components/Spinner.jsx';
import { useNavigate } from 'react-router-dom';


export default function ResetPasswordComponent() {
    const navigate = useNavigate();
    const pwdRef = useRef(null);
    const tokenRef = useRef(null);
    const [pwd, setPwd] = useState();
    const [confirmPwd, setConfirmPwd] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Function for handle password reset ----------------
    
    const handleReset = async (e) => {
        e.preventDefault();
        if (pwd.length<8) {
            return;
        }
        if (pwd!=confirmPwd) {
            return;
        }
        const data = { 
            token: tokenRef.current.value,
            newPassword: pwdRef.current.value
        };
        try{
            setError(false);
            setIsLoading(true);
            const response = await AuthService.resetPwd(data);
            setIsLoading(false);
            await ConfirmAlert({message:"Password has been successfully changed"});
            console.log('Server Response:', response);
            navigate('/login');
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
            <section className=" font-poppins">
                <div className="max-w-6xl px-0 mx-auto lg:px-6">
                    <div className="flex flex-col items-center h-full md:flex-row">
                        <div
                            className="flex items-center justify-center h-screen max-w-full px-0 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
                            <div className="z-10 w-full p-10 bg-gray-100 dark:bg-gray-900 h-100">
                                <h2 className="text-xl font-bold leading-tight mb-7 md:text-3xl dark:text-gray-300">
                                    Reset password</h2>
                                <p className="text-xs leading-tight mb-8 md:text-base dark:text-gray-300">
                                    A email has been sent to your email account with a password reset token. Copy and paste it hear and reset within 10 minutes.</p>
                                <form action="" className="mt-6">
                                    <div className='mt-7'>
                                        <label className="block text-gray-700 dark:text-gray-300">Reset token:</label>
                                        <input type="email"
                                            className="w-full px-4 py-3 mt-4 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                                            placeholder="Enter your token" ref={tokenRef}/>
                                        {error &&
                                            <div className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                                <MdOutlineErrorOutline size={20}/> &nbsp; Invalid token!
                                            </div>
                                        }
                                        <label className="block text-gray-700 dark:text-gray-300 pt-5">New password:</label>
                                        <input type="password"
                                            className="w-full px-4 py-3 mt-4 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                                            placeholder="Enter your email" onChange={(e)=>setPwd(e.target.value)}/>
                                        {pwd && pwd.length < 8 && (
                                          <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                              <MdOutlineErrorOutline size={20}/> &nbsp; Password must be at least 8 characters long.
                                          </p>
                                        )}
                                        <label className="block text-gray-700 dark:text-gray-300 pt-5">Confirm new password:</label>
                                        <input type="password"
                                            className="w-full px-4 py-3 mt-4 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                                            placeholder="Enter your email" onChange={(e)=>setConfirmPwd(e.target.value)} ref={pwdRef}/>
                                        {
                                              pwd!=confirmPwd && 
                                              <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                              <MdOutlineErrorOutline size={20}/> &nbsp;Please make sure your passwords match.
                                          </p>
                                          }
                                    </div>
                                    
                                    <button
                                        className="w-full px-4 py-3 mt-16 font-semibold text-gray-200 bg-primary rounded-lg hover:text-gray-700 hover:bg-green-300 "
                                        onClick={handleReset}>CONFIRM</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
