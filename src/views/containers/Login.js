import React from 'react';
import { Container, Row, Col, ModalHeader, ModalBody, ModalFooter, Button, Modal } from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmpty } from 'validator'
import { useRouter } from 'next/router'
import { useAuth } from '../../../src/contexts/auth';
import LoadingOverlay from '../components/LoadingOverlay';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">Bạn cần điền thông tin này</small>;
    }
}


function Login() {
    const { login } = useAuth();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [isLoading, setLoading] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const router = useRouter();
    let form = React.useRef(null);
    let checkBtn = React.useRef(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            setLoading(true);
            await login(username, password);
            setLoading(false);
            toggle();
        }
    }
    return (
        <>
            <div className="login">
                <Container>
                    <Row>
                        <Col className="inner" xs={1} md={3} xl={7}></Col>
                        <Col xs={12} sm={10}  md={6} xl={5} className="horizontal-align">
                            <div className="login-section" >
                                <div className="login-header">
                                    <img src="./ntm-logo.png" alt="logo" />
                                    <div className="loginContent">
                                        <h1>
                                            HỆ THỐNG QUẢN LÝ VÀ GIÁM SÁT
                                </h1>
                                        <h1>
                                            SẢN PHẨM OCOP QUỐC GIA
                                </h1>
                                    </div>
                                </div>
                                <div className="form-box login-action">
                                    <Form onSubmit={e => onSubmit(e)} ref={c => { form = c }} method="POST">
                                        <div className="inputContainer">
                                            <p>Tên đăng nhập</p>
                                            <Input
                                                name="username"
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                type="text"
                                                placeholder="Tên đăng nhập"
                                                // className="form-control"
                                                validations={[required]}
                                            />
                                            <img src="/images/user.png" alt="user" />
                                        </div>
                                        <div className="inputContainer">
                                            <p>Mật khẩu</p>
                                            <Input
                                                name="password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                type="password"
                                                placeholder="Mật khẩu"
                                                autoComplete="true"
                                                // className="form-control"
                                                validations={[required]}
                                            />
                                            <img src="/images/lock.png" alt="lock" />
                                        </div>
                                        <div className="fpContainer">
                                            <div></div>
                                            <div className="fogot-password-btn"> Quên mật khẩu? </div>
                                        </div>
                                        <button className="btn btn-info btn-block login loginBtn" type="submit">Đăng nhập</button>
                                        <CheckButton className="checkBtn" ref={c => { checkBtn = c }} />
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <LoadingOverlay open={isLoading} />
                <Modal isOpen={modal} toggle={toggle} centered={true}>
                    <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                    <ModalBody>
                        Đăng nhập thất bại
                </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}

export default Login;