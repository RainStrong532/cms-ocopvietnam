import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { getProductById } from '../../../src/services/Api';
import ImageHolder from './ImageHolder';
import SearchHeader from './SearchHeader';

function ProductDetail({ id }) {
    const [name, setName] = React.useState("");
    const [star, setCountStar] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [producer, setProducer] = React.useState();
    const [product, setProduct] = React.useState("");
    const [story, setStory] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [exprire, setExprire] = React.useState("");
    const [certification, setCertification] = React.useState("");
    const router = useRouter();
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
            <SearchHeader title={"Xem chi tiết sản phẩm"} edit={true} pathname={"/product/edit/"+id} router={router}/>
            <div className="productForm">
                <div className="section">
                    <div className="title">
                        Mô tả chung
                </div>
                    <div>
                        <Row>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput detail">Tên sản phẩm</div>
                                    <div className="inpputContent">{name}</div>
                                </div>
                                <div className="inputContainer dropdown">
                                    <div className="nameInput detail">Số sao</div>
                                    <div className="inpputContent">{star}</div>
                                </div>
                            </Col>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput detail">Tên nhà sản xuất</div>
                                    <div className="inpputContent">{producer}</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput detail">Câu chuyện sản phẩm</div>
                                <div className="inpputContent">{story}</div>
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput detail">Thông tin sản phẩm</div>
                                <div className="inpputContent">{product}</div>
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput detail mb-0">
                                    Hình ảnh sản phẩm
                            </div>
                                <div className="imageContainer">
                                    <ImageHolder src="/images/demo.png" index={"1"} readOnly={true} />
                                    <ImageHolder src="/images/demo.png" index={"2"} readOnly={true} />
                                    <ImageHolder src="/images/demo.png" index={"3"} readOnly={true} />
                                </div>
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput detail mb-0">
                                    Hình ảnh quá trình sản xuất
                            </div>
                                <div className="imageContainer">
                                    <ImageHolder src="/images/demo.png" index={1} readOnly={true}/>
                                    <ImageHolder src="/images/demo.png" index={2} readOnly={true} />
                                    <ImageHolder src="/images/demo.png" index={3} readOnly={true} />
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
                                    <div className="nameInput detail">Giấy chứng nhận sản phẩm OCOP</div>
                                    <div className="inpputContent">{certification}</div>
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput detail">Ngày hết hạn chứng nhận sản phẩm OCOP</div>
                                    <div className="inpputContent">{exprire}</div>
                                </div>
                                <div className="inputContainer">
                                    <div className="nameInput detail">Hình ảnh chứng nhận sản phẩm OCOP</div>
                                    {
                                      <ImageHolder src={image} readOnly={true} />
                                    }
                                </div>
                            </Col>
                            <Col className="sectionForm">
                                <div className="inputContainer">
                                    <div className="nameInput detail">Ngày chứng nhận sản phẩm OCOP</div>
                                    <div className="inpputContent">{startDate}</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;