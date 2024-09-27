import { gql } from "apollo-angular"

const GET_ALL_PRODUCTS = gql`
query GetAllProducts($first: Int!, $page: Int!){
    getAllProducts(first: $first, page: $page) {
    products {
      id
      sku
      url_key
      title
      category
      price
      stock
      thumbnail
      productAttributes {
      attribute_code
      attribute_value
        }
    }
    paginatorInfo {
      currentPage
      lastPage
      perPage
      total
      hasMorePages
    }
 }
}
`;

const GET_PRODUCT = gql`
query GetProduct($id: ID, $sku: String, $url_key: String) {
    getProduct(id: $id, sku: $sku, url_key: $url_key) {
        id
        sku
        title
        category
        price
        stock
        thumbnail
    productAttributes {
        attribute_code
        attribute_value
        }
    }
}
`;

const GET_PRODUCTS_BY_ID = gql`
query GetProductsById($quote_id: ID!) {
    getProductsById(quote_id: $quote_id) {
        id
        sku
        title
        category
        price
        stock
        thumbnail
    productAttributes {
        attribute_code
        attribute_value
        }
    }
}
`;

const GET_ALL_PRODUCTS_BY_CATEGORY = gql`
query GetProductsByCategory($first: Int!, $page: Int!, $category: String){
    getProductsByCategory(first: $first, page: $page, category: $category) {
    products {
        id
        sku
        title
        category
        price
        stock
        thumbnail
    productAttributes {
        attribute_code
        attribute_value
        }
     }
     paginatorInfo {
      currentPage
      lastPage
      perPage
      total
      hasMorePages
    }
    }
}
`;

export { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_BY_CATEGORY, GET_PRODUCT , GET_PRODUCTS_BY_ID}