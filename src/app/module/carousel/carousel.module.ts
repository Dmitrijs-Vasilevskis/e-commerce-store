import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule as OwlCarouselModule } from 'ngx-owl-carousel-o';
import { SliderComponent } from '../../components/utility/slider/slider.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OwlCarouselModule
  ]
})
export class CarouselModule { }
