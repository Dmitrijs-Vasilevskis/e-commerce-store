export interface Product {
    id: number;
    title: string;
    price: number;
    qty: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    url: string;
    discountedPride?: number;
}

export interface Rating {
    rate: number;
    count: number;
}

export interface Categories {
    category: string
}

export interface Category {
    id: number;
    category_code: String;
    category_title: String;
}


export interface ProductEntity {
    qty: number;
    id: number;
    sku: string;
    url_key: string;
    title: string;
    category: string;
    price: string;
    discountedPercentage: string;
    stock: string;
    thumbnail: string;
    productAttributes: [ProductAttributes];
}

export interface ProductAttributes {
    attribute_code: String;
    attribute_value: String;
}