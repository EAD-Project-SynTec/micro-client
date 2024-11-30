import axiosInstance from "@/axiosConfig";

export const getProductsToReview = async (buyerId) => {
    try {
        const response = await axiosInstance.get(`/Review/to-review/buyer?buyerId=${encodeURI(buyerId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products to review:', error);
        throw error;
    }
};

// Function to fetch review history
export const getReviewHistory = async (buyerId) => {
    try {
        const response = await axiosInstance.get(`/Review/review-history?buyerId=${encodeURI(buyerId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching review history:', error);
        throw error;
    }
};

// Function to add a review
export const addReview = async (formData) => {
    try {
        const response = await axiosInstance.post('/Review/add-review', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};

// Function to fetch order details
export const getOrderDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/Review/order-details/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

export const getReviewsForFarmer = async (farmerId) => {
    try {
        const response = await axiosInstance.get(`/Review/reviews/farmer?farmerId=${encodeURI(farmerId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products to review:', error);
        throw error;
    }
};

export const editReview = async (formData, reviewId) => {
    try {
        const response = await axiosInstance.put('/Review/edit-review/' + reviewId, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};

export const getReviewsForProduct = async (productId) => {
    try {
        const response = await axiosInstance.get(`/Review/product-reviews/${encodeURI(productId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products to review:', error);
        throw error;
    }
};

export const getSellerDetails = async (productId) => {
    try {
        const response = await axiosInstance.get(`/Product/details/${encodeURI(productId)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products to review:', error);
        throw error;
    }
};

export const addReply = async (id, reply) => {
    try {
        const response = await axiosInstance.put('/Review/add-reply/' + id + "?reply=" + reply,   {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};