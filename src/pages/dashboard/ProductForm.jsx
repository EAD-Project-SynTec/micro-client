import React, { useEffect, useRef, useState } from "react";
import { Radio, Typography } from "@material-tailwind/react";
import { InputField, Title } from "./FormComponents.jsx";
import { Button } from "@material-tailwind/react";
import {
  fruits,
  productTypes,
  productTypesSelect,
  vegetables,
} from "@/data/product-type-data";
// import FileUpload from './FileUpload.jsx';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ProductForm = ({
  onSubmitData,
  productData,
  isUpdate,
  handleupdateImage,
}) => {
  const [sellerId, setSellerId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const decodedData = jwtDecode(token);
      setSellerId(decodedData.sid);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [sellerId]);

  // get user inputs
  const productTitleRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const unitPriceRef = useRef(null);
  const availableStockRef = useRef(null);
  const fileRef = useRef(null);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [productimg, setProductimg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(true);
  const [isSelectimg, setIsSelectimg] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  // category selection functions
  const handleProductTypeChange = (event) => {
    const value = event.target.value;
    setSelectedProductType(value);
    console.log(value);
  };

  //validate the form
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!productTitleRef.current.value) {
      errors.productTitle = "Product title is required";
    }

    if (!productDescriptionRef.current.value) {
      errors.productDescription = "Product description is required";
    }

    if (!unitPriceRef.current.value) {
      errors.unitPrice = "Unit price is required!";
    }

    if (!availableStockRef.current.value) {
      errors.availableStock = "Available stock is required!";
    } else if (availableStockRef.current.value < 0) {
      errors.availableStock = "Available stock should be greater than 0!";
    }

    if (!selectedProductType) {
      errors.selectedProductType = "Product type is required!";
    }

    if (!isUpdate && !selectedFile) {
      errors.selectedFile = "Product Image is required!";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    console.log("productData from Product Form", productData);
    productData && setSelectedProductType(productData.category
    );
    productData &&
      productTitleRef.current &&
      (productTitleRef.current.value = productData.name);
    productData &&
      productDescriptionRef.current &&
      (productDescriptionRef.current.value = productData.description);
    productData &&
      unitPriceRef.current &&
      (unitPriceRef.current.value = productData.price);
    productData &&
      availableStockRef.current &&
      (availableStockRef.current.value = productData.quantity);
    selectedFile && setSelectedFile(productData.imageUrl);
if (isUpdate) {
  !selectedFile && setSelectedFile(productData.imageUrl);
     }
    console.log("selectedFile", selectedFile);
  }, [productData]);

  //upload product function
  function addFormData() {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", productTitleRef.current.value);
    formData.append("sellerId", sellerId);
    formData.append("description", productDescriptionRef.current.value);
    formData.append("price", unitPriceRef.current.value);
    formData.append("quantity", availableStockRef.current.value);
    formData.append("category", selectedProductType);
    formData.append("imageUrl", productimg);

     
    onSubmitData(formData);
  }
  //file upload function from FileUpload.jsx
  // const handleFileSelect = (file) => {
  //   setSelectedFile(file);
  //   setChange(false);
  //   console.log(selectedFile)
  // }
  // //edit file function
  // const handleFileChange = () => {
  //   handleupdateImage(selectedFile);
  //   setChange(true);
  // }

  const handleFileUplaod = async (event) => {
    const file = event.target.files[0];

    if (!file) return;
    setImgLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "firstUpload");
    data.append("cloud_name", "djuyc3vj0");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvt5ubo1q/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageUrl = await res.json();
    console.log(uploadedImageUrl.url);
    setProductimg(uploadedImageUrl.url);
    setSelectedFile(uploadedImageUrl.url);
    setIsSelectimg(true);
    console.log("selected", selectedFile);
    setImgLoading(false);
  };

  const handleFileChange = (event) => {
    handleFileUplaod(event);
    // handleFileSelect(event);
    // console.log("event",event.target.file)
  };

  return (
    <div>
      <div className="relative my-4 py-10 flex flex-col text-gray-700 bg-white shadow-none rounded-xl bg-clip-border ">
        <form className=" mt-8 mx-8 mb-2 w-100 ">
          <div className="flex flex-col gap-6 mb-1">
            {/* title*/}
            <InputField
              title="Product Title"
              type="text"
              reference={productTitleRef}
              placeholder="Title"
              hint="Enter your Product Name"
              error={errors.productTitle}
            />
            {/* description*/}
            <div className="w-96">
              <Title title="Description"></Title>
              <div class="relative w-full min-w-[200px]">
                <textarea
                  className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  ref={productDescriptionRef}
                ></textarea>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Description
                </label>
              </div>
              {errors && (
                <span className="text-red-500 text-sm">
                  {errors.productDescription}
                </span>
              )}
            </div>

            {/* select type  */}
            <div>
              <Title title="Select Product Type"></Title>
              <div className="flex gap-10 -mt-4">
                {productTypesSelect.map((type) => (
                  <Radio
                    key={type.value}
                    name="type"
                    value={type.value}
                    checked={selectedProductType === type.value}
                    onChange={handleProductTypeChange}
                    label={
                      <Typography
                        color="blue-gray"
                        className="font-normal text-blue-gray-700"
                      >
                        {type.label}
                      </Typography>
                    }
                  />
                ))}
              </div>
              {errors && (
                <span className="text-red-500 text-sm">
                  {errors.selectedProductType}
                </span>
              )}
            </div>

           
            {/* upload product image */}
            <Title title="Upload Product Image" />
            <div className="flex items-center justify-center w-full">
              {!isSelectimg && !isUpdate ? (
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {!imgLoading ? (
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                        />
                      </svg>
                    ) : (
                      <div className="w-8 h-8 mb-4 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                    )}
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    ref={fileRef}
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                 selectedFile && (
                  <div className="mt-4 text-sm text-gray-700">
                    <img
                      className=" max-w-[150px] max-h-[150px]"
                      src={productimg || selectedFile}
                      alt=""
                    />
                   
                    {isUpdate && (<Button className=" p-2 absolute right-10"  >
                Update Image
              </Button>)}
                  </div>
                )
              )}
              

            </div>
            <div>
              {/* <FileUpload onFileSelect={handleFileSelect} /> */}
              {errors && (
                <span className="text-red-500 text-sm">
                  {errors.selectedFile}
                </span>
              )}
            </div>
            {/* select quantity */}
            <InputField
              title="Select Available Stock"
              type="number"
              step={0}
              reference={availableStockRef}
              placeholder="Available Stock"
              hint="Enter the amount of available stock you have in kg"
              error={errors.availableStock}
            />
           

            {/* select price */}
            <InputField
              title="Select Price"
              type="number"
              step={0.01}
              reference={unitPriceRef}
              placeholder="Unit Price"
              hint="Price should be per 1kg"
              error={errors.unitPrice}
            />

            {/* submit button */}
            <div className="flex gap-4 justify-end">
              <Button
                color="green"
                variant="gradient"
                onClick={addFormData}
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : isUpdate
                  ? "Update Product"
                  : "Add Product"}
              </Button>
              <Button
                color="green"
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
