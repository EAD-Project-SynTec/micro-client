import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8084/api/v1/order';

export const getAllOrders = () => {
  return fetch("http://localhost:8084/api/v1/order");
};


export const getOrderDetails = (orderId) => axios.get(REST_API_BASE_URL + "/" + orderId);

export const getOrdersByUserId = (userId) => axios.get(REST_API_BASE_URL + "/user/" + userId);

export const updateStatus = (orderId, status) =>
    axios.patch(`${REST_API_BASE_URL}/${orderId}/status?status=${status}`);

export const getUserDetails = (userId) => axios.get(`${USER_API_BASE_URL}/${userId}`);
