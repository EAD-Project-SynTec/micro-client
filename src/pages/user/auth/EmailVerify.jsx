import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { SpinnerColors } from '../components/Spinner.jsx';
import ConfirmEmailAlert from '@/user/components/ConfirmEmailAlert';
import AuthService from '@/services/apiService';
import verifyemailIMG from '/img/Verify-email.png'

export default function EmailVerify() {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    // Get token from URL --------------------------------
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const data={
        token:token
    }
    console.log(token);

    // Function to verify email -----------------------
    const onrender = async (e) => {
        try{
            setIsLoading(true);
            const response = await AuthService.verifyEmail(data);
            console.log("Server response: ", response);
            setIsLoading(false);
            ConfirmEmailAlert({ message: "Your email is successfully verified!" , iconType:"success"});
        }
        catch(error){
            setIsLoading(false);
            if (error === "Already verified") {
                ConfirmEmailAlert({message:"Your email has already verified." , iconType:"info"})
            }
            else{
                ConfirmEmailAlert({ message: "Error, can't verify your email. Check the link again." , iconType:"error" })
            }
            console.error("Error: ", error);
        }
    }
    
    
    return (
    <>
        {isLoading && <SpinnerColors/>}
        <div className="max-w-6xl px-0 mx-auto lg:px-6">
            <div className="flex flex-col items-center h-full md:flex-row">
                <div className="flex items-center justify-center h-screen max-w-full px-0 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
                    <div className="z-10 w-full p-10 bg-gray-100 dark:bg-gray-900 h-100">
                        <div className='z-10 w-full p-10 bg-gray-100 dark:bg-gray-900 h-100'>
                        <img src={verifyemailIMG}/>
                            <button className="w-full px-4 py-3 mt-6 font-semibold text-gray-200 bg-primary rounded-lg hover:text-gray-700 hover:bg-green-300 "
                                type="submit" onClick={onrender}>Verify</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    </>
    )
}



