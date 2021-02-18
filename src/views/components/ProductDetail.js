import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { DOMAIN, IMAGE_DOMAIN } from '../../../constants';
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
    const [productImages, setProductImages] = React.useState([]);
    const [productionImages, setProductionImages] = React.useState([]);

    const router = useRouter();
    useEffect(() => {
        (async () => {
            let res = await getProductById({ id: id });
            if (res.id) {
                setName(res.name);
                setCountStar(res.ocop_star);
                setImage(res.certificate_img);
                setProducer(res.manufacturer_name);
                setProduct(res.description);
                setStory(res.story);
                setExprire(res.expiry_date);
                setStartDate(res.issued_on)
                setCertification(res.ocop_certificate_number);
                setProductionImages(res.image_production);
                setProductImages(res.image_product);
            }
        })();
    }, [])
    const renderListImage = (list, setList) => {
        if (list.length === 0) {
            return (
                <ImageHolder src="" readOnly={true} />
            )
        }
        return list.map((item, index) => {
            console.log('====================================');
            console.log("image item: ", item);
            console.log('====================================');
            return(
            <ImageHolder src={IMAGE_DOMAIN + item.image} key={index} readOnly={true}
            />
            )
        })
    }

    return (
        <div className="content">
            <SearchHeader title={"Xem chi tiết sản phẩm"} edit={true} pathname={"/product/edit/" + id} router={router} />
            <div className="productForm">
                <div className="section">
                    <div className="title">
                        Mô tả chung
                </div>
                    <div>
                        <Row>
                            <Col className="sectionForm" >
                                <div className="inputContainer">
                                    <div className="nameInput detail">Tên sản phẩm</div>
                                    <div className="inpputContent">{name}</div>
                                </div>
                                <div className="inputContainer dropdown">
                                    <div className="nameInput detail">Số sao</div>
                                    <div className="inpputContent">{star}</div>
                                </div>
                            </Col>
                            <Col className="sectionForm" >
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
                        <Col className="p-0" >
                            <div className="inputContainer">
                                <div className="nameInput detail mb-0">
                                    Hình ảnh sản phẩm
                            </div>
                                <div className="imageContainer">
                                    {
                                        renderListImage(productImages, setProductImages)
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col className="p-0" >
                            <div className="inputContainer">
                                <div className="nameInput detail mb-0">
                                    Hình ảnh quá trình sản xuất
                            </div>
                                <div className="imageContainer">
                                    {
                                        renderListImage(productionImages, setProductionImages)
                                    }
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
                            <Col className="sectionForm" >
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
                            <Col className="sectionForm" >
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