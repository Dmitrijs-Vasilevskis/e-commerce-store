import { Component, viewChild } from '@angular/core';
import { Product, ProductEntity } from '../../../types/product';
import { NgFor, NgIf } from '@angular/common';
import { OwlOptions, CarouselModule as OwlCarouselModule } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { URLSearchParams } from 'url';
import { RouterLink } from '@angular/router';
import { GraphqlCatalogService } from '../../../service/catalog/graphql-catalog.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CarouselModule,
    RouterLink
  ],
  providers: [

  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})

export class SliderComponent {

  constructor(private catalogService: GraphqlCatalogService) {}

  products: ProductEntity[] = [];
  isLoading: boolean = false;

  carouselOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.catalogService.getProducts(5, 1).subscribe({
      next: (result) => {
        if (result) {
          this.products = result.products;
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
}
