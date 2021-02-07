import "./styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import { ProtectRoute } from './context/auth'
import { AuthProvider } from './context/auth'

function MyApp({ Component, pageProps}) {

    return (
      <AuthProvider>
        <ProtectRoute>
            <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
    )
}


export default MyApp