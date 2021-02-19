import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import { lg_width } from '../../../constants';

function SearchHeader({ title, pathname, edit, router }) {
    const [showTitle, setShowTitle] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const onClickBack = () => {
        router.back();
    }
    window.onresize = () => {
        setWidth(window.innerWidth);
        if (width >= lg_width) {
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
        if (width < lg_width) {
            setShowTitle(!showTitle);
            console.log(showTitle);
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
                            title="TÌm kiếm"
                        >
                            <img src="/images/search.png" alt="search icon"
                                onClick={
                                    onSearchOpen
                                }
                            />
                            <input type="text" placeholder="Tìm kiếm"
                                onBlur={onSearchOpen}
                                onChange={e => {
                                    onSearch(e.target.value.trim());
                                }}
                            />
                        </div>
                        :
                        <></>
                }
                <Button className={edit ? "editItem" : "addItem"}
                    title={`${edit ? "Chỉnh sửa" : "Thêm mới"}`}
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