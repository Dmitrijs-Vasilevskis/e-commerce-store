import { Injectable } from '@angular/core';
import { Categories, Product, ProductEntity } from '../../types/product';
import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_BY_CATEGORY, GET_PRODUCT, GET_PRODUCTS_BY_ID } from '../graphql/query/catalog/catalogQuery';
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_CODE, GET_CATEGORY_BY_ID } from '../graphql/query/category/categoryQuery';
import { Apollo, gql } from 'apollo-angular';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GraphqlCatalogService {

  constructor(private apollo: Apollo) { }

  getProducts(first: number, page: number): Observable<any> {
    return this.apollo
      .query({
        query: GET_ALL_PRODUCTS,
        variables: {
          first: first,
          page: page
        }
      })
      .pipe(
        map((result: any) => result.data.getAllProducts),
        catchError((error) => {
          console.error('Error fetching products:', error);
          return of(null);
        }));
  }

  getProductById(id: number): Observable<any> {
    return this.apollo
      .query({
        query: GET_PRODUCT,
        variables: {
          id: id
        }
      })
      .pipe(map((result: any) => result.data.getProduct),
        catchError((error) => {
          console.error('Error fetching product by id:', error);
          return of(null);
        }));
  }

  getProductsById(productIds: number[], quoteId: number): Observable<ProductEntity[] | null> {
    return this.apollo
      .query({
        query: GET_PRODUCTS_BY_ID,
        variables: {
          productIds: productIds,
          quote_id: quoteId
        }
      })
      .pipe(map((result: any) => result.data.getProductsById),
        catchError((error) => {
          console.error('Error fetching product by id:', error);
          return of(null);
        }));
  }

  getProductBySku(sku: String): Observable<any> {
    return this.apollo
      .query({
        query: GET_PRODUCT,
        variables: {
          sku: sku
        }
      })
      .pipe(map((result: any) => result.data.getProduct),
        catchError((error) => {
          console.error('Error fetching product by sku:', error);
          return of(null);
        }));
  }

  getProductByUrlKey(url_key: String): Observable<any> {
    return this.apollo
      .query({
        query: GET_PRODUCT,
        variables: {
          url_key: url_key
        }
      })
      .pipe(map((result: any) => result.data.getProduct),
        catchError((error) => {
          console.error('Error fetching product by url:', error);
          return of(null);
        }));
  }

  getProductsByCategory(first: number, page: number, category: string): Observable<any> {
    return this.apollo
      .query({
        query: GET_ALL_PRODUCTS_BY_CATEGORY,
        variables: {
          first: first,
          page: page,
          category: category
        }
      })
      .pipe(map((result: any) => result.data.getProductsByCategory),
        catchError((error) => {
          console.error('Error fetching product by category:', error);
          return of(null);
        }));
  }

  getCaterogies(): Observable<any> {
    return this.apollo
      .query({
        query: GET_ALL_CATEGORIES
      })
      .pipe(map((result: any) => result.data.getAllCategories),
        catchError((error) => {
          console.error('Error fetching categories:', error);
          return of(null);
        }));
  }

  getCartItems(quote_id: number): Observable<any> {
    return this.apollo.query({
      query: gql`
      query GetCartItems($quote_id: ID!) {
        getCartItems(quote_id: $quote_id) {
          id
          sku
          url_key
          qty
          title
          category
          price
          discountPercentage
          thumbnail
        }
      }
      `,
      variables: {
        quote_id: quote_id
      }
    })
      .pipe(map((response: any) => {
        return response.data.getCartItems;
      }));
  }
}

