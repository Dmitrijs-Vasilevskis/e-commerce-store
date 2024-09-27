import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlCatalogService } from '../../service/catalog/graphql-catalog.service';
import { Product, ProductEntity, Rating } from '../../types/product';
import { NgIf } from '@angular/common';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../utility/breadcrumbs/breadcrumbs/breadcrumbs.component';
import { CartServiceService } from '../../service/cart/cart-service.service';

@Component({
  selector: 'app-pdp',
  standalone: true,
  imports: [
    NgIf,
    NgbRating,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsComponent
  ],
  templateUrl: './pdp.component.html',
  styleUrl: './pdp.component.css'
})

export class PdpComponent implements OnInit {
  product!: ProductEntity;
  isLoading: boolean = false;
  currentQty: number = 1;

  constructor(
    private route: ActivatedRoute,
    private graphqlCatalogService: GraphqlCatalogService,
    private formBuilder: FormBuilder,
    private cartService: CartServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['productUrlKey']) {
        this.getProductDataByUrlKey(param['productUrlKey']);
      }
    });
  }

  getProductDataByUrlKey(urlKey: string) {
    this.isLoading = true;
    this.graphqlCatalogService.getProductByUrlKey(urlKey)
      .subscribe({
        next: (result) => {
          if (result) {
            console.log(result);
            this.product = result;
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  increaseQty() {
    if (this.currentQty === Number(this.product.stock)) {
      return this.currentQty;
    }

    return this.currentQty++;
  }

  decreaseQty() {
    if (this.currentQty > 1) {
      return this.currentQty--;
    }

    return this.currentQty;
  }

  changeQty(value: number) {
    if (value < 1) {
      return this.currentQty = 1;
    }

    return this.currentQty = value;
  }

  addToCart() {
    return this.cartService.addToCart(this.product, this.currentQty);
  }
}
