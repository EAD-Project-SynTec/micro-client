// src/services/CartServices.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/v1';

export const CartServices = {
  removeFromCart: async (obj) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart`, { data: obj });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getCart:async (userId) =>{
    try{
        const response = await axios.get(`${BASE_URL}/cart?email=${userId}`);
        console.log(response.data);
        return response.data;
    }catch(error){
        throw error;
    }
  },
  addToCart: async (data) => {
    try{
        const res = await axios.post(`${BASE_URL}/cart`, data);
        return res.data;
    }
    catch(err){
        throw err;
    }
  }
};

export default CartServices;