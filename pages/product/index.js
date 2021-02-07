import React from 'react';
import Products from '../views/components/Products';
import Layout from '../views/components/Layout';
import useAuth,{ ProtectRoute } from '../context/auth'

function products() {
    return (
        <Layout>
            <Products/>
        </Layout>
    );
}

export default products;