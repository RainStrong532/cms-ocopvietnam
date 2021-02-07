import React from 'react';
import PaginationComponent from './PaginationComponent';
import Perpage from './Perpage';
import SearchHeader from './SearchHeader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { useRouter } from 'next/router'
import { enableStatus } from '../../../constants';

function ListItem({ data, title, type, header }) {
    const [modal, setModal] = React.useState(false);
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
                    <tr key={index}
                        onClick={() => router.push("/product/" + item.id)}
                    >
                        <td className="cellTable firstCol">
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
                        <td className="cellTable">
                            {item.type}
                        </td>
                        {
                            renderStar(parseInt(item.ocop_star))
                        }
                        <td className="cellTable">
                            {
                                item.is_enable
                                    ?
                                    enableStatus._true
                                    :
                                    enableStatus._false
                            }
                        </td>
                        <td className="cellTable"
                            onClick={() => {
                                router.push({
                                    pathname: window.location.pathname + '/edit/' + item.id,
                                });
                            }}
                        >
                            <img className="icon" src="/images/edit.png" alt="edit" />
                        </td>
                        <td className="cellTable"
                            onClick={() => {
                                toggle()
                            }}>
                            <img className="icon" src="/images/delete.png" alt="delete" />
                        </td>
                    </tr>
                    :
                    <tr key={index}
                        onClick={() => router.push("/producer/" + item.id)}
                    >
                        <td className="cellTable firstCol">
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
                        <td className="cellTable">
                            {item.representative}
                        </td>
                        <td className="cellTable">
                            {item.phone_number}
                        </td>
                        <td className="cellTable">
                            {item.address}
                        </td>
                        <td className="cellTable"
                            onClick={() => {
                                router.push({
                                    pathname: window.location.pathname + '/edit/' + item.id,
                                });
                            }}
                        >
                            <img className="icon" src="/images/edit.png" alt="edit" />
                        </td>
                        <td className="cellTable"
                            onClick={() => {
                                toggle()
                            }}>
                            <img className="icon" src="/images/delete.png" alt="delete" />
                        </td>
                    </tr>
            )
        })
    }
    return (
        <div>
            <SearchHeader title={title} pathname={window.location.pathname + "/add"} />
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
                    <Perpage />
                    <PaginationComponent />
                </div>

            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ListItem;