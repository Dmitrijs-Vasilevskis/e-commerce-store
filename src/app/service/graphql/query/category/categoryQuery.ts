import { gql } from "apollo-angular"

const GET_ALL_CATEGORIES = gql`
query {
  getAllCategories {
    id
    category_code
    category_title
      }
    }
`;

const GET_CATEGORY_BY_ID = gql`
query {
    category(id: $id) {
    id
    category_code
    category_title
  }
}
`;

const GET_CATEGORY_BY_CODE = gql`
query {
    category(category_code: $category_code) {
    id
    category_code
    category_title
  }
}
`;

export { GET_ALL_CATEGORIES, GET_CATEGORY_BY_CODE, GET_CATEGORY_BY_ID };