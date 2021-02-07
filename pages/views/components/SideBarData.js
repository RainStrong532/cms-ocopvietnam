import React from 'react';

export const SideBarData = [
    {
        title: "Sản phẩm",
        icon: <img className="sideBarItem" src="/images/products.png" alt="products" />,
        iconActive: <img className="sideBarItem" src="/images/productsActive.png" alt="products" />,
        type: "/product"
    },
    {
        title: "Nhà sản xuất",
        icon: <img className="sideBarItem" src="/images/producers.png" alt="producers" />,
        iconActive: <img className="sideBarItem" src="/images/producersActive.png" alt="producers" />,
        type: "/producer"
    },
    {
        title: "Đăng xuất",
        icon: <img className="sideBarItem" src="/images/logout.png" alt="producers" />,
    }
]