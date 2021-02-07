import { useRouter } from 'next/router';
import Layout from '../views/components/Layout';
import ProducerDetail from '../views/components/ProducerDetail';

function edit() {
    const router = useRouter();
    console.log('====================================');
    console.log("router: ", router.query.id);
    console.log('====================================');
    return (
        <Layout>
            <ProducerDetail  id={router.query.id}/>
        </Layout>
    );
}

export default edit;