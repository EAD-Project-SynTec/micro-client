import React from 'react'
import axios from 'axios';
import ProductForm from './forms/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getProductByID, updateProduct, updateProductImage } from '@/services/productServices';
const UpdateProduct = () => {
  const {id} =useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const productData = await getProductByID(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  fetchProduct();
}, [id]);

const handleUpdateproduct = async (formData) => {
  try {
    await updateProduct(id, formData);
    navigate(-1);
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
const handleupdateImage = async (file) => {
  try {
    await updateProductImage(id, file);
    console.log('Image Updated');
  } catch (error) {
    console.error('Error updating product image:', error);
  }
};
  return (
    <div>
      <ProductForm onSubmitData={handleUpdateproduct} productData={product} isUpdate={true} handleupdateImage={handleupdateImage}/>
    </div>
  )
}

export default UpdateProduct