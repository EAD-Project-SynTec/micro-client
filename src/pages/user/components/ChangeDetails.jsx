import React, { useRef, useState, useEffect } from 'react'
import FormLabel from './FormLabel'
import { jwtDecode } from 'jwt-decode';
import AuthService from '../../services/apiService.js';
import { MdOutlineErrorOutline } from "react-icons/md";
import ConfirmAlert from '@/user/components/ConfirmAlert.jsx';
import ErrorAlert from '@/user/components/ErrorAlert.jsx';
import { SpinnerColors } from '../components/Spinner.jsx';
import { IoCloudUploadOutline } from "react-icons/io5";

export default function ChangeDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [addl1, setAddl1] = useState("");
    const [addl2, setAddl2] = useState("");
    const [addl3, setAddl3] = useState("");
    const [profilepic, setProfilepic] = useState("");
    const [profileImg, setprofileImg]=useState(null);
    const [pwd, setPwd]=useState("");
    const [confmpwd, setConfmpwd]=useState("");
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isEdit, setIsEdit] = useState(true);
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const usernameRef = useRef(null);
    const phoneRef = useRef(null);
    const add1Ref=useRef(null);
    const add2Ref=useRef(null);
    const add3Ref=useRef(null);
    const pwdRef = useRef(null);
    const profileInputRef=useRef(null);

    const token = sessionStorage.getItem('jwtToken');
    const decodedData = jwtDecode(token);
    const userEMail = (decodedData.email);

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
    const handleProfileImage=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        setprofileImg(e.target.files[0]);
    }
    const validatePhoneNumber = (number) => {
        const phoneNumberRegex = /^[0-9]{10}$/;
        return phoneNumberRegex.test(number);
    };

    //Getting user details from database -----------------------

    try{
        
        const token = sessionStorage.getItem('jwtToken');
        const decodedData = jwtDecode(token);
        const userEMail = (decodedData.email);
        console.log(userEMail);
        useEffect(()=>{
            async function fetchData() {
                const response = await AuthService.getDetailsAccount(userEMail);
                console.log(response);
                setFname(response.fName);
                setLname(response.lName);
                setUsername(response.userName);
                setPhoneNumber(response.phoneNumber);
                setAddl1(response.addL1);
                setAddl2(response.addL2);
                setAddl3(response.addL3);
                setProfilepic(response.profilepic);
            }
            fetchData();
        },[] );
    }
    catch(error){
        console.error(error);
    }

    //Changing the details --------------------------------------

    const handleChangeDetails = async (e) => {
        e.preventDefault();
        if (!isPhoneNumberValid) {
            ErrorAlert({ message: "Please enter valid phone number" });
            return;
        }

        const data = {
            email: userEMail,
            fName: fname,
            lName: lname,
            phoneNumber: phoneNumber,
            userName: username,
            addL1: addl1,
            addL2: addl2,
            addL3: addl3
        }
        try{
            setIsLoading(true);
            await AuthService.changeDetails(data);
            setIsLoading(false);
            await ConfirmAlert({message:"Profile has been changed successfully"});
            window.location.reload();
        }
        catch(error){
            setIsLoading(false);
            console.error('Error:', error);
        }
    }

    //Change profile image ------------------------------

    const changeProfileImg = async (e) => {
        e.preventDefault();
        if (profileImg==null) {
            ErrorAlert({ message: "Please upload the new profile picture" });
            return;
        }
        var data = {
            Email: userEMail,
            Profilepic: profileImg
        }
        try{
            setIsLoading(true);
            console.log(data);
            await AuthService.changeProfileImg(data);
            setIsLoading(false);
            await ConfirmAlert({message:"Profile image has been changed successfully"});
            window.location.reload();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    //Changing the password --------------------------------

    const handleChangePwd = async (e) => {
        e.preventDefault();
        if (pwd.length<8) {
            ErrorAlert({ message: "Password must be at least 8 characters long" });
            return;
        }
        if (pwd!=confmpwd) {
            ErrorAlert({ message: "Please make sure your passwords are match" });
            return;
        }
        const data = {
            email: userEMail,
            newPassword: pwdRef.current.value
        }
        try{
            setIsLoading(true);
            await AuthService.changePwd(data);
            setIsLoading(false);
            await ConfirmAlert({message:"Password has been changed successfully"});
            window.location.reload();

        }
        catch(error){
            setIsLoading(false);
            console.error('Error:', error);
        }
    }

  return (
    <>
        {isLoading && <SpinnerColors/>}
        <form className="py-16 bg-gray-100 dark:bg-gray-800" onSubmit={handleChangeDetails}>
            <div className="max-w-6xl px-4 mx-auto">
                <div className="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-900 dark:border-gray-900">
                <div className="pb-6 border-b border-gray-100 dark:border-gray-700 mb-9">
                        <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                            Edit Profile
                        </h2>
                </div>
                {isEdit &&
                    <img src={`https://syntecblobstorage.blob.core.windows.net/profilepic/${profilepic}`} width={200} height={200} className='rounded-xl'/>
                }
                {!isEdit &&
                    <div className='flex'>
                        <div className="w-80 p-3 md:flex-initial">
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
                        <div className="w-full md:w-auto pl-6 pt-28">
                              <input type='submit' value="Change profile photo" onClick={changeProfileImg}
                                  className=" w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-green-800 active:ring-2 active:ring-green-800 active:shadow-xl disabled:cursor-not-allowed" >
                              </input>
                        </div>
                    </div>
                }
                    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                        <div className="w-full md:w-9/12">
                            <div className="flex flex-wrap -m-3">
                                <FormLabel>Name</FormLabel>
                                    <div className="w-full p-3 md:w-1/3">
                                        <input
                                            className="w-full dark:bg-gray-800 dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="text" placeholder="First name" required ref={fnameRef} value={fname} onChange={(e)=>setFname(e.target.value)} disabled={isEdit}/>
                                    </div>
                                    <div className="w-full p-3 md:w-1/3">
                                        <input
                                            className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                            type="text" placeholder="Last name" required ref={lnameRef} value={lname} onChange={(e)=>setLname(e.target.value)} disabled={isEdit}/>
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
                                            type="text" placeholder="username" required ref={usernameRef} value={username} onChange={(e)=>setUsername(e.target.value)} disabled={isEdit}/>
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
                                        type="text" placeholder="07XXXXXXXX" required ref={phoneRef} value={phoneNumber} disabled={isEdit}
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
                                        type="text" placeholder="No. 100" required ref={add1Ref} value={addl1} onChange={(e)=>setAddl1(e.target.value)} disabled={isEdit}/>
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
                                        type="text" placeholder="Main road" required ref={add2Ref} value={addl2} onChange={(e)=>setAddl2(e.target.value)} disabled={isEdit}/>
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
                                        type="text" placeholder="Colombo" required ref={add3Ref} value={addl3} onChange={(e)=>setAddl3(e.target.value)} disabled={isEdit}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex pt-6 flex-wrap -m-1.5">
                        {isEdit && 
                          <div className="w-full md:w-auto p-1.5">
                              <input type='reset' value="Edit"
                                  className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium hover:cursor-pointer text-gray-500 bg-white border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-100 active:shadow-xl active:ring-2 active:ring-gray-300" onClick={()=>{setIsEdit(false)}}>
                              </input>
                          </div>
                        }
                        {!isEdit && 
                          <div className="w-full md:w-auto p-1.5">
                              <input type='submit' value="Save Changes"
                                  className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-green-800 active:ring-2 active:ring-green-800 active:shadow-xl disabled:cursor-not-allowed" >
                              </input>
                          </div>
                        }
                        {!isEdit && 
                          <div className="w-full md:w-auto p-1.5">
                            <input type='reset' value="Cancel"
                                className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium hover:cursor-pointer text-gray-500 bg-white border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-100 active:shadow-xl active:ring-2 active:ring-gray-300" onClick={()=>{setIsEdit(true)}}>
                            </input>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </form>
        <form className=" bg-gray-100 dark:bg-gray-800" onSubmit={handleChangePwd}>
            <div className="max-w-6xl px-4 mx-auto">
                <div className="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-900 dark:border-gray-900">
                    <div className="pb-6 border-b border-gray-100 dark:border-gray-700 mb-9">
                        <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                            Change Password
                        </h2>
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
                    <div className="flex pt-6 flex-wrap -m-1.5">
                        <div className="w-full md:w-auto p-1.5">
                            <input type='submit' value="Change Password"
                                className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-green-800 active:ring-2 active:ring-green-800 active:shadow-xl disabled:cursor-not-allowed" >
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}
