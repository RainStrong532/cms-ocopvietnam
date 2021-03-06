import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

import { getMyInfo, loginApi } from '../services/Api';
import LoadingScreen from '../views/components/LoadingScreen';



const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                let user = await getMyInfo();
                if (user.id) {
                    setUser(user);
                }
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async (username, password) => {
        try {
            const data = await loginApi(username, password);
            if (data.token) {
                console.log("Got token")
                Cookies.set('token', data.token, { expires: 60 })
                let user = await getMyInfo();
                if (user.id) {
                    setUser(user);
                    return true;
                }
                return false;
            }
            return false;
        } catch (err) {;
            return false
        }
    }

    const logout = () => {
        Cookies.remove('token')
        // setUser(null)
        setUser(null);
        // delete api.defaults.headers.Authorization
    }


    return (
        <AuthContext.Provider value={{ user: user, login, loading, logout }}>
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
    const { user, loading } = useAuth();
    const [windowReady, setWindowReady] = useState(false);
    useEffect(() => {
        console.log(user, loading, windowReady);
        setWindowReady(true);
    }, [windowReady])
    if (!windowReady || loading) {
        return (
            <div className="loadingContainer">
                <LoadingScreen />
            </div>
        );
    } else {
        if ((!user && window.location.pathname !== '/login')) {
            gotoLogin();
        } else if ((window.location.pathname === '/login' || window.location.pathname === '/' || window.location.pathname === '') && user) {
            gotoProduct();
        } else {
            return children;
        }
    }
    return (
        <div className="loadingContainer">
            <LoadingScreen />
        </div>
    );
};