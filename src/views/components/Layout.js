import { useState } from "react";
import Burger from "./burgerButton/Burger";
import SideBarComponent from "./SideBarComponent"

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Burger open={open} setOpen={setOpen}/>
            <div className="sideBarContainer">
                <SideBarComponent open={open}/>
            </div>
            <div className="contentContainer">
                {children}
            </div>
        </div>
    )
}

export default Layout;