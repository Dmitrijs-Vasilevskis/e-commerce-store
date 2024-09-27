import { Injectable, OnInit } from '@angular/core';
import { Product, ProductEntity } from '../../types/product';
import { LocalStorageServiceService } from '../localStorage/local-storage-service.service';
import { CustomerInterface } from '../../types/user/user.types';
import { AccountService } from '../account/account.service';
import { QuoteInterface, QuoteIteminterface } from '../../types/quote/quote.types';
import { QuoteService } from '../quote/quote.service';
import { BehaviorSubject, Observable, filter, of, switchMap } from 'rxjs';
import { GraphqlCatalogService } from '../catalog/graphql-catalog.service';

@Injectable({
  providedIn: 'root'
})

export class CartServiceService implements OnInit {

  private customerData!: CustomerInterface;
  private cartItems: BehaviorSubject<ProductEntity[] | null> = new BehaviorSubject<ProductEntity[] | null>(null);

  private quoteSubject: BehaviorSubject<QuoteInterface | null> = new BehaviorSubject<QuoteInterface | null>(null);

  public quoteLoaded = false;
  public quote!: QuoteInterface;

  constructor(
    private localStorage: LocalStorageServiceService,
    private accountService: AccountService,
    private quoteService: QuoteService,
    private graphqlCatalogService: GraphqlCatalogService
  ) {


    this.quoteSubject.subscribe((quoteData) => {
      if (quoteData) {
        this.quote = quoteData;

        if (quoteData.items.length) {
          this.loadCartItems(quoteData.items, quoteData.entity_id);
        }
      }
    });

    this.loadInitialQuote();

  }
  ngOnInit(): void {
    this.quoteSubject.subscribe((quoteData) => {
      if (quoteData) {
        this.quote = quoteData;
      }
    })

    this.loadInitialQuote();

    // console.log('>> cartItems', this.cartItems);
  }

  protected loadInitialQuote() {
    if (this.accountService.isAuthenticated()) {
      this.accountService.getCurrentUser().subscribe((currentUser: CustomerInterface) => {
        if (currentUser) {
          console.log(currentUser);
          this.customerData = currentUser;
          this.setQuoteCustomerData(currentUser);

          this.quoteService.getActiveQuoteByCustomerId(currentUser.id).subscribe((response: QuoteInterface) => {
            if (response) {
              this.quoteLoaded = true;
              this.quoteSubject.next(response);
            }
          });
        }
      });
    }
  }

  addToCart(product: ProductEntity, qty: number) {

    if (this.quote.entity_id == 0 && this.accountService.isAuthenticated()) {
      this.setQuoteCustomerData(this.customerData);
      this.createQuoteForLoggedCustomer(product, qty)
    }

    // if (this.quote) {
    let item = this.quote.items.find((item) => item.item_id === product.id);

    if (item) {
      // todo: update quote with item 
    }
    // }

    // return this.localStorage.set('cartItems', JSON.stringify(this.cartItems));
  }

  createQuoteForLoggedCustomer(product: ProductEntity, qty: number) {

    const input = {
      customer: {
        customer_id: this.quote.customer_id,
        customer_email: this.quote.customer_email,
        customer_firstname: this.quote.customer_firstname,
        customer_lastname: this.quote.customer_lastname,
        customer_is_guest: this.quote.customer_is_guest
      },
      item: this.getitem(product, qty)
    }

    this.quoteService.initQuoteForCustomer(input).subscribe((response) => {
      console.log('>> initQuoteForCustomer', response);
      return response;
    });
  }

  getItems() {
    return this.cartItems;
  }

  incrementQty(id: any) {

  }

  decrementQty(id: number) {


  }

  setQty(id: number, qty: number) {
    // let product = this.cartItems.find(item => item.id === id);
    // if (product) {
    //   product.qty = qty;

    //   return this.localStorage.set('cartItems', JSON.stringify(product))
    // }
  }

  getCartSubtotal() {
    let subtotal = 0;


    return subtotal.toFixed(2);
  }

  getProductPrice(id: number) {

    return null;
  }

  getCartTotalQty() {
    console.log(
      '>>', this.cartItems
    )
  }

  clearCart() {
    this.localStorage.clear();
    window.location.href = window.location.href;
  }

  clearItemById(id: number) {

  }

  isCartHasDiscount() {
    return false;
  }

  setQuoteCustomerData(customerData: CustomerInterface) {

    if (!customerData) {
      console.error('Customer data is invalid:', customerData);
      return;
    }

    const {
      id,
      email,
      firstName,
      lastName
    } = customerData;

    console.log('>> customerData', customerData);

    return this.quote = {
      ...this.quote,
      customer_id: id,
      customer_email: email,
      customer_firstname: firstName,
      customer_lastname: lastName,
      customer_is_guest: false
    }
  }

  addProductToQuote(product: ProductEntity, qty: number) {
    const newQuoteItem: QuoteIteminterface = {
      quote_id: this.quote.entity_id,
      product_id: product.id,
      sku: product.sku,
      name: product.title,
      qty: qty,
      price: parseFloat(product.price),
      discount_percent: parseFloat(product.discountedPercentage) || 0,
      discount_amount: 0
    };

    this.quote.items.push(newQuoteItem);
  }

  getitem(product: ProductEntity, qty: number) {
    return [{
      product_id: product.id,
      sku: product.sku,
      title: product.title,
      qty: qty,
      price: parseFloat(product.price),
      discount_percent: parseFloat(product.discountedPercentage) || 0,
    }];
  }

  getQuote(): Observable<QuoteInterface | null> {
    return this.quoteSubject.asObservable();
  }

  getCartItems(): Observable<ProductEntity[] | null> {
    return this.cartItems.asObservable();
  }

  loadCartItems(quoteItems: QuoteIteminterface[], quoteId: number) {
    const productIds = quoteItems.map((item) => {
      return item.product_id;
    });

    this.graphqlCatalogService.getCartItems(quoteId)
      .subscribe((response: ProductEntity[] | null) => {
        if (response) {
          this.cartItems.next(response);
        }
      });
  }
}
