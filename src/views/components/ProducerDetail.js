import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { getProducerById } from '../../../src/services/Api';
import ImageHolder from './ImageHolder';
import SearchHeader from './SearchHeader';

function ProducerDetail({ id }) {
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [representative, setRepresentative] = React.useState("");

    const router = useRouter();

    useEffect(() => {
        (async () => {
            let res = await getProducerById({ id: id });
            if (res.id) {
                setName(res.name);
                setPhoneNumber(res.phone_number);
                setAddress(res.address);
                setEmail(res.email);
                setRepresentative(res.representative);
                setImage(res.image)
            }
        })();
    }, [])

    return (
        <div className="content">
            <SearchHeader title={"Xem chi tiết nhà sản xuất"} edit={true} pathname={"/producer/edit/"+id} router={router}/>
            <div className="productForm">
                <div className="section">
                    <div className="title">
                        Mô tả chung
                </div>
                    <div>
                        <Row>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput detail">Tên nhà sản xuất</div>
                                    <div className="inpputContent">{name}</div>
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput detail">Số điện thoại</div>
                                    <div className="inpputContent">{phoneNumber}</div>
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput detail">Địa chỉ</div>
                                    <div className="inpputContent">{address}</div>
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput detail mb-0">Logo</div>
                                    <ImageHolder src={image} readOnly={true}/>
                                </div>
                            </Col>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput detail">Người đại diện</div>
                                    <div className="inpputContent">{representative}</div>
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput detail">Email</div>
                                    <div className="inpputContent">{email}</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProducerDetail;