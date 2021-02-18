import React from 'react';
import ImageModal from './ImageModal';
import { Tooltip, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ImageHolder({ src, readOnly, image, setImage, onDelete, onUpdate, canDelete, index}) {
    const [showModal, setShowModal] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const toggleDelete = () => {
        setModal(!modal);
    }
    const toggle = () => {
        setShowModal(!showModal);
    }
    function readURL(event, onUpdate) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                if(onUpdate){
                    onUpdate(index, e.target.result)
                }
                else if (setImage)
                    setImage(e.target.result)
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    return (
        <div className="imagePicker imageHolder"
            style={{ border: (!src) ? 'none' : '', backgroundColor: (!src) ? '#F4F4F4' : "" }}
            title={!src ? "Chưa có ảnh nào" : ""}
        >
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
                    <div className="btnContainer">
                        <div className="closeBtn updateBtn"
                            title="Click để đổi ảnh"
                        >
                            <input type="file" accept="image/x-png,image/gif,image/jpeg"
                                onChange={e => {
                                    readURL(e, onUpdate);
                                }}
                            />
                            <img src="/images/change.png" alt="close" />
                        </div>
                        {
                            canDelete || canDelete === null || canDelete === undefined
                                ?
                                <div className="closeBtn"
                                    onClick={toggleDelete}
                                    title="Click để xóa ảnh"
                                >
                                    <img src="/images/close.png" alt="close" />
                                </div>
                                :
                                <></>
                        }
                    </div>
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
                        if (onDelete) {
                            console.log('====================================');
                            console.log("delete", index);
                            console.log('====================================');
                            onDelete(index);
                        }
                        toggleDelete();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ImageHolder;