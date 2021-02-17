import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import "bootstrap/dist/css/bootstrap.min.css";
import { headerProduct } from '../../../constants';
import { getListProduct } from '../../../src/services/Api';
import Router, { withRouter } from 'next/router'
import LoadingScreen from './LoadingScreen';
import SearchHeader from './SearchHeader';

function Products({ router }) {
    const [isLoading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const getProducts = () => {
        (async () => {
            setLoading(true);
            let page = router.query.page || 1;
            let page_size = router.query.page_size || 20;
            let search = router.query.search;
            let res;
            if (search) {
                res = await getListProduct({ page: page, page_size: page_size, search: search });
            } else {
                res = await getListProduct({ page: page, page_size: page_size });
            }
            if (res.results) {
                setListProduct(res.results);
                setTotal(res.count);
            }
            setLoading(false);
        })();
    }
    const startLoading = async () => {
        setLoading(true);
        getProducts();
    }
    const stopLoading = () => {
        setLoading(false);
    }
    useEffect(() => {
        getProducts();
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
                <SearchHeader title="Sản phẩm" pathname={window.location.pathname + "/add"} router={router} />
                <LoadingScreen />
            </div>
            :
            <div className="content">
                <SearchHeader title="Sản phẩm" pathname={window.location.pathname + "/add"} router={router} />
                <ListItem data={listProduct ? listProduct : []} header={headerProduct} type={0} total={total} getList={getProducts} />
            </div>
    );
}

export default withRouter(Products);