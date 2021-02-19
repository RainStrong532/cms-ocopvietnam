import React, { useState } from 'react';
import { lg_width } from '../../../../constants';

const Burger = ({open, setOpen}) => {
    const [width, setWidth] = useState(window.innerWidth);
    window.onresize = () => {
        setWidth(window.innerWidth)
    }

    return (
        <div
        className={`burger${open? " open" : ""}${width > lg_width ? " display-none" : ""}`}
        onClick={() => setOpen(!open)}
        title={`${!open ? "Mở" : "Đóng"}`}
        >
            <div />
            <div />
            <div />
        </div>
    )
}

export default Burger;