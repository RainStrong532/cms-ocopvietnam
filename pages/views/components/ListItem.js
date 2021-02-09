import React from 'react';
import PaginationComponent from './PaginationComponent';
import Perpage from './Perpage';
import SearchHeader from './SearchHeader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { useRouter } from 'next/router'
import { enableStatus } from '../../../constants';
import { deleteProducerById, deleteProductById } from '../../../src/services/Api';
import { useAuth } from '../../../src/contexts/auth';

function ListItem({ data, type, header, total, getList }) {
    const [modal, setModal] = React.useState(false);
    const [itemDelete, setItem] = React.useState(null);
    const router = useRouter();
    const toggle = () => setModal(!modal);
    const renderHeaderTable = () => {
        return (
            header.map((item, index) => {
                return (
                    <th className="headerTable" key={index}>{item.name}</th>
                )
            })
        )
    }
    const auth = useAuth();

    const renderStar = (star) => {
        return (
            <td className="cellTable" >
                {
                    Array.from({ length: star }).map((_, index) => (
                        <img key={index}
                            className="star"
                            src="/images/star.png"
                            alt="star"
                        />
                    ))
                }
            </td>
        )
    }
    const renderListData = () => {
        return data.map((item, index) => {
            return (
                type === 0
                    ?
                    <tr className="cellRow" key={index}>
                        <td className="cellTable firstCol"
                            onClick={() => router.push("/product/" + item.id)}
                        >
                            <div className="imageTable">
                                {
                                    item.image
                                        ?
                                        <img src={item.image} alt="image" />
                                        :
                                        <></>
                                }
                            </div>
                            <p>{item.name}</p>

                        </td>
                        <td className="cellTable"

                            onClick={() => router.push("/product/" + item.id)}
                        >
                            {item.type}
                        </td>
                        {
                            renderStar(parseInt(item.ocop_star))
                        }
                        <td className="cellTable"

                            onClick={() => router.push("/product/" + item.id)}
                        >
                            {
                                enableStatus[item.status]
                            }
                        </td>
                        <td className="cellTable edit"
                            onClick={() => {
                                router.push({
                                    pathname: window.location.pathname + '/edit/' + item.id,
                                });
                            }}
                        >
                            <img className="icon" src="/images/edit.png" alt="edit" />
                        </td>
                        <td className="cellTable delete"
                            onClick={() => {
                                toggle();
                                setItem(item.id);
                            }}>
                            <img className="icon" src="/images/delete.png" alt="delete" />
                        </td>
                    </tr>
                    :
                    <tr className="cellRow" key={index}>
                        <td className="cellTable firstCol"
                            onClick={() => router.push("/producer/" + item.id)}
                        >
                            <div className="imageTable producerImage">
                                {
                                    item.image
                                        ?
                                        <img src={item.image} alt="image" />
                                        :
                                        <></>
                                }

                            </div>
                            <p>{item.name}</p>
                        </td>
                        <td className="cellTable"
                            onClick={() => router.push("/producer/" + item.id)}
                        >
                            {item.representative}
                        </td>
                        <td className="cellTable"
                            onClick={() => router.push("/producer/" + item.id)}
                        >
                            {item.phone_number}
                        </td>
                        <td className="cellTable"
                            onClick={() => router.push("/producer/" + item.id)}
                        >
                            {item.address}
                        </td>
                        <td className="cellTable edit"
                            onClick={() => {
                                router.push({
                                    pathname: window.location.pathname + '/edit/' + item.id,
                                });
                            }}
                        >
                            <img className="icon" src="/images/edit.png" alt="edit" />
                        </td>
                        <td className="cellTable delete"
                            onClick={() => {
                                toggle();
                                setItem(item.id);
                            }}>
                            <img className="icon" src="/images/delete.png" alt="delete" />
                        </td>
                    </tr>
            )
        })
    }
    return (
        <div>
            <div className="listItemContainer">
                <Table responsive>
                    <thead>
                        <tr className="trHeader">
                            {renderHeaderTable()}
                        </tr>
                    </thead>
                    <tbody>
                        {renderListData()}
                    </tbody>
                </Table>
                <div className="pageOption">
                    <Perpage router={router} />
                    <PaginationComponent router={router} total={total} />
                </div>

            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        (async () => {
                            if (type === 0) {
                                let res = await deleteProductById({ id: itemDelete, user: auth.isAuthenticated.user });
                                if (res.id) {
                                    getList();
                                } else {
                                    alert("Xóa thất bại");
                                }
                            } else {
                                let res = await deleteProducerById({ id: itemDelete, user: auth.isAuthenticated.user });
                                if (res.id) {
                                    getList();
                                } else {
                                    alert("Xóa thất bại");
                                }
                            }
                        })();
                        toggle();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ListItem;