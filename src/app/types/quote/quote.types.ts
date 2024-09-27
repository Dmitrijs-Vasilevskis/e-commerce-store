export interface QuoteInterface {
    entity_id: number;
    is_active: boolean;
    items_count: number;
    items_qty: number;
    grand_total: number;
    checkout_method: string;
    customer_id: number
    customer_email: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_is_guest: boolean;
    coupon_code: string;
    subtotal: number;
    base_subtotal: number;
    created_at: string;
    updated_at: string;
    items: [QuoteIteminterface]
}

export interface QuoteIteminterface {
    item_id?: number;
    quote_id: number;
    product_id: number;
    sku: string;
    name: string;
    weight?: number;
    qty: number;
    price: number;
    discount_percent: number;
    discount_amount: number;
}