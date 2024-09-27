import { Component, OnInit } from '@angular/core';
import { ProductEntity } from '../../types/product';
import { GraphqlCatalogService } from '../../service/catalog/graphql-catalog.service';
import { ActivatedRoute, RouterLink, Router, UrlSerializer } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BreadcrumbsComponent } from '../utility/breadcrumbs/breadcrumbs/breadcrumbs.component';
import { CurrencyPipe } from '@angular/common';
import { CartServiceService } from '../../service/cart/cart-service.service';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { PaginationComponent } from '../ui/pagination/pagination.component';
import { PaginatorType } from '../../types/ui/pagination/pagination.type';

@Component({
  selector: 'app-plp',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgFor,
    NgIf,
    RouterLink,
    CurrencyPipe,
    ProductCardComponent,
    PaginationComponent
  ],
  templateUrl: './plp.component.html',
  styleUrl: './plp.component.css'
})

export class PlpComponent implements OnInit {
  constructor(
    private graphqlCatalogService: GraphqlCatalogService,
    private route: ActivatedRoute,
    private router: Router,
    private serializer: UrlSerializer,
    private cartService: CartServiceService) {
  }

  products: ProductEntity[] = [];
  paginationInfo!: PaginatorType;
  isLoading: boolean = false;
  currentCategory: string = '';
  defaulQty: number = 1;
  currentPage!: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      const { page, category } = param;
      this.currentPage = page ? parseInt(page, 10) : 1;

      if (category) {
        this.currentCategory = category;
        this.fetchProductsByCategories(this.currentCategory);
      } else {
        this.fetchAllProducts();
      }

    });
  }

  fetchProductsByCategories(category: string) {
    this.isLoading = true;
    return this.graphqlCatalogService.getProductsByCategory(20, this.currentPage, category)
      .subscribe({
        next: (result) => {
          this.products = result.products;
          this.paginationInfo = result.paginatorInfo;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  fetchAllProducts() {
    this.isLoading = true;
    return this.graphqlCatalogService.getProducts(20, this.currentPage).subscribe({
      next: (result) => {
        if (result) {
          this.products = result.products;
          this.paginationInfo = result.paginatorInfo;
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

  getProductLink(productId: any) {
    if (this.currentCategory) {
      return this.serializer.serialize(
        this.router.createUrlTree(['catalog/category/product'], { queryParams: { cat: this.currentCategory, id: productId } })
      );
    }

    return this.serializer.serialize(this.router.createUrlTree(['catalog/product'], { queryParams: { id: productId } }))
  }

  addToCart(item: ProductEntity) {
    this.cartService.addToCart(item, this.defaulQty);
  }

  onPageChange(page: number) {
    if (this.currentCategory) {
      return this.router.navigate(['catalog/category'],
        { queryParams: { category: this.currentCategory, page: page } }
      );
    }

    return this.router.navigate(['catalog'], { queryParams: { page: page } });
  }
}
