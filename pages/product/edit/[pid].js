import { useRouter } from 'next/router';
import Layout from '../../../src/views/components/Layout';
import ProductForm from '../../../src/views/components/ProductForm';

function edit() {
    const router = useRouter();
    return (
        <Layout>
            <ProductForm id={router.query.pid}/>
        </Layout>
    );
}

export default edit;