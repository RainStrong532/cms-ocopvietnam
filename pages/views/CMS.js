import React from 'react';
import SideBarComponent from './components/SideBarComponent';
import "../styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from './components/Products';
import Producers from './components/Producers';

function CMS() {
    const [isProduct, setProduct] = React.useState(true);
    return (
        <div>
            <div className="sideBarContainer">
                <SideBarComponent setCMS={() => setProduct(!isProduct)} isProduct={isProduct}/>
            </div>
            <div className="contentContainer">
                {
                    isProduct
                    ?
                    <Products/>
                    :
                    <Producers/>
                }
            </div>
        </div>
    );
}

export default CMS;