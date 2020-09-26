/** @type {string} */
export type CategoryItemProps = {
    title: string;
    data: string[];
};

export interface CategoriesProps {
    categories: Array<CategoryItemProps>;
};

let STATIC_CATEGORIES: CategoriesProps;

STATIC_CATEGORIES = {
    categories: [{
        title: "pakaian pria",
        data: [
            "atasan",
            "bawahan",
            "sport",
            "aksesoris",
            "sepatu",
            "jaket & luaran",
        ]
    },{
        title: "pakaian wanita",
        data: [
            "atasan",
            "bawahan",
            "tas",
            "aksesoris",
            "sepatu",
        ]
    },{
        title: "kuliner",
        data: [
            "menu sarapan",
            "makanan siap saji",
            "makanan beku",
            "makanan kaleng",
            "buah buahan",
            "makanan ringan",
            "roti dan kue",
            "makanan segar",
            "minuman",
        ]
    },{
        title: "kerajinan",
        data: [
            "kerajinan kayu",
            "furniture",
            "keramik",
        ]
    },{
        title: "elektronik",
        data: [
            "audio",
            "handphone",
            "kamera",
            "komputer & laptop",
            "tv & monitor",
            "elektronik rumah tangga",
        ]
    },{
        title: "top up & tagihan",
        data: [
            "beli pulsa",
            "paket internet",
            "pulsa listrik",
            "pdam",
        ]
    }]
};

export default STATIC_CATEGORIES;
