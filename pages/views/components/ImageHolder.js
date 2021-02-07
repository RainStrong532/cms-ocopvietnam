import React from 'react';
import ImageModal from './ImageModal';
import { Tooltip, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ImageHolder({ src, index, readOnly }) {
    const [showModal, setShowModal] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const toggleDelete = () => {
        setModal(!modal);
    }
    const toggle = () => {
        setShowModal(!showModal);
    }
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    return (
        <div className="imagePicker imageHolder" style={{ border: (!src) ? 'none' : '', backgroundColor: (!src) ? '#F4F4F4': ""}}>
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
                        <div className="closeBtn" id={`deleteImage${index}`}
                            onClick={toggleDelete}
                        >
                            <Tooltip placement="bottom" isOpen={tooltipOpen} target={`deleteImage${index}`} toggle={toggleTooltip}>
                                Click để xóa ảnh
                </Tooltip>
                            <img src="/images/close.png" alt="close" />
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
                        toggleDelete();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ImageHolder;