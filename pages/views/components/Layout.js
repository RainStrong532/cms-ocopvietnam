import SideBarComponent from "./SideBarComponent"

const Layout = ({ children }) => {
    return (
        <div>
            <div className="sideBarContainer">
                <SideBarComponent/>
            </div>
            <div className="contentContainer">
                {children}
            </div>
        </div>
    )
}

export default Layout;