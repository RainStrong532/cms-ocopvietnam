import React from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import { useRouter } from 'next/router'

function SearchHeader({ title, pathname, edit }) {
    const router = useRouter();
    const onClickBack = () => {
        router.back();
    }
    return (
        <div className="header headerSearch">
            <div className="headerCnt">
                {
                    edit
                        ?
                        <div className="backBtn"
                            onClick={
                                onClickBack
                            }>
                            <img src="/images/back.svg" alt="back" />
                        </div>
                        :
                        <></>
                }
                <div className="title">{title}</div>
            </div>
            <div className="extentions">
                {
                    !edit
                        ?
                        <div className="search">
                            <img src="/images/search.png" alt="search icon" />
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                        :
                        <></>
                }
                <Button className={edit ? "editItem" : "addItem"}
                    onClick={() => {
                        router.push(pathname)
                    }}
                >
                    <img src={edit ? "/images/pencil.png" : "/images/whitePlus.png"} alt="icon" />
                    {
                        edit ? "chỉnh sửa" : "thêm mới"
                    }
                </Button>
            </div>
        </div>
    );
}

export default SearchHeader;