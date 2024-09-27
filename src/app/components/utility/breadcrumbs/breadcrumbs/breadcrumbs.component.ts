import { Component, OnInit, afterRender } from '@angular/core';
import { BreadcrumbsService } from '../../../../service/breadcrumbs.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LocalStorageServiceService } from '../../../../service/localStorage/local-storage-service.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private breadcrumbService: BreadcrumbsService,
    private route: Router,
    private localstorage: LocalStorageServiceService,) {
    this.route.events.subscribe(() => {
      this.breadcrumbs = this.breadcrumbService.breadcrumbs;
    })

    afterRender(() => {
      this.localstorage.remove('breadcrumbs');
      this.localstorage.set('breadcrumbs', JSON.stringify(this.breadcrumbs));
    });
  }

  ngOnInit() {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }
}
