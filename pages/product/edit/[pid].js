import { useRouter } from 'next/router';
import Layout from '../../views/components/Layout';
import ProductForm from '../../views/components/ProductForm';

function edit() {
    const router = useRouter();
    console.log('====================================');
    console.log("id: ", router.query.pid);
    console.log('====================================');
    return (
        <Layout>
            <ProductForm id={router.query.pid}/>
        </Layout>
    );
}

export default edit;