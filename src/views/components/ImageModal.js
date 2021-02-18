import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ImageModal({ src, showModal, toggle }) {
    return (
        <Modal isOpen={showModal} centered={true} className="dia" toggle={toggle}>
            <ModalBody>
                <div className="imageModal" style={{ backgroundImage: 'url(' + src + ')' }}>
                    <div className="closeBtn"
                        onClick={toggle}
                    >
                        <img src="/images/close.png" alt="close" />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ImageModal;