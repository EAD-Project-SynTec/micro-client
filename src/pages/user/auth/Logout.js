const logout = () => {
    sessionStorage.removeItem('jwtToken');
    window.location.reload();
};

export default logout;