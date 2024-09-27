import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private apollo: Apollo) { }

  initQuoteForCustomer(input: any) {
    const CREATE_QUOTE = gql`
      mutation initQuote($input: InitQuoteInput!) {
        initQuote(input: $input) {
          entity_id
          is_active
          items {
            item_id
            quote_id
            product_id
            sku
            name
            qty
            price
            discount_percent
            discount_amount
          }
        }
      }
    `;

    console.log('>> input', input);

    return this.apollo.mutate({
      mutation: CREATE_QUOTE,
      variables: { input }
    }).pipe(map((response: any) => {
      console.log('>> mutate initQuote', response.data.initQuote);

      return response.data.initQuote;
    }));
  }

  getActiveQuoteByCustomerId(customerId: number) {
    const GET_ACTIVE_QUOTE_BY_CUSTOMER_ID = gql`
        query getActiveQuoteByCustomerId($customer_id: ID!) {
          getActiveQuoteByCustomerId(customer_id: $customer_id) {
            entity_id
            is_active
            items_count
            items_qty
            grand_total
            items {
              item_id
              quote_id
              product_id
              sku
              name
              price
              discount_percent
              discount_amount
            }
          }
        }
      `;

    return this.apollo.query({
      query: GET_ACTIVE_QUOTE_BY_CUSTOMER_ID,
      variables: {
        customer_id: customerId
      }
    }).pipe(map((response: any) => {
      
      return response.data.getActiveQuoteByCustomerId;
    }));
  }
}
