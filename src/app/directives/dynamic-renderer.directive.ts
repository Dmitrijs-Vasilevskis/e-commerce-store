import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicRenderer]',
  standalone: true
})
export class DynamicRendererDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
