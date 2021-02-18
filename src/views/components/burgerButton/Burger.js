import React, { useState } from 'react';

const Burger = ({open, setOpen}) => {
    const [width, setWidth] = useState(window.innerWidth);
    window.onresize = () => {
        setWidth(window.innerWidth)
    }

    return (
        <div className={`burger${open? " open" : ""}${width > 960 ? " display-none" : ""}`} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </div>
    )
}

export default Burger;