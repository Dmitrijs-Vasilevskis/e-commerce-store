import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  @Input() options!: any[];

}
