import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Router, { useRouter } from 'next/router'
import { SideBarData } from '../../../constants';
import { useAuth } from '../../../src/contexts/auth';

function SideBarComponent({ }) {
    const [modal, setModal] = React.useState(false);
    const { logout } = useAuth();
    const toggle = () => setModal(!modal);
    const router = useRouter();

    const SideBarItem = SideBarData.map((item, index) => {
        return (
            (index !== SideBarData.length - 1)
                ?
                <li key={index} onClick={() => {
                    router.push(item.type)
                }}
                    className={(typeof window !== undefined) ? (window.location.pathname.startsWith(item.type)) ? "active" : "" : ""}
                >
                    <div>
                        {
                            (typeof window !== undefined)
                                ?
                                (window.location.pathname.startsWith(item.type))
                                    ?
                                    item.iconActive
                                    :
                                    item.icon
                                :
                                item.icon
                        }
                    </div>
                    <div className="title">
                        {item.title}
                    </div>
                </li>
                :
                <li className="logout" key={index} onClick={() => {
                    toggle()
                }}
                >
                    <div>
                        {
                            item.icon
                        }
                    </div>
                    <div className="title">
                        {item.title}
                    </div>
                </li>
        )
    })
    return (
        <div className="sideBar">
            <div>
                <img className="logoSideBar" src="/logo.png" alt="image" />
            </div>
            <div className="title_s">
                Tỉnh Hà Tĩnh
            </div>
            <ul>
                {
                    SideBarItem
                }
            </ul>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn đăng xuất?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        toggle();
                        logout();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Hủy</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default SideBarComponent;