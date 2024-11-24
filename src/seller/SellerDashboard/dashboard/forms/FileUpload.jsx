import React from 'react';
import { useState } from 'react';
import { BsX } from "react-icons/bs";
const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleDragOver = (event) => {
    event.preventDefault();
    event.target.classList.add('border-blue-500');
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove('border-blue-500');
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.target.classList.remove('border-blue-500');

    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    onFileSelect(file);
    console.log('Selected file:', file);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className='flex p-4 flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100'>
        <label
          htmlFor="dropzone-file"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG or JPG  (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

        </label>
        {selectedFile ? (
          <div className='-mt-12'>
            <div className=" bg-secondary w-full px-4 py-2 rounded-lg">
              <h2 className="my-4 text-sm text-gray-700" >Selected File:</h2>
              <div
                className="text-gray-500 text-[17px] cursor-pointer"
                onClick={handleRemoveFile}
              >
                <BsX className="ml-auto text-red-700 " size={24} />
                <img src={URL.createObjectURL(selectedFile)} alt="Selected file" className='w-[150px] rounded-md' />
                <span className='text-sm'>{selectedFile.name}</span>
              </div>
            </div>
          </div>
        ) : null}

      </div>
    </div>

  );
}

export default FileUpload;
