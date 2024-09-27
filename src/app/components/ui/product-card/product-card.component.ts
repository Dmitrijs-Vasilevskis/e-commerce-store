import { AfterViewInit, Component, Input } from '@angular/core';
import { ProductEntity } from '../../../types/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements AfterViewInit {
  @Input() product!: ProductEntity;

  ngAfterViewInit(): void {
    console.log('>>', this.product)
  }
}
