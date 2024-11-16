import React, { useRef, useState } from 'react';
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import AuthService from '../../services/apiService.js';
import FormLabel from '../components/FormLabel';
import { SpinnerColors } from '../components/Spinner.jsx';
import CourierBanner from '../components/CourierBanner';
import ConfirmAlert from '@/user/components/ConfirmAlert.jsx';
import ErrorAlert from '@/user/components/ErrorAlert.jsx';

export default function CourierCreateAccount() {
    const [pwd, setPwd]=useState("");
    const [confmpwd, setConfmpwd]=useState("");
    const [NIC, setNIC] = useState("");
    const [isNICValid, setIsNICValid] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [profileImg, setprofileImg]=useState(null);
    const [vehicleImg, setVehicleImg] = useState(null);
    const [dlImg, setDlImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    const vehicleNumRef=useRef(null);
    const profileInputRef=useRef(null);
    const vehicleInputRef=useRef(null);
    const drivingLInputRef=useRef(null);
  
    // Handling Images ----------------------------
    
    const handleProfileImage=(e)=>{
      const file=e.target.files[0];
      console.log(file);
      setprofileImg(e.target.files[0]);
    }
    const handleVehicleImg=(e)=>{
      const file=e.target.files[0];
      console.log(file);
      setVehicleImg(e.target.files[0]);
    }
    const handleDLImg=(e)=>{
      const file=e.target.files[0];
      console.log(file);
      setDlImg(e.target.files[0]);
    }
    const handleDrag=(e)=>{
      e.preventDefault();
    }
    const handleDropProfile=(e)=>{
      e.preventDefault();
      const file=e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
          setprofileImg(e.dataTransfer.files[0]);
          console.log(file);
      } 
    }
    const handleDropVehicleImg=(e)=>{
      e.preventDefault();
      const file=e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
          setVehicleImg(e.dataTransfer.files[0]);
          console.log(file);
      } 
    }
    const handleDropDLImg=(e)=>{
      e.preventDefault();
      const file=e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
          setDlImg(e.dataTransfer.files[0]);
          console.log(file);
      } 
    }

    // Validating Phone number ------------------------

    const validatePhoneNumber = (number) => {
      const phoneNumberRegex = /^[0-9]{10}$/;
      return phoneNumberRegex.test(number);
    };
  
    // Validating NIC -------------------------

    const validateNIC = (number) => {
      const nicRegex = /^[0-9]{12}$/;
      return nicRegex.test(number);
    };
    
    // Function for handle form submission ------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (pwd.length<8) {
            ErrorAlert({ message: "Password must be at least 8 characters long" });
            return;
        }
        if (pwd!=confmpwd) {
            ErrorAlert({ message: "Please make sure your passwords are match" });
            return;
        }
        if (!isNICValid) {
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
        if (vehicleImg==null) {
            ErrorAlert({ message: "Please upload a image of courier vehicle" });
            return;
        }
        if (dlImg==null) {
            ErrorAlert({ message: "Please upload a image of driving license" });
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
            vehicleNumber: vehicleNumRef.current.value,
            profilepic: profileImg,
            vehicle: vehicleImg,
            license: dlImg
        }
        console.log(formData);
        try {
            setIsLoading(true);
            const registerResponse = await AuthService.courierRegister(formData);
            setIsLoading(false);
            await ConfirmAlert({message:"Courier account has been created"});
            window.location.reload();
            console.log('Server Response:', registerResponse);
            const emailResponse = AuthService.sendEmail(emailData);
            console.log('Email Response:', emailResponse);
            
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
          <CourierBanner/>
          <div>
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
                                      {pwd && pwd.length < 8 && (
                                          <p className="mt-4 flex text-base font-semibold text-red-400 dark:text-gray-400">
                                              <MdOutlineErrorOutline size={20}/> &nbsp; Password must be at least 8 characters long.
                                          </p>
                                      )}
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
                                          type="password" placeholder="******" required onChange={(e)=>setConfmpwd(e.target.value)} ref={pwdRef}/>
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
                                              setIsNICValid(validateNIC(number));
                                          }}
                                          />
                                      {(NIC!="" && !isNICValid) && 
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
                                  <FormLabel>Vehicle registration number</FormLabel>
                                  <div className="w-full p-3 md:flex-1">
                                      <input
                                          className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                          type="text" placeholder="ABC-XXXX" required ref={vehicleNumRef}/>
                                  </div>
                              </div>
                          </div>
                      </div>
  
                      <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                          <div className="w-full md:w-9/12">
                              <div className="flex flex-wrap -m-3">
                                  <FormLabel>Profile photo</FormLabel>
                                  <div className="w-full p-3 md:flex-1">
                                      <div className="flex items-center justify-center w-full">
                                          <label for="dropzone-file"  onDragOver={handleDrag} onDrop={handleDropProfile} 
                                              className="flex flex-col items-center justify-center w-full h-64 bg-white border-2 border-gray-200 border-dashed rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                              {!profileImg && 
                                                  <div onClick={() => profileInputRef.current.click()} className="flex flex-col items-center justify-center px-4 pt-5 pb-6 cursor-pointer">
                                                      <span className="text-primary dark:text-gray-400">
                                                          <IoCloudUploadOutline size={28} />
                                                      </span>
                                                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                          <span className="font-semibold text-primary" role='button'>Click to upload</span> or drag
                                                                  and drop
                                                      </p>
                                                      <input type='file' accept='image/*' hidden onChange={handleProfileImage} ref={profileInputRef}/>
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
  
                      <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                          <div className="w-full md:w-9/12">
                              <div className="flex flex-wrap -m-3">
                                  <FormLabel>Vehicle photo</FormLabel>
                                  <div className="w-full p-3 md:flex-1">
                                      <div className="flex items-center justify-center w-full">
                                          <label for="dropzone-file"  onDragOver={handleDrag} onDrop={handleDropVehicleImg} 
                                              className="flex flex-col items-center justify-center w-full h-64 bg-white border-2 border-gray-200 border-dashed rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                              {!vehicleImg && 
                                                  <div onClick={() => vehicleInputRef.current.click()} className="flex flex-col items-center justify-center px-4 pt-5 pb-6 cursor-pointer">
                                                      <span className="text-primary dark:text-gray-400">
                                                          <IoCloudUploadOutline size={28} />
                                                      </span>
                                                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                          <span className="font-semibold text-primary" role='button'>Click to upload</span> or drag
                                                                  and drop
                                                      </p>
                                                      <input type='file' accept='image/*' hidden onChange={handleVehicleImg} ref={vehicleInputRef}/>
                                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                  any type of image
                                                      </p>
                                                  </div>
                                              }
                                              {
                                                  vehicleImg &&
                                                  <div className='w-32 absolute'>
                                                      <span role='button' onClick={()=>setVehicleImg(null)} className='absolute top-0 right-0 text-5xl text-red-500 -mt-6 -mr-3 drop-shadow-lg'>&times;</span>
                                                      <img className='w-auto h-auto' src={(URL.createObjectURL(vehicleImg))}/>
                                                  
                                                  </div>
                                              }
                                          </label>
                                      
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
  
                      <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                          <div className="w-full md:w-9/12">
                              <div className="flex flex-wrap -m-3">
                                  <FormLabel>Driving license photo</FormLabel>
                                  <div className="w-full p-3 md:flex-1">
                                      <div className="flex items-center justify-center w-full">
                                          <label for="dropzone-file"  onDragOver={handleDrag} onDrop={handleDropDLImg} 
                                              className="flex flex-col items-center justify-center w-full h-64 bg-white border-2 border-gray-200 border-dashed rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                              {!dlImg && 
                                                  <div onClick={() => drivingLInputRef.current.click()} className="flex flex-col items-center justify-center px-4 pt-5 pb-6 cursor-pointer">
                                                      <span className="text-primary dark:text-gray-400">
                                                          <IoCloudUploadOutline size={28} />
                                                      </span>
                                                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                          <span className="font-semibold text-primary" role='button'>Click to upload</span> or drag
                                                                  and drop
                                                      </p>
                                                      <input type='file' accept='image/*' hidden onChange={handleDLImg} ref={drivingLInputRef}/>
                                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                  any type of image
                                                      </p>
                                                  </div>
                                              }
                                              {
                                                  dlImg &&
                                                  <div className='w-32 absolute'>
                                                      <span role='button' onClick={()=>setDlImg(null)} className='absolute top-0 right-0 text-5xl text-red-500 -mt-6 -mr-3 drop-shadow-lg'>&times;</span>
                                                      <img className='w-auto h-auto' src={(URL.createObjectURL(dlImg))}/>
                                                  
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
                                  className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium hover:cursor-pointer text-gray-500 bg-white border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-100 active:shadow-xl active:ring-2 active:ring-gray-300" onClick={()=>{setprofileImg(null); setVehicleImg(null); setDlImg(null)}}>
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
          </div>
      </>
    )
}
