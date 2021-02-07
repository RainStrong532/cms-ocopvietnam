import React from 'react';
import Products from '../views/components/Products';
import Layout from '../views/components/Layout';
import useAuth,{ ProtectRoute } from '../context/auth'
import Login from '../views/containers/Login';

function login() {
    return (
        <>
        <Login/>
        </>
    );
}

export default login;