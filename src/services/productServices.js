import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getProducts = async (id) => {
  try {
    const response = await axiosInstance.get('/api/v1/product?user=customer');
    
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


//function add products
export const addProduct = async (formData) => {
  console.log('FormData:', formData);
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`); 
  }

  // Convert FormData to JSON
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    const response = await axiosInstance.post('/api/v1/product', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};


//function to get product details by ID
export const getProductByID = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

//function to update product details
export const updateProduct = async (id, formData) => {
    try {
        const response = await axiosInstance.put(`Product/update/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

//function to update product image
export const updateProductImage = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axiosInstance.put(`/Product/update-image/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product image:', error);
        throw error;
    }
};

// Function to get sorted products
export const getSortedProducts = async (sortOrder) => {
    try {
        const response = await axiosInstance.get(`/product/sorted?sortOrder=${sortOrder}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sorted products:', error);
        throw error;
    }
};

//function to get search items
export const getSearchProducts = async (searchData) => {
  try {
      const response = await axiosInstance.get(`Product/search?searchTerm=${searchData}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching sorted products:', error);
      throw error;
  }
};

// Function to get unsorted products
export const getUnsortedProducts = async () => {
    try {
      const response = await axiosInstance.get('/product');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// Function to get product details
  export const getProductDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/Product/details/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };

  // Function to add an item to the shopping cart
export const addToCartProducts = async (cart) => {
    try {
      const response = await axiosInstance.post('/ShoppingCart/add-to-cart', cart);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

// Function to get shopping cart items
  export const getCartItems = async (buyerId) => {
    try {
      const response = await axiosInstance.get(`/ShoppingCart/items?customerId=${buyerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shopping cart items:', error);
      throw error;
    }
  };

  // Function to get shopping cart items count
  export const getCartItemsCount = async (buyerId) => {
    try {
      const response = await axiosInstance.get(`/ShoppingCart/items?customerId=${buyerId}`);
      return response.data.length;
    } catch (error) {
      console.error('Error fetching shopping cart items:', error);
      throw error;
    }
  };

  // Function to delete a cart item
export const deleteCartItem = async (buyerId, cartItemId) => {
    try {
      const response = await axiosInstance.delete(`/ShoppingCart/delete-cart-item?buyerId=${buyerId}&cartItemId=${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  };

  //function to get product list by seller ID
export const getProductsBySellerID = async (id) => {
    try {
        const response = await axiosInstance.get(`/Product/farmer/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
  //function to get product list by seller ID
  export const getProductsBySellerIDPage = async (id ,pageNumber,pageSize) => {
    try {
        const response = await axiosInstance.get(`/Product/farmer-product/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
  //function to get product list by seller ID  Product/${productId}
  export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/product/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};