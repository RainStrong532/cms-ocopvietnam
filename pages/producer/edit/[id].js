import { useRouter } from 'next/router';
import Layout from '../../views/components/Layout';
import ProducerForm from '../../views/components/ProducerForm';

function edit() {
    const router = useRouter();
    console.log('====================================');
    console.log("router: ", router.query.id);
    console.log('====================================');
    return (
        <Layout>
            <ProducerForm  id={router.query.id}/>
        </Layout>
    );
}

export default edit;