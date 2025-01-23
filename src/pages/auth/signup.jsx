import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import FormLabel from '../../components/FormLabel';
import { SpinnerColors } from '../../components/Spinner';
import AuthService from '../../services/apiService.js';
import ConfirmAlert from '@/pages/user/components/ConfirmEmailAlert';
 import ErrorAlert from '@/pages/user/components/ErrorAlert.jsx';


export default function signup() {
  const [pwd, setPwd]=useState("");
  const [confmpwd, setConfmpwd]=useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fnameRef=useRef(null);
  const lnameRef=useRef(null);
  const emailRef=useRef(null);
  const pwdRef=useRef(null);
  const phoneRef=useRef(null);
  const add1Ref=useRef(null);
  const add2Ref=useRef(null);
  const add3Ref=useRef(null);


  // Validating Phone number ------------------------

  const validatePhoneNumber = (number) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(number);
  };

  // Function for handle form submission ------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd.length < 8) {
        ErrorAlert({ message: "Password minimum length should be 8 characters" });
        return;
    }
    if (pwd!=confmpwd) {
        ErrorAlert({ message: "Please make sure your passwords are match" });
        return;
    }
   
    if (!isPhoneNumberValid) {
        ErrorAlert({ message: "Please enter valid phone number" });
        return;
    }

    var formData = {
        role:'buyer',
        password: pwdRef.current.value,
        firstName: fnameRef.current.value,
        lastName: lnameRef.current.value,
        email: emailRef.current.value,
        phoneNumber: phoneRef.current.value,
        // NICNumber: nicRef.current.value,
        addressLine1: add1Ref.current.value,
        addressLine2: add2Ref.current.value,
        addressLine3: add3Ref.current.value,
        profilePhoto: "pic"
    }
    console.log(formData);

    try {
        setIsLoading(true);
        const registerResponse = await AuthService.Registration(formData);
        setIsLoading(false);
        await ConfirmAlert({message:"User account has been created"});
        window.location.reload();
        console.log('Server Response:', registerResponse);
        
    } catch (error) {
        setIsLoading(false);
        console.error('Error:', error);
        if (error === "Email exist") {
            ErrorAlert({ message: "Error: Email already exists and you cannot register with an existing email address" });
        }
    }
  };

  return (
    <>
        {isLoading && <SpinnerColors/>}
      <form className="py-16 bg-gray-100 dark:bg-gray-800" 
      onSubmit={handleSubmit}
      >
        <div className="max-w-6xl px-4 mx-auto">
            <div className="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-900 dark:border-gray-900">
                <div className="pb-6 border-b border-gray-100 dark:border-gray-700 ">
                    <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                        Sign Up
                    </h2>
                    <p className="text-xs font-medium text-gray-500">
                        Enter your details below
                    </p>
                </div>
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            {/* <FormLabel>Name</FormLabel> */}
                            <div className="w-full p-3 md:w-1/3">
                                <input
                                    className="w-full dark:bg-gray-800 dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="First name" required ref={fnameRef}/>
                            </div>
                            <div className="w-full p-3 md:w-1/3">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="Last name" required ref={lnameRef}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Email address</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="email" placeholder="name@gmail.com" required ref={emailRef}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Password</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="password" placeholder="******" required onChange={(e)=>setPwd(e.target.value)}/>
                                {
                                    pwd && pwd.length<8 &&
                                    <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                        <MdOutlineErrorOutline size={20}/> &nbsp;Password minimum length should be 8 characters.
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Confirm password</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="password" placeholder="******" required onChange={(e) => { setConfmpwd(e.target.value)}} ref={pwdRef}/>
                                    {
                                      pwd!=confmpwd && 
                                      <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                        <MdOutlineErrorOutline size={20}/> &nbsp;Please make sure your passwords match.
                                      </p>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
                
               
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Phone number</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="07XXXXXXXX" required ref={phoneRef}
                                    onChange={(e) => {
                                        const number = e.target.value;
                                        setPhoneNumber(number);
                                        setIsPhoneNumberValid(validatePhoneNumber(number));
                                    }}/>
                                {(phoneNumber!="" && !isPhoneNumberValid) && 
                                    <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                        <MdOutlineErrorOutline size={20}/> &nbsp;Please enter a valid phone number.
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                 
              

                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Address line 1</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="No. 100" required ref={add1Ref}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Address line 2</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="Main road" required ref={add2Ref}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <FormLabel>Address line 3</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="Colombo" required ref={add3Ref}/>
                            </div>
                        </div>
                    </div>
                </div>
              
                <div className="flex pt-6 flex-wrap -m-1.5">
                   
                    <div className="w-full md:w-auto p-1.5">
                        <input type='submit' value={isLoading==false?"Sign In":"Signing..."}
                            className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-primary rounded-md hover:bg-green-800 active:ring-2 active:ring-green-800 active:shadow-xl disabled:cursor-not-allowed" disabled={isLoading}>
                        </input>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </>
  )
}
