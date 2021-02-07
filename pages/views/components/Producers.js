import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import "bootstrap/dist/css/bootstrap.min.css";
import { headerProducer } from '../../../constants';
import { getListProducer } from '../../../src/services/Api';

function Producers() {
    const [listProducer, setListProducer] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getListProducer(null);
            if (res.results) {
                setListProducer(res.results);
            }
        })();
    }, [])
    return (

        <div className="content">
            <ListItem data={listProducer} title="Nhà sản xuất" header={headerProducer} type={1} />
        </div>

    );
}

export default Producers;