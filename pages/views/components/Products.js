import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import "bootstrap/dist/css/bootstrap.min.css";
import { headerProduct } from '../../../constants';
import { getListProduct } from '../../../src/services/Api';

function Products() {
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getListProduct(null);
            console.log('==================getListProduct==================');
            console.log(res);
            console.log('====================================');
            if (res.results) {
                setListProduct(res.results);
            }
        })();
    }, [])
    return (
        <div className="content">
            <ListItem title="Sản phẩm" data={listProduct} header={headerProduct} type={0} />
        </div>
    );
}

export default Products;