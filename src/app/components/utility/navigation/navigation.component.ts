import { Component, OnInit } from '@angular/core';
import { Categories, Category } from '../../../types/product';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { GraphqlCatalogService } from '../../../service/catalog/graphql-catalog.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgClass
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  constructor(
    private graphqlCatalogService: GraphqlCatalogService,
    protected router: Router
  ) { }

  categories: Category[] = [];
  isLoaded: boolean = false;
  isShowMenu: boolean = false;

  ngOnInit(): void {
    this.fetchProductCategories();
  }

  fetchProductCategories() {
    this.graphqlCatalogService.getCaterogies().subscribe((result) => {
      if (result) {
        this.categories = result;
      }
    })
    console.log(this.categories);
  }

  asd() {
    this.isShowMenu = true;
  }

  qwe() {
    this.isShowMenu = false;
  }

  navigateToCategory(category: Category) {
    return this.router.navigate(
      ['catalog/category'],
      {
        queryParams: {
          category: category.category_code
        }
      });
  }
}
