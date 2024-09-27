import { gql } from "apollo-angular";

const CREATE_QUOTE = gql`
    mutation (input: $input) {
        entity_id
        items {
            item_id
            product_id
            sku
        }
    }
`;