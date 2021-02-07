import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { getProductById } from '../../../src/services/Api';
import AddImageComponent from './AddImageComponent';
import Header from './Header';
import ImageHolder from './ImageHolder';

function ProductForm({ id }) {
    const [name, setName] = React.useState("");
    const [star, setCountStar] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [producer, setProducer] = React.useState();
    const [product, setProduct] = React.useState("");
    const [story, setStory] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [exprire, setExprire] = React.useState("");
    const [certification, setCertification] = React.useState("");
    useEffect(() => {
        (async () => {
            let res = await getProductById({ id: id });
            if (res.id) {
                setName(res.name);
                setCountStar(res.ocop_star);
                setImage(res.certificate_img);
                setProducer(res.manufacturer.name);
                setProduct(res.description);
                setStory(res.story);
                setExprire(res.expiry_date);
                setStartDate(res.issued_on)
                setCertification(res.ocop_certificate_number);
            }
        })();
    }, [])

    function readURL(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result)
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <div className="content">
            <Header title={id ? "Cập nhật thông tin sản phẩm" : "Thêm sản phẩm"} />
            <div className="productForm">
                <div className="section">
                    <div className="title">
                        Mô tả chung
                </div>
                    <div>
                        <Row>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput">Tên sản phẩm</div>
                                    <Input
                                        multiple={true}
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="inputContainer dropdown">
                                    <label htmlFor="star" className="nameInput">Số sao</label>
                                    <Input type="select" name="star" id="star"
                                        value={star}
                                        onChange= {(e) => {
                                            setCountStar(e.target.value)
                                        }}
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Input>
                                </div>
                            </Col>
                            <Col className="sectionForm">
                                <div className="inputContainer dropdown">
                                    <label htmlFor="producer" className="nameInput">Tên nhà sản xuất</label>
                                    <Input type="select" name="producer" id="producer"
                                        value={producer}
                                        onChange = {e => setProducer(e.target.value)}
                                    >
                                        <option value="Hợp tác xã sản xuất chè Phìn Hồ">Hợp tác xã sản xuất chè Phìn Hồ</option>
                                        <option value="Hợp tác xã sản xuất chè Phìn Hồ">Hợp tác xã sản xuất chè Phìn Hồ</option>
                                        <option value="Hợp tác xã sản xuất chè Phìn Hồ">Hợp tác xã sản xuất chè Phìn Hồ</option>
                                    </Input>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput">Câu chuyện sản phẩm</div>
                                <Input type="textarea" name="text" className="textarea"
                                    value={story}
                                    onChange={e => {
                                        setStory(e.target.value);
                                    }}
                                />
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput">Thông tin sản phẩm</div>
                                <Input type="textarea" name="text" className="textarea"
                                    value={product}
                                    onChange={e => {
                                        setProduct(e.target.value);
                                    }}
                                />
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput mb-0">
                                    Hình ảnh sản phẩm
                            </div>
                                <div className="imageContainer">
                                    <ImageHolder src="/images/demo.png" index={"1"} />
                                    <ImageHolder src="/images/demo.png" index={"2"} />
                                    <ImageHolder src="/images/demo.png" index={"3"} />
                                    <AddImageComponent />
                                </div>
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput mb-0">
                                    Hình ảnh quá trình sản xuất
                            </div>
                                <div className="imageContainer">
                                    <ImageHolder src="/images/demo.png" index={1} />
                                    <ImageHolder src="/images/demo.png" index={2} />
                                    <ImageHolder src="/images/demo.png" index={3} />
                                    <AddImageComponent />
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>

                <div className="section">
                    <div className="title mt62">
                        Chứng thực sản phẩm
                </div>
                    <div>
                        <Row>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput">Giấy chứng nhận sản phẩm OCOP</div>
                                    <Input
                                        multiple={true}
                                        value={certification}
                                        onChange={e => {
                                            setCertification(e.target.value);
                                        }} />
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput">Ngày hết hạn chứng nhận sản phẩm OCOP</div>
                                    <Input
                                        type="date"
                                        name="date"
                                        placeholder="date placeholder"
                                        value={exprire}
                                        onChange={e => {
                                            setExprire(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput">Hình ảnh chứng nhận sản phẩm OCOP</div>
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
                                    <div className="nameInput">Ngày chứng nhận sản phẩm OCOP</div>
                                    <Input
                                        type="date"
                                        name="date"
                                        placeholder="date placeholder"
                                        value={startDate}
                                        onChange={e => {
                                            setStartDate(e.target.value);
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

export default ProductForm;