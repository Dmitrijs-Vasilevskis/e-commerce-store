import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePickupComponent } from './store-pickup.component';

describe('StorePickupComponent', () => {
  let component: StorePickupComponent;
  let fixture: ComponentFixture<StorePickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorePickupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
