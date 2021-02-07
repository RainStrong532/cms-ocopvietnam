import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

import { loginApi } from '../services/Api';
import LoadingScreen from '../views/components/LoadingScreen';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setAuthenticate] = useState(false)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                setAuthenticate(true);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async (username, password) => {
        const data = await loginApi(username, password)
        if (data.token) {
            console.log("Got token")
            Cookies.set('token', data.token, { expires: 60 })
            // api.defaults.headers.Authorization = `Bearer ${token.token}`
            // const { data: user } = await api.get('users/me')
            // setUser(user)
            setAuthenticate(true);
            return true;
        }
        return false;
    }

    const logout = () => {
        Cookies.remove('token')
        // setUser(null)
        setAuthenticate(false);
        // delete api.defaults.headers.Authorization
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const gotoLogin = () => {
        router.push('/login');
    }
    const gotoProduct = () => {
        router.push('/product');
    }
    const { isAuthenticated, loading } = useAuth();
    const [windowReady, setWindowReady] = useState(false);
    useEffect(() => {
        console.log("window.innerHeight", window.innerHeight, isAuthenticated, loading, windowReady);
        setWindowReady(true);
    }, [windowReady])
    if (!windowReady || loading) {
        return <LoadingScreen />;
    } else {
        if ((!isAuthenticated && window.location.pathname !== '/login')) {
            gotoLogin();
        } else if((window.location.pathname === '/login' || window.location.pathname === '/' || window.location.pathname === '') && isAuthenticated){
            gotoProduct();
        }else{
            return children;
        }
    }
    return <LoadingScreen />;
};