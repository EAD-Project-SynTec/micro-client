import axiosInstance from "@/axiosConfig";

// Function to create a new order
export const createNewOrder = async (formData) => {
    try {
      const response = await axiosInstance.post('/NewOrder', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating new order:', error);
      throw error;
    }
  };

export const fetchCourierDetails = async (orderID) => {
    try {
      const response = await axiosInstance.get(`/Order/courier/details/${orderID}`);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching courier details:', error);
      throw error;
    }
  };

  export const updateOrderStatus = async (orderID, newStatus) => {
    try {
      const response = await axiosInstance.put(`/Order/${orderID}?orderStatus=${newStatus}`, {
        orderStatus: newStatus,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  export const getBuyerOrderByID = async (orderID) => {
    try {
        const response = await axiosInstance.get(`/Order/buyer/details/${orderID}`);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const getAllBuyerOrders = async (userId) => {
    try {
      const response = await axiosInstance.get(`/Order/buyer/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching buyer orders:', error);
      throw error;
    }
  };

  export const getAllCourierOrders = async (userId) => {
    try {
      const response = await axiosInstance.get(`/Order/courier/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching buyer orders:', error);
      throw error;
    }
  };

  export const getAllFarmerOrders = async (userId) => {
    try {
      const response = await axiosInstance.get(`/Order/farmer/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching buyer orders:', error);
      throw error;
    }
  };

export const getFarmerOrderDetails = async (orderID) => {
    try {
      const response = await axiosInstance.get(`/Order/farmer/details/${orderID}`);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  };

// Function to fetch courier list
export const getCourierList = async () => {
    try {
      const response = await axiosInstance.get('/NewOrder/getcouriers');
      return response.data;
    } catch (error) {
      console.error('Error fetching courier list:', error);
      throw error;
    }
  };

// Function to update the courier for an order
export const updateCourier = async (orderId, courierID) => {
  try {
    await axiosInstance.put(`/NewOrder/update-courier/${orderId}?courierID=${courierID}`);
  } catch (error) {
    console.error('Error updating courier:', error);
    throw error;
  }
};

export const getCourierOrderDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/Order/courier/details/${id}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};


// Function to create a new notification
export const createNewNotification = async (formData) => {
  try {
    const response = await axiosInstance.post('/NewOrder/Addnotification', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating new order:', error);
    throw error;
  }
};