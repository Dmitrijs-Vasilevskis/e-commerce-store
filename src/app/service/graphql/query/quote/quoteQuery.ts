import { gql } from "apollo-angular";

const GET_QUOTE_BY_CUSTOMER_ID = gql`
    query {
        getQuoteById(customer_id: $customer_id) {
            entity_id
            items {
                item_id
                quote_id
                product_id
                sku
                name
            }
        }
    }
`;