import { useRouter } from 'next/router';
import Layout from '../../../src/views/components/Layout';
import ProducerForm from '../../../src/views/components/ProducerForm';

function edit() {
    const router = useRouter();
    return (
        <Layout>
            <ProducerForm  id={router.query.id}/>
        </Layout>
    );
}

export default edit;