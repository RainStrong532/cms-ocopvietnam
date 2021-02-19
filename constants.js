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
        name: "Đồ ăn",
        value: "food",
    },
    {
        name: "Đồ uống",
        value: "drink",
    },
    {
        name: "Thảo mộc",
        value: "herbs",
    },
    {
        name: "Vải",
        value: "cloth",
    },
    {
        name: "Đồ lưu niệm",
        value: "keepsake",
    },
    {
        name: "Du lịch",
        value: "travel",
    }
]
export const productTypes = {
    herbs: "Thảo mộc",
    cloth: "Vải",
    keepsake: "Đồ lưu niệm",
    travel: "Du lịch",
    drink: "Đồ uống",
    food: "Đồ ăn",
}

export const xs_width= 576;
export const md_width= 768;
export const lg_width= 992;
export const xl_width= 1440;