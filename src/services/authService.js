// src/services/authService.js
import {jwtDecode} from 'jwt-decode';

export const getDecodedToken = () => {
  try {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    } else {
      console.log('No token found in session storage');
      return null;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


export const hasRole = (decodedToken, role) => {
    if (decodedToken && decodedToken.realm_access && decodedToken.realm_access.roles) {
      return decodedToken.realm_access.roles.includes(role);
    }
    return false;
  };