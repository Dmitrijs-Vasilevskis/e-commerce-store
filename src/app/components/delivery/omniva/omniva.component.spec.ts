import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnivaComponent } from './omniva.component';

describe('OmnivaComponent', () => {
  let component: OmnivaComponent;
  let fixture: ComponentFixture<OmnivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmnivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OmnivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
