import "./styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import { AuthProvider, ProtectRoute } from "../src/context/auth";
import header from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <ProtectRoute>
        <header>
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        </header>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  )
}


export default MyApp