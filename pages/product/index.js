import React from 'react';
import Products from '../views/components/Products';
import Layout from '../views/components/Layout';
import { useRouter } from 'next/router';

function products() {
    return (
        <Layout>
            <Products/>
        </Layout>
    );
}

export default products;