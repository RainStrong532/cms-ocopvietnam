import "./styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import { AuthProvider, ProtectRoute } from "../src/context/auth";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <ProtectRoute>
        <Head>
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        </Head>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  )
}


export default MyApp