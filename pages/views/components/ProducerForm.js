import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { getProducerById } from '../../../src/services/Api';
import AddImageComponent from './AddImageComponent';
import Header from './Header';
import ImageHolder from './ImageHolder';

function ProducerForm({ id }) {
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [representative, setRepresentative] = React.useState("");

    useEffect(() => {
        (async () => {
            let res = await getProducerById({ id: id });
            if (res.id) {
                setName(res.name);
                setPhoneNumber(res.phone_number);
                setAddress(res.address);
                setEmail(res.email);
                setRepresentative(res.representative);
            }
        })();
    }, [])

    return (
        <div className="content">
            <Header title={id ? "Cập nhật thông tin nhà sản xuất" : "Thêm nhà sản xuất"} />
            <div className="productForm">
                <div className="section">
                    <div className="title">
                        Mô tả chung
                </div>
                    <div>
                        <Row>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput">Tên nhà sản xuất</div>
                                    <input
                                        value={name}
                                        multiple={true}
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput">Số điện thoại</div>
                                    <input
                                        multiple={true}
                                        value={phoneNumber}
                                        onChange={e => {
                                            setPhoneNumber(e.target.value);
                                        }} />
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput">Địa chỉ</div>
                                    <input multiple={true}
                                        value={address}
                                        onChange={e => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput mb-0">Logo</div>
                                    {
                                        (image !== "")
                                            ?
                                            <ImageHolder src={image} />
                                            :
                                            <AddImageComponent />
                                    }
                                </div>
                            </Col>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput">Người đại diện</div>
                                    <input
                                        multiple={true}
                                        value={representative}
                                        onChange={e => {
                                            setRepresentative(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput">Email</div>
                                    <input
                                        multiple={true}
                                        value={email}
                                        onChange={e => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="btn_add">
                            <Button className="btn_add">
                                {
                                    id
                                        ?
                                        "Cập nhật"
                                        :
                                        "Thêm mới"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProducerForm;