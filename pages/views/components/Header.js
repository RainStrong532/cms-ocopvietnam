import React from 'react';
import {useRouter} from 'next/router'

function Header({title}) {
    const router = useRouter();
    const onClickBack = () => {
        router.back();
    }
        return (
            <div className="header">
                <div className="backBtn"
                onClick={
                    onClickBack
                }>
                    <img src="/images/back.svg" alt="back"/>
                </div>
                <div className="headerTitle">
                    {title}
                </div>
            </div>
        );
    }
 
export default Header;