import React from 'react'
import ProductForm from './forms/ProductForm'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { addProduct } from '@/services/productServices';
const filesavedPopup = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your product has been Uploaded",
    showConfirmButton: false,
    timer: 1500
  });
}

const AddProducts = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      await addProduct(formData);
      filesavedPopup();
      navigate(-1);
    } catch (error) {
      console.error('Error adding product:', error);
    }

  }
  return (
    <div><ProductForm onSubmitData={handleSubmit} productData={null} isUpdate={false} /></div>
  )
}

export default AddProducts