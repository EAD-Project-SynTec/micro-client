import axiosInstance from "@/axiosConfig";

export const getReturnsForBuyer = async (buyerId) => {
    try {
        const response = await axiosInstance.get(`/Return/return/buyer?buyerId=${encodeURI(buyerId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products to return', error);
        throw error;
    }
}

export const getReturnOrderDetails = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/Return/return-details/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
}

export const addReturn = async (formData) => {
    try {
        const response = await axiosInstance.post('/Return/add-return', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error adding return:', error);
        throw error;
    }
}

export const getReturnsForfarmer = async (farmerId) => {
    try {
        const response = await axiosInstance.get(`/Return/return/farmer?farmerId=${encodeURI(farmerId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products to return', error);
        throw error;
    }
}