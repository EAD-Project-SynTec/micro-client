import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8084/api/v1/order';

export const getAllOrders = () => axios.get(REST_API_BASE_URL);

export const getOrderDetails = (orderId) => axios.get(REST_API_BASE_URL + "/" + orderId);

export const getOrdersByUserId = (userId) => axios.get(REST_API_BASE_URL + "/user/" + userId);

export const updateStatus = () => axios.put(REST_API_BASE_URL + "/update-status");
