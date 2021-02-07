import React from 'react';
import Layout from '../views/components/Layout';
import ProductDetail from '../views/components/ProductDetail';
import { useRouter } from 'next/router';

function products() {
    const router = useRouter();
    return (
        <Layout>
            <ProductDetail  id={router.query.id}/>
        </Layout>
    );
}

export default products;