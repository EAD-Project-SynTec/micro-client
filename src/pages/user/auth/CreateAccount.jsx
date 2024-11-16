import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import FormLabel from '../components/FormLabel';
import { SpinnerColors } from '../components/Spinner.jsx';
import AuthService from '../../services/apiService.js';
import ConfirmAlert from '@/user/components/ConfirmAlert.jsx';
import ErrorAlert from '@/user/components/ErrorAlert.jsx';


export default function CreateAccount() {
  const [pwd, setPwd]=useState("");
  const [confmpwd, setConfmpwd]=useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [NIC, setNIC] = useState("");
  const [isnicValid, setIsnicValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileImg, setprofileImg]=useState(null);
  const fnameRef=useRef(null);
  const lnameRef=useRef(null);
  const usernameRef=useRef(null);
  const emailRef=useRef(null);
  const pwdRef=useRef(null);
  const nicRef=useRef(null);
  const phoneRef=useRef(null);
  const add1Ref=useRef(null);
  const add2Ref=useRef(null);
  const add3Ref=useRef(null);
  const imgInputRef=useRef(null);

  // Validating Phone number ------------------------

  const validatePhoneNumber = (number) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(number);
  };

  // Validating NIC -------------------------

  const validateNIC = (nic) => {
    const nicRegex = /^[0-9]{12}$/;
    return nicRegex.test(nic);
  };
  
  // Handling Images ----------------------------

  const handleProfileImg=(e)=>{
    const file=e.target.files[0];
    console.log(file);
    setprofileImg(e.target.files[0]);
  }

  const handleDrag=(e)=>{
    e.preventDefault();
    setIsDragging(true);
  }
  const handleDrop=(e)=>{
    e.preventDefault();
    const file=e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
        setprofileImg(e.dataTransfer.files[0]);
        console.log(file);
    } 
  }

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
    if (!isnicValid) {
        ErrorAlert({ message: "Please enter valid NIC number" });
        return;
    }
    if (!isPhoneNumberValid) {
        ErrorAlert({ message: "Please enter valid phone number" });
        return;
    }
    if (profileImg==null) {
        ErrorAlert({ message: "Please upload a profile photo" });
        return;
    }

    var formData = {
        username: usernameRef.current.value,
        password: pwdRef.current.value,
        First_Name: fnameRef.current.value,
        Last_Name: lnameRef.current.value,
        Email: emailRef.current.value,
        Phone: phoneRef.current.value,
        NICNumber: nicRef.current.value,
        AddressLine1: add1Ref.current.value,
        AddressLine2: add2Ref.current.value,
        AddressLine3: add3Ref.current.value,
        profilepic: profileImg
    }
    console.log(formData);

    try {
        setIsLoading(true);
        const registerResponse = await AuthService.userRegister(formData);
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
      <form className="py-16 bg-gray-100 dark:bg-gray-800" onSubmit={handleSubmit}>
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
                            <FormLabel>Name</FormLabel>
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
                            <FormLabel>User name</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="username" required ref={usernameRef}/>
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
                            <FormLabel>NIC number</FormLabel>
                            <div className="w-full p-3 md:flex-1">
                                <input
                                    className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                    type="text" placeholder="197419202757" required ref={nicRef}
                                    onChange={(e) => {
                                        const number = e.target.value;
                                        setNIC(number);
                                        setIsnicValid(validateNIC(number));
                                    }}/>
                                {(NIC!="" && !isnicValid) && 
                                    <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                        <MdOutlineErrorOutline size={20}/> &nbsp;Please enter a valid NIC number.
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
                <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                            <div className="w-full p-3 md:w-1/3">
                                <p className="text-base font-semibold text-gray-700 dark:text-gray-400">Profile photo</p>
                            </div>
                            <div className="w-full p-3 md:flex-1">
                                <div className="flex items-center justify-center w-full">
                                    <label for="dropzone-file"  onDragOver={handleDrag} onDrop={handleDrop} 
                                        className="flex flex-col items-center justify-center w-full h-64 bg-white border-2 border-gray-200 border-dashed rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                        {!profileImg && 
                                          <div onClick={() => imgInputRef.current.click()} className="flex flex-col items-center justify-center px-4 pt-5 pb-6 cursor-pointer">
                                              <span className="text-primary dark:text-gray-400">
                                                  <IoCloudUploadOutline size={28} />
                                              </span>
                                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                  <span className="font-semibold text-primary" role='button'>Click to upload</span> or drag
                                                  and drop
                                              </p>
                                              <input type='file' accept='image/*' hidden onChange={handleProfileImg} ref={imgInputRef}/>
                                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                                any type of image
                                              </p>
                                          </div>
                                        }
                                        {
                                          profileImg &&
                                            <div className='w-32 absolute'>
                                                <span role='button' onClick={()=>setprofileImg(null)} className='absolute top-0 right-0 text-5xl text-red-500 -mt-6 -mr-3 drop-shadow-lg'>&times;</span>
                                                <img className='w-auto h-auto' src={(URL.createObjectURL(profileImg))}/>
                                              
                                            </div>
                                        }
                                    </label>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex pt-6 flex-wrap -m-1.5">
                    <div className="w-full md:w-auto p-1.5">
                        <input type='reset' value="Clear"
                            className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium hover:cursor-pointer text-gray-500 bg-white border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-100 active:shadow-xl active:ring-2 active:ring-gray-300" onClick={()=>setprofileImg(null)}>
                        </input>
                    </div>
                    <div className="w-full md:w-auto p-1.5">
                        <input type='submit' value={isLoading==false?"Sign In":"Signing..."}
                            className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-green-800 active:ring-2 active:ring-green-800 active:shadow-xl disabled:cursor-not-allowed" disabled={isLoading}>
                        </input>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </>
  )
}
