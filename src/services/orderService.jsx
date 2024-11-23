import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8084/api/v1/order';

// export const getOrderDetails = (orderId) => axios.get(REST_API_BASE_URL + '/getOrderDetails/' + orderId);

export const getAllOrders = (userId) => axios.get(REST_API_BASE_URL + "/getOrders/" + userId);
