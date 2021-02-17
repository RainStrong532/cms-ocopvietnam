import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { IMAGE_DOMAIN, productType } from '../../../constants';
import { createProduct, getProducers, getProductById, updateProduct, updateImageApi, uploadImage } from '../../../src/services/Api';
import AddImageComponent from './AddImageComponent';
import Header from './Header';
import ImageHolder from './ImageHolder';
import LoadingScreen from './LoadingScreen';

let firstLoad = false;

function ProductForm({ id }) {
    const [name, setName] = useState("");
    const [type, setType] = useState(productType[0].name);
    const [star, setCountStar] = useState(0);
    const [image, setImage] = useState("");
    const [producer, setProducer] = useState("");
    const [product, setProduct] = useState("");
    const [story, setStory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [exprire, setExprire] = useState("");
    const [certification, setCertification] = useState("");
    const [producers, setProducers] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productionImages, setProductionImages] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (id) {
                setLoading(true);
                let res = await getProductById({ id: id });
                if (res.id) {
                    setName(res.name);
                    setCountStar(res.ocop_star);
                    setImage(res.certificate_img);
                    setProducer({ name: res.manufacturer_name, id: res.manufacturer_id });
                    setProduct(res.description);
                    setStory(res.story);
                    setExprire(res.expiry_date);
                    setStartDate(res.issued_on)
                    setCertification(res.ocop_certificate_number);
                    setType(res.type ? res.type : productType[0].name);
                    setProductImages(res.image_product);
                    setProductionImages(res.image_production);
                }
                setLoading(false);
            }
            if (!firstLoad) {
                setLoading(true);
                let res = await getProducers();
                if (res.count) {
                    setProducers(res.results);
                    setProducer(res.results.length > 0 ? res.results[0] : "");
                }
                setLoading(false);
            }
        })();
    }, [])
    const addProductImage = (image) => {
        const list = [...productImages, { image: image }];
        setProductImages(list);
    }

    const addProductionImage = (image) => {
        const list = [...productionImages, { image: image }];
        setProductionImages(list);
    }

    const onDeleteProductImage = (index) => {
        const item = productImages.find((_, i) => i === index);
        if (item) {
            item.isDelete = true;
            let list = [...productImages];
            list[index] = item;
            setProductImages(list);
            console.log('====================onDeleteProductImage================');
            console.log(productImages);
            console.log('====================================');
        }
    }

    const onDeleteProductionImage = (index) => {
        const item = productionImages.find((_, i) => i === index);
        if (item) {
            item.isDelete = true;
            let list = [...productionImages];
            list[index] = item;
            setProductionImages(list);
        }
    }
    const onUpdateProductImage = (index, image) => {
        const item = productImages.find((_, i) => i === index);
        if (item) {
            item.isUpdate = true;
            item.image = image;
            let list = [...productImages];
            list[index] = item;
            setProductImages(list);
        }
    }

    const onUpdateProductionImage = (index, image) => {
        const item = productionImages.find((_, i) => i === index);
        if (item) {
            item.isUpdate = true;
            item.image = image;
            let list = [...productionImages];
            list[index] = item;
            setProductionImages(list);
        }
    }
    const updateImage = (image) => {
        setImage(image);
    }

    const submitImage = async (product) => {
            for (const item of productImages) {
                let data = {
                    product: product.id,
                    type: "product",
                }
                if (item.isUpdate) {
                    data.id = item.id;
                    data.is_enable = true;
                    data.image = item.image;
                    const res = await updateImageApi(data);
                } else if (item.isDelete) {
                    data.id = item.id;
                    data.is_enable = false;
                    const res = await updateImageApi(data);
                } else if (!item.id && item.image && item.image !== "" && !item.image.startsWith("http")) {
                    data.is_enable = true;
                    data.image = item.image;
                    const res = await uploadImage(data);
                }
            }
            for (const item of productionImages) {
                let data = {
                    product: product.id,
                    type: "production",
                }
                if (item.isUpdate) {
                    data.id = item.id;
                    data.is_enable = true;
                    data.image = item.image;
                    const res = await updateImageApi(data);
                } else if (item.isDelete) {
                    data.id = item.id;
                    data.is_enable = false;
                    const res = await updateImageApi(data);
                } else if (!item.id && item.image && item.image !== "" && !item.image.startsWith("http")) {
                    data.is_enable = true;
                    data.image = item.image;
                    const res = await uploadImage(data);
                }
            }
    }

    const onSubmit = () => {
        (async () => {
            let manufacturer = producers.find((item) => item.id === producer.id);
            let data = {
                id,
                name,
                type,
                manufacturer: manufacturer.id,
                ocop_star: star,
                description: product,
                story,
                ocop_certificate_number: certification,
                issued_on: startDate,
                expiry_date: exprire,
                is_enable: true
            }
            if (image) {
                data.certificate_img = image
            }
            if (id) {
                const res = await updateProduct(data);
                if (res.id) {
                    await submitImage(res);
                    router.push("/product/" + res.id);
                } else {
                    alert("Cập nhật sản phẩm thất bại!");
                }
            } else {
                const res = await createProduct(data);
                if (res.id) {
                    await submitImage(res);
                    router.push("/product/" + res.id);
                } else {
                    alert("Tạo sản phẩm thất bại!");
                }
            }
        })();
    }

    const renderProductType = () => {
        return (
            productType.map((item, index) => {
                return (
                    <option value={item.name} key={index}>{item.name}</option>
                )
            })
        )
    }

    let listProduct = [];
    let listProduction = [];
    listProduct = productImages.filter((item) => !item.isDelete).map((item, index) => {
        return (
            <ImageHolder src={(item.image.startsWith("filemanager")) ? IMAGE_DOMAIN + item.image : item.image} key={index} index={index}
                onDelete={onDeleteProductImage}
                onUpdate={onUpdateProductImage}
            />
        )
    })
    listProduction = productionImages.filter((item) => !item.isDelete).map((item, index) => {
        return (
            <ImageHolder src={(item.image.startsWith("filemanager")) ? IMAGE_DOMAIN + item.image : item.image} key={index} index={index}
                onDelete={onDeleteProductionImage}
                onUpdate={onUpdateProductionImage}
            />
        )
    })

    const renderProducers = () => {
        return (
            producers.map((item, index) => {
                return (
                    <option value={item.id} key={index}>{item.name}</option>
                )
            })
        )
    }
    return (
        isLoading
        ?
        <LoadingScreen></LoadingScreen>
        :
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
                                        onChange={(e) => {
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
                                <div className="inputContainer dropdown">
                                    <label htmlFor="type" className="nameInput">Loại sản phẩm</label>
                                    <Input type="select" name="type" id="type"
                                        value={type}
                                        onChange={e => setType(e.target.value)}
                                    >
                                        {
                                            renderProductType()
                                        }
                                    </Input>
                                </div>
                            </Col>
                            <Col className="sectionForm">
                                <div className="inputContainer dropdown">
                                    <label htmlFor="producer" className="nameInput">Tên nhà sản xuất</label>
                                    <Input type="select" name="producer" id="producer"
                                        value={producer}
                                        onChange={e => {
                                            setProducer(e.target.value);
                                        }}
                                    >
                                        {
                                            renderProducers()
                                        }
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
                                    {
                                        listProduct
                                    }
                                    <AddImageComponent
                                        setImage={addProductImage}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col className="p-0">
                            <div className="inputContainer">
                                <div className="nameInput mb-0">
                                    Hình ảnh quá trình sản xuất
                            </div>
                                <div className="imageContainer">
                                    {
                                        listProduction
                                    }
                                    <AddImageComponent
                                        setImage={addProductionImage}
                                    />
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
                                        (image !== "" && image)
                                            ?
                                            <ImageHolder src={image} setImage={setImage}
                                                canDelete={false}
                                                onUpdate={updateImage}
                                            />
                                            :
                                            <AddImageComponent
                                                setImage={setImage}
                                            />
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
                            <Button className="btn_add"
                                onClick={
                                    onSubmit
                                }
                            >
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