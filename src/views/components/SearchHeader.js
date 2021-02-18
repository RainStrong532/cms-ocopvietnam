import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';

function SearchHeader({ title, pathname, edit, router }) {
    const [showTitle, setShowTitle] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const onClickBack = () => {
        router.back();
    }
    window.onresize = () => {
        setWidth(window.innerWidth);
        if(width >= 960){
            setShowTitle(true);
        }
    }
    const onSearch = (textSearch) => {
        if (router) {
            const params = router.query;
            const pathname = router.pathname;
            let newParams = {};
            if (textSearch && textSearch !== "") {
                params.search = textSearch;
                params.page = 1;
                newParams = { ...params };
            } else {
                for (const i in params) {
                    if (i !== "search")
                        newParams[i] = params[i];
                }
            }
            router.push({
                pathname: pathname,
                query: newParams
            })
        }
    }
    const onSearchOpen = () => {
        if (width < 960) {
            setShowTitle(!showTitle);
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
                <div className={`title ${(showTitle) ? "" : "display-none"}`}
                >{title}</div>
            </div>
            <div className={`extentions ${showTitle ? "" : "open"}`}>
                {
                    !edit
                        ?
                        <div className="search"
                        >
                            <img src="/images/search.png" alt="search icon"
                                onClick={
                                    onSearchOpen
                                }
                            />
                            <input type="text" placeholder="Tìm kiếm"
                                onChange={e => {
                                    // setTextSeach(e.target.value.trim());
                                    onSearch(e.target.value.trim());
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
                    <p>
                        {
                            edit ? "chỉnh sửa" : "thêm mới"
                        }
                    </p>
                </Button>
            </div>
        </div>
    );
}

export default SearchHeader;