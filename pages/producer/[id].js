import { useRouter } from 'next/router';
import Layout from './../../src/views/components/Layout';
import ProducerDetail from './../../src/views/components/ProducerDetail';

function edit() {
    const router = useRouter();
    return (
        <Layout>
            <ProducerDetail  id={router.query.id}/>
        </Layout>
    );
}

export default edit;