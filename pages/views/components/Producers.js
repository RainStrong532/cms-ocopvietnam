import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import "bootstrap/dist/css/bootstrap.min.css";
import { headerProducer } from '../../../constants';
import { getListProducer } from '../../../src/services/Api';
import Router, { withRouter } from 'next/router'
import LoadingScreen from './LoadingScreen';
import SearchHeader from './SearchHeader';


function Producers({ router }) {
    const [isLoading, setLoading] = useState(false);
    const [listProducer, setListProducer] = useState([]);
    const [total, setTotal] = useState(0);
    const getProducers = async () => {
        setLoading(true);
        let page = router.query.page || 1;
        let page_size = router.query.page_size || 20;
        let search = router.query.search;
        let res;
        if (search) {
            res = await getListProducer({ page: page, page_size: page_size, search: search });
        } else {
            res = await getListProducer({ page: page, page_size: page_size });
        }
        if (res.results) {
            setListProducer(res.results);
            setTotal(res.count);
        }
        setLoading(false);
    }
    const startLoading = async () => {
        setLoading(true);
        getProducers();
    }
    const stopLoading = () => {
        setLoading(false);
    }
    useEffect(() => {
        getProducers();
        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', stopLoading);
        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, [router])
    return (
        (isLoading)
            ?
            <div className="content">
                <SearchHeader title="Sản phẩm" pathname={window.location.pathname + "/add"} />
                <LoadingScreen />
            </div>
            :
            <div className="content">
                <SearchHeader title="Nhà sản xuất" pathname={window.location.pathname + "/add"} router={router} />
                <ListItem data={listProducer} header={headerProducer} type={1} total={total} getList={getProducers}/>
            </div>
    );
}

export default withRouter(Producers);