import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PaginatorType } from '../../../types/ui/pagination/pagination.type';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    RouterLink,
    PaginatorModule,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() paginationData!: PaginatorType;
  @Output() pageChangeEvent = new EventEmitter<any>();

  onPageChange(event: any) {
    this.pageChangeEvent.emit(event.page + 1);
  }
}
