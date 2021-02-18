import "./../src/styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import { AuthProvider, ProtectRoute } from "../src/contexts/auth";

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