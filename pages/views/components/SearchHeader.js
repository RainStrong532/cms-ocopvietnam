import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';

function SearchHeader({ title, pathname, edit, router}) {
    const [textSearch, setTextSeach] = useState("");
    const onClickBack = () => {
        router.back();
    }
    const onSearch = () => {
        if(router){
            const params = router.query;
            const pathname = router.pathname;
            
            if(textSearch){
                params.search = textSearch;
            }
            router.push({
                pathname: pathname,
                query: params
            })
        }
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
                            <img src="/images/search.png" alt="search icon"
                                onClick={onSearch} 
                            />
                            <input type="text" placeholder="Tìm kiếm"
                                onChange={e => {
                                    setTextSeach(e.target.value);
                                }}
                                onKeyPress={e => {
                                    if(e.key === "Enter"){
                                        onSearch();
                                    }
                                }}
                            />
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