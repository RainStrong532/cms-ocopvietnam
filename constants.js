export const DOMAIN =  "https://api-ocop5sao.marveltek.com/v1/"
export const IMAGE_DOMAIN = "https://api-ocop5sao.marveltek.com/media/"

export const enableStatus = {
    approved: "Đã xét duyệt",
    processing: "Đang chờ xét duyệt"
}

export const headerProduct =  [
    {
        name: "sản phẩm"
    },
    {
        name: "loại"
    },
    {
        name: "số sao"
    },
    {
        name: "trạng thái"
    },
    {
        name: "sửa"
    },
    {
        name: "xóa"
    }
]

export const headerProducer =  [
    {
        name: "nhà sản xuất"
    },
    {
        name: "người đại diện"
    },
    {
        name: "số điện thoại"
    },
    {
        name: "địa chỉ"
    },
    {
        name: "sửa"
    }
    ,
    {
        name: "xóa"
    }
]

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

export const productType = [
    {
        name: "food",
        value: "food",
    },
    {
        name: "drink",
        value: "drink",
    },
    {
        name: "herbs",
        value: "herbs",
    },
    {
        name: "cloth",
        value: "cloth",
    },
    {
        name: "keepsake",
        value: "keepsake",
    },
    {
        name: "travel",
        value: "travel",
    }
]