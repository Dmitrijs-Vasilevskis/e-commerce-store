import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Window } from '@popperjs/core';
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // console.log('>>activatedRoute', this.activatedRoute.snapshot.children);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      console.log(this.breadcrumbs);
    });
  }

  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }



      const breadcrumb = child.snapshot.data['breadcrumb'];
      if (breadcrumb) {
        let label = typeof breadcrumb === 'function' ? breadcrumb(child.snapshot) : breadcrumb;
        breadcrumbs.push({ label: this.firstLetterToUpperCase(label), url });

      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  firstLetterToUpperCase(label: string): string {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
}
