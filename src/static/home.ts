import Colors from '../constants/Colors';
import { Asset } from 'expo-asset';

/**
 * @interface HomeCategories
 * 
 * @property `id: number`
 * 
 * @property `title: string`
 * 
 * @property `icon: string`
 * 
 * @property `color: string`
 */
interface HomeCategories { 
    id: number;
    
    title: string;
    
    icon: string;
    
    color: string;
};

/**
 * @static Home Categories
 * 
 * @description
 * Static data of type array object
 * with properties id, title, icon and color
 * 
 * Type of interface: 
 * 
 * `[{
 *      id: number;
 *      title: string;
 *      icon: string;
 *      color: string;
 * }]`
//  */
// export const HOME_CATEGORIES: Array<HomeCategories> = [
//     {
//         id: 1,
//         title: "electronik",
//         icon: "desktop",
//         color: Colors.purple
//     },{
//         id: 2,
//         title: "topup & tagihan",
//         icon: "shopping-pos-machine",
//         color: Colors.orange
//     },{
//         id: 3,
//         title: "wisata",
//         icon: "holiday-village",
//         color: Colors.blue
//     },{
//         id: 4,
//         title: "Lainnya",
//         icon: "nav-icon-grid-a",
//         color: Colors.red
//     }
// ];

/**
 *  @interface DetailType
 *  
 *  @property `id: number`
 * 
 *  @property `title: string`
 * 
 *  @property `image: string`
 *  
 *  @property `discount: number`
 * 
 *  @property `price: number`
 */

export interface DetailType { 
    id: number;

    title: string;

    image: string;

    discount: number;

    rating: number;

    price: number  
};

/**
 *  @static DetailItem
 * 
 *  @description
 *  Static data of type array object,
 *  with property `data` object of properties
 *  id, title, image, discount, rating and price
 * 
 *  Type of interface:
 * 
 *  `data: Array<{
 *      id: number;
 *      title: string;
 *      image: string;
 *      discount: number;
 *      rating: number;
 *      price: number;
 *  }>`
 */
export const DETAIL_ITEM: {data: DetailType[]} = {
    data: [{
        id: 1,
        title: "Smartphone - RAM 2 ROM 16 GB - white",
        image: "https://cdns.klimg.com/merdeka.com/i/w/news/2019/11/23/1128080/540x270/4-cara-cek-kualitas-smartphone-bekas-awas-salah-beli.jpg",
        discount: 10,
        rating: 4,
        price: 3250000
    },{
        id: 2,
        title: "Smartphone RAM 3GB ROM 64GB 5000 mb",
        image: "https://cdn-asset.jawapos.com/wp-content/uploads/2019/05/images-35-1-640x430.jpeg",
        discount: 5,
        rating: 3.5,
        price: 5500000
    },{
        id: 3,
        title: "Celana Olahraga",
        image: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/25/4824996/4824996_6f0be5ea-9c03-437a-8c7e-0d123d651a20_604_604.jpg",
        discount: 30,
        rating: 4,
        price: 180000
    }]
};


/**
 * @static Product list
 * 
 * @description
 * Static data of type array object,
 * with properties id, name, images,
 * price, discount, reviews, rating, description, store_id.
 * 
 * Type of interface:
 * 
 * `[{
 *      id: number | string;
 *      name: string;
 *      images: Array<string>;
 *      price: number;
 *      discount?: number;
 *      reviews?: number;
 *      rating?: number;
 *      specs?: Array<{
 *          category_id: string;
 *          weight?: number | string;
 *          type?: string;
 *          size_id: number (typescript enum, in databases is many to many) 
 *      }>,
 *      description?: string;
 *      store_id: number | string
 * }]`
 */
export const PRODUCT_LIST= [{
    id: 1,
    name: "Smartphone - RAM 2 ROM 16 GB - white",
    images: [
        Asset.fromModule(require("../assets/images/products/1.png")).uri,
        Asset.fromModule(require("../assets/images/products/1.png")).uri,
        Asset.fromModule(require("../assets/images/products/1.png")).uri
    ],
    price: 3250000,
    discount: 10,
    reviews: 1,
    rating: 4,
    specs: {
        kategori: 'Kategori',
        weight: '250 gram',
        type: 'Katun',
        size: 'M (m)'
    },
    descriptions: 'Kaos Polos cotton combed 20s standar distro, bahan cotton combed 20s standar distro yang halus dan lembut. Tanpa merek, cocok untuk sablon DTG, digital, atau manual, ready stock dan siap kirim gojek wilayah jakarta. Tersedia ukuran S sampai XXXL.',
    store_id: 1
},{
    id: 2,
    name: "Smartphone RAM 3GB ROM 64GB 5000 m",
    images: [
        Asset.fromModule(require("../assets/images/products/2.png")).uri,
        Asset.fromModule(require("../assets/images/products/2.png")).uri,
        Asset.fromModule(require("../assets/images/products/2.png")).uri
    ],
    price: 5500000,
    discount: 5,
    reviews: 2,
    rating: 4.5,
    specs: {
        kategori: 'Kategori',
        weight: '250 gram',
        type: 'Katun',
        size: 'M (m)'
    },
    descriptions: 'Kaos Polos cotton combed 20s standar distro, bahan cotton combed 20s standar distro yang halus dan lembut. Tanpa merek, cocok untuk sablon DTG, digital, atau manual, ready stock dan siap kirim gojek wilayah jakarta. Tersedia ukuran S sampai XXXL.',
    store_id: 2
},{
    id: 3,
    name: "Celana Olahraga",
    images: [
        Asset.fromModule(require("../assets/images/products/3.png")).uri,
        Asset.fromModule(require("../assets/images/products/3.png")).uri,
        Asset.fromModule(require("../assets/images/products/3.png")).uri
    ],
    price: 180000,
    discount: 30,
    reviews: 2,
    rating: 4,
    specs: {
        kategori: 'Kategori',
        weight: '250 gram',
        type: 'Katun',
        size: 'M (m)'
    },
    descriptions: 'Kaos Polos cotton combed 20s standar distro, bahan cotton combed 20s standar distro yang halus dan lembut. Tanpa merek, cocok untuk sablon DTG, digital, atau manual, ready stock dan siap kirim gojek wilayah jakarta. Tersedia ukuran S sampai XXXL.',
    store_id: 3
},{
    id: 4,
    name: "Sepatu White",
    images: [
        Asset.fromModule(require("../assets/images/products/4.png")).uri,
        Asset.fromModule(require("../assets/images/products/4.png")).uri,
        Asset.fromModule(require("../assets/images/products/4.png")).uri
    ],
    price: 250000,
    discount: 25,
    reviews: 2,
    rating: 4.5,
    specs: {
        kategori: 'Kategori',
        weight: '250 gram',
        type: 'Katun',
        size: 'M (m)'
    },
    descriptions: 'Kaos Polos cotton combed 20s standar distro, bahan cotton combed 20s standar distro yang halus dan lembut. Tanpa merek, cocok untuk sablon DTG, digital, atau manual, ready stock dan siap kirim gojek wilayah jakarta. Tersedia ukuran S sampai XXXL.',
    store_id: 4
}];

