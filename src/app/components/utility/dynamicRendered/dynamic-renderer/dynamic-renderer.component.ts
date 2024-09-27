import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicRendererDirective } from '../../../../directives/dynamic-renderer.directive';
import { DynamicShippingItem } from '../../../../types/shipping/dynamic.types';

@Component({
  selector: 'app-dynamic-renderer',
  standalone: true,
  imports: [DynamicRendererDirective],
  templateUrl: './dynamic-renderer.component.html',
  styleUrls: ['./dynamic-renderer.component.css']
})

export class DynamicRendererComponent implements AfterViewInit{

  @Input() dynamicComponent!: DynamicShippingItem;
  @Output() dataFromChild = new EventEmitter<any>();
  @ViewChild(DynamicRendererDirective) appDynamicRenderer!:DynamicRendererDirective;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.createDynamicComponent(this.dynamicComponent);
  }

  createDynamicComponent(item: DynamicShippingItem) {
    const viewContainerRef = this.appDynamicRenderer.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<DynamicShippingItem>(
      item.component,
    );
    componentRef.instance.data = item.data;
    componentRef.instance.deliveryOptionData.subscribe((data: any) => {
      this.dataFromChild.emit(data);
    });

    this.cdRef.detectChanges();
  }
}
