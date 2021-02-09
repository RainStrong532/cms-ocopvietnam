import React from 'react';
import ImageModal from './ImageModal';
import { Tooltip, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ImageHolder({ src, index, readOnly, image, setImage }) {
    const [showModal, setShowModal] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const toggleDelete = () => {
        setModal(!modal);
    }
    const toggle = () => {
        setShowModal(!showModal);
    }
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
        <div className="imagePicker imageHolder" style={{ border: (!src) ? 'none' : '', backgroundColor: (!src) ? '#F4F4F4' : "" }}>
            <div className="overlay"
                onClick={
                    () => {
                        if (src)
                            setShowModal(true);
                    }
                }></div>
            {
                !readOnly
                    ?
                    <>
                        <div className="closeBtn"
                            onClick={toggleDelete}
                            title="Click để xóa ảnh"
                        >
                            <img src="/images/close.png" alt="close" />
                        </div>
                        <div className="closeBtn updateBtn"
                            title="Click để đổi ảnh"
                        >
                            <input type="file" accept="image/x-png,image/gif,image/jpeg"
                                onChange={e=>{
                                    readURL(e);
                                }}
                            />
                            <img src="/images/change.png" alt="close" />
                        </div>
                    </>
                    :
                    <></>
            }
            {
                src
                    ?
                    <img className="image" src={src} alt="image" />
                    :
                    <></>
            }
            <ImageModal src={src} showModal={showModal} toggle={toggle} />
            <Modal isOpen={modal} toggle={toggleDelete} centered={true}>
                <ModalHeader toggle={toggleDelete}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa ảnh này?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        toggleDelete();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ImageHolder;