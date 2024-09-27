import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/utility/navigation/navigation.component';
import { NgIf } from '@angular/common';
import { AccountService } from './service/account/account.service';
import { GraphqlService } from './service/graphql/graphql.service';
import { GET_ALL_CATEGORIES } from './service/graphql/query/category/categoryQuery';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'webstore-test';
  showNavigation: boolean = true;

  constructor(private router: Router,
    private accountService: AccountService,
    private graphql: GraphqlService,
    private apollo: Apollo) {
    router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        value.url === '/checkout' ? this.showNavigation = false : this.showNavigation = true;
      }
    });
  }

  ngOnInit(): void {
  }

  getAllCategories(): Observable<any> {
    // Correctly define the GraphQL query
    const GET_ALL_CATEGORIES = gql`
      query getAllCategories {
        getAllCategories {
          id
          category_code
          category_title
        }
      }
    `;

    return this.apollo.query({
      query: GET_ALL_CATEGORIES
    }).pipe(
      map((result: any) => result.data.allCategories)
    );
  }

}
